import { AxiosInstance } from "axios";

type UploaderOptions = {
  file: File;
  apiClient: AxiosInstance;
};

type Part = {
  signedUrl: string;
  PartNumber: number;
};
type UploadedPart = {
  PartNumber: number;
  ETag: string;
};

export class Uploader {
  file: File;
  apiClient: AxiosInstance;

  chunkSize: number = 1000;
  maxNumberOfThreads: number = 15;
  aborted: boolean = false;
  uploadedSize: number = 0;

  parts: Part[] = [];
  uploadedParts: UploadedPart[] = [];

  progressCache: Record<number, number> = {};
  activeConnections: Record<number, XMLHttpRequest> = {};

  fileId: string | null = null;
  fileKey: string | null = null;

  onProgressFn: (err: any) => void = () => {};
  onErrorFn: (err: any) => void = () => {};
  onCompletedFn: (objectKey: string) => void = (objectKey: string) => {};

  constructor(options: UploaderOptions) {
    this.file = options.file;
    this.apiClient = options.apiClient;
  }

  async start({ uploadId, objectKey, partUploadUrls }: any) {
    try {
      this.fileId = uploadId;
      this.fileKey = objectKey;

      const numberOfparts = partUploadUrls.length;
      this.chunkSize = Math.ceil(this.file.size / numberOfparts);

      const newParts: any[] = [];
      for (let i = 0; i < numberOfparts; i++) {
        newParts.push({
          signedUrl: partUploadUrls[i],
          PartNumber: i + 1,
        });
      }
      this.parts.push(...newParts);

      this.sendNext();
    } catch (error) {
      await this.complete(error);
    }
  }

  sendNext() {
    const activeConnections = Object.keys(this.activeConnections).length;
    console.log("this.parts", this.parts);

    if (activeConnections >= this.maxNumberOfThreads) {
      return;
    }

    if (!this.parts.length) {
      if (!activeConnections) {
        this.complete();
      }

      return;
    }

    const part = this.parts.pop();

    if (this.file && part) {
      const sentSize = (part.PartNumber - 1) * this.chunkSize;
      const chunk = this.file.slice(sentSize, sentSize + this.chunkSize);

      const sendChunkStarted = () => {
        this.sendNext();
      };

      this.sendChunk(chunk, part, sendChunkStarted)
        .then(() => {
          this.sendNext();
        })
        .catch((error) => {
          this.parts.push(part);

          this.complete(error);
        });
    }
  }

  // terminating the multipart upload request on success or failure
  async complete(error?: any) {
    if (error && !this.aborted) {
      this.onErrorFn(error);
      return;
    }

    if (error) {
      this.onErrorFn(error);
      return;
    }

    try {
      await this.sendCompleteRequest();
    } catch (error) {
      this.onErrorFn(error);
    }
  }

  // finalizing the multipart upload request on success by calling
  // the finalization API
  async sendCompleteRequest() {
    if (this.fileId && this.fileKey) {
      const videoFinalizationMultiPartInput = {
        uploadId: this.fileId,
        objectKey: this.fileKey,
        parts: this.uploadedParts,
      };

      const response = await this.apiClient.request({
        url: "biopsies/upload/complete-multipart",
        method: "POST",
        data: videoFinalizationMultiPartInput,
      });

      return response;
    }
  }

  sendChunk(chunk: any, part: any, sendChunkStarted: any) {
    return new Promise((resolve, reject) => {
      this.upload(chunk, part, sendChunkStarted)
        .then((status) => {
          console.log("status", status);

          if (status !== 200) {
            reject(new Error("Failed chunk upload"));
            return;
          }

          resolve(1);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // calculating the current progress of the multipart upload request
  handleProgress(part: any, event: any) {
    if (this.file) {
      if (
        event.type === "progress" ||
        event.type === "error" ||
        event.type === "abort"
      ) {
        this.progressCache[part] = event.loaded;
      }

      if (event.type === "uploaded") {
        this.uploadedSize += this.progressCache[part] || 0;
        delete this.progressCache[part];
      }

      const inProgress = Object.keys(this.progressCache)
        .map(Number)
        .reduce((memo, id) => (memo += this.progressCache[id]), 0);

      const sent = Math.min(this.uploadedSize + inProgress, this.file.size);

      const total = this.file.size;

      const percentage = Math.round((sent / total) * 100);

      this.onProgressFn({
        sent: sent,
        total: total,
        percentage: percentage,
      });

      if (percentage >= 100) {
        console.log(this.fileKey);
        this.onCompletedFn(this.fileKey ?? "unknown object key");
      }
    }
  }

  // uploading a part through its pre-signed URL
  upload(file: any, part: any, sendChunkStarted: any) {
    // uploading each part with its pre-signed URL
    return new Promise((resolve, reject) => {
      if (this.fileId && this.fileKey) {
        // - 1 because PartNumber is an index starting from 1 and not 0
        const xhr = (this.activeConnections[part.PartNumber - 1] =
          new XMLHttpRequest());

        sendChunkStarted();

        const progressListener = this.handleProgress.bind(
          this,
          part.PartNumber - 1
        );

        xhr.upload.addEventListener("progress", progressListener);

        xhr.addEventListener("error", progressListener);
        xhr.addEventListener("abort", progressListener);
        xhr.addEventListener("loadend", progressListener);

        xhr.open("PUT", part.signedUrl);

        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            // retrieving the ETag parameter from the HTTP headers
            const ETag = xhr.getResponseHeader("ETag");

            if (ETag) {
              const uploadedPart = {
                PartNumber: part.PartNumber,
                // removing the " enclosing carachters from
                // the raw ETag
                ETag: ETag.replaceAll('"', ""),
              };

              this.uploadedParts.push(uploadedPart);

              resolve(xhr.status);
              delete this.activeConnections[part.PartNumber - 1];
            }
          }
        };

        xhr.onerror = (error) => {
          reject(error);
          delete this.activeConnections[part.PartNumber - 1];
        };

        xhr.onabort = () => {
          reject(new Error("Upload canceled by user"));
          delete this.activeConnections[part.PartNumber - 1];
        };

        xhr.send(file);
      }
    });
  }

  onProgress(onProgress: any) {
    this.onProgressFn = onProgress;
    return this;
  }

  onCompleted(onCompleted: any) {
    this.onCompletedFn = onCompleted;
    return this;
  }

  onError(onError: any) {
    this.onErrorFn = onError;
    return this;
  }

  abort() {
    Object.keys(this.activeConnections)
      .map(Number)
      .forEach((id) => {
        this.activeConnections[id].abort();
      });

    this.aborted = true;
  }
}
