import { useCallback, useRef, useState } from "react";
import { Uploader } from "./utils/Uploader";
import { AxiosInstance } from "axios";

export type FileUploadInfo = {
  uploadId: string;
  objectKey: string;
  partUploadUrls: string[];
};

export const useOneBiopsyFileUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploader, setUploader] = useState<any>(undefined);
  const [progress, setProgress] = useState(0);
  const [datalakeObjectKey, setDatalakeObjectKey] = useState<string>("");

  const isFileUploadReadyToStart = selectedFile !== undefined && progress === 0;

  const handleFileSelect = (files: FileList | null) => {
    if (files) {
      setSelectedFile(files[0]);
    }
  };

  const startUpload = useCallback(
    (axiosInstance: AxiosInstance, fileUploadInfo: FileUploadInfo) => {
      if (isFileUploadReadyToStart && selectedFile !== null) {
        let percentage: any = undefined;

        const uploaderOptions = {
          file: selectedFile,
          apiClient: axiosInstance,
        };
        const uploader = new Uploader(uploaderOptions);
        setUploader(uploader);

        uploader
          .onProgress(({ percentage: newPercentage }: any) => {
            // to avoid the same percentage to be logged twice
            if (newPercentage !== percentage) {
              percentage = newPercentage;
              setProgress(percentage);
              //console.log("percentage", `${percentage}%`);
            }
          })
          .onError((error: any) => {
            setSelectedFile(null);
            console.error(error);
          })
          .onCompleted((newDatalakeObjectKey: string) => {
            setDatalakeObjectKey(newDatalakeObjectKey);
            console.log("newDatalakeObjectKey", newDatalakeObjectKey);
          });

        uploader.start(fileUploadInfo);
      }
    },
    [isFileUploadReadyToStart, selectedFile]
  );

  const cancelUpload = useCallback(() => {
    if (uploader) {
      uploader.abort();
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setSelectedFile(null);
    setDatalakeObjectKey("");
    setProgress(0);
    setUploader(undefined);
  }, [uploader]);

  return {
    selectedFile,
    progress,
    datalakeObjectKey,
    handleFileSelect,
    startUpload,
    cancelUpload,
    isFileUploadReadyToStart,
    fileInputRef,
  };
};
