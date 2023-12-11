import { AxiosInstance } from "axios";
import { FileUploadInfo } from "../domain/behavior/useOneBiopsyFileUpload";

type PresignedUploadUrls = {
  NormalR1: FileUploadInfo;
  NormalR2: FileUploadInfo;
  TumorR1: FileUploadInfo;
  TumorR2: FileUploadInfo;
};

export const getPresignedUploadUrls = async (
  apiClient: AxiosInstance,
  laboratoryId: string,
  patientId: string,
  biopsyId: string,
  normalR1File: File | null,
  normalR2File: File | null,
  tumorR1File: File | null,
  tumorR2File: File | null
): Promise<PresignedUploadUrls> => {
  const url = "biopsies/upload/get-presigned-urls";
  const method = "POST";
  const payload = {
    laboratoryId: laboratoryId,
    patientId: patientId,
    biopsyId: biopsyId,
    normalR1FileName: normalR1File?.name,
    normalR1FileSize: normalR1File?.size,
    normalR2FileName: normalR2File?.name,
    normalR2FileSize: normalR2File?.size,
    tumorR1FileName: tumorR1File?.name,
    tumorR1FileSize: tumorR1File?.size,
    tumorR2FileName: tumorR2File?.name,
    tumorR2FileSize: tumorR2File?.size,
  };

  if (apiClient === undefined) {
    throw new Error("apiClient is undefined");
  }

  const results = await apiClient.request({
    url,
    method,
    data: payload,
  });

  const filesUploadUrls: PresignedUploadUrls = results.data;

  return filesUploadUrls;
};
