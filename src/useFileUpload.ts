import { useCallback, useRef, useState } from "react";
import { Uploader } from "./utils/Uploader";

export const useFileUpload = (
  apiBaseUrl: string,
  apiKey: string,
  patientId: string,
  laboratoryId: string
) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploader, setUploader] = useState<any>(undefined);
  const [progress, setProgress] = useState(0);
  const [datalakeObjectKey, setDatalakeObjectKey] = useState<string>("");

  const handleFileSelect = (files: FileList | null) => {
    if (files) {
      setSelectedFile(files[0]);
    }
  };

  const startUpload = useCallback(() => {
    if (selectedFile) {
      let percentage: any = undefined;

      const videoUploaderOptions = {
        file: selectedFile,
        apiBaseUrl: apiBaseUrl,
        apiKey: apiKey,
        patientId: patientId,
        laboratoryId: laboratoryId,
      };
      const uploader = new Uploader(videoUploaderOptions);
      setUploader(uploader);

      uploader
        .onProgress(({ percentage: newPercentage }: any) => {
          // to avoid the same percentage to be logged twice
          if (newPercentage !== percentage) {
            percentage = newPercentage;
            setProgress(percentage);
            console.log("percentage", `${percentage}%`);
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

      uploader.start();
    }
  }, [selectedFile, apiBaseUrl, apiKey, patientId, laboratoryId]);

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

  const isFileUploadReadyToStart = selectedFile !== undefined && progress === 0;

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
