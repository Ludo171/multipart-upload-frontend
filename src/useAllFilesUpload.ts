import { useCallback } from "react";
import { FileUploadInfo } from "./useFileUpload";
import { AxiosInstance } from "axios";

type UploadFileFunction = (
  apiClient: AxiosInstance,
  fileUploadInfo: FileUploadInfo
) => void;

type AllFilesUploadInput = {
  laboratoryId: string;
  patientId: string;
  apiClient: any;
  selectedFile1: File | null;
  uploadFile1: UploadFileFunction;
};

export const useAllFilesUpload = ({
  laboratoryId,
  patientId,
  apiClient,
  selectedFile1,
  uploadFile1,
}: AllFilesUploadInput) => {
  const startAllFilesUpload = useCallback(async () => {
    const payload = {
      laboratoryId: laboratoryId,
      patientId: patientId,
      normalR1FileName: selectedFile1?.name,
      normalR1FileSize: selectedFile1?.size,
      normalR2FileName: selectedFile1?.name,
      normalR2FileSize: selectedFile1?.size,
      tumorR1FileName: selectedFile1?.name,
      tumorR1FileSize: selectedFile1?.size,
      tumorR2FileName: selectedFile1?.name,
      tumorR2FileSize: selectedFile1?.size,
    };
    const { data: filesUploadUrls } = await apiClient.request({
      url: "biopsies/upload/get-presigned-urls",
      method: "POST",
      data: payload,
    });

    const fileUploadInfo: FileUploadInfo = filesUploadUrls.NormalR1;

    uploadFile1(apiClient, fileUploadInfo);
  }, [laboratoryId, patientId, selectedFile1, apiClient, uploadFile1]);

  return startAllFilesUpload;
};
