import { useCallback, useMemo, useRef } from "react";
import {
  FileUploadInfo,
  useOneBiopsyFileUpload,
} from "./useOneBiopsyFileUpload";
import { AxiosInstance } from "axios";

type AllFilesUploadInput = {
  apiClient: AxiosInstance;
  laboratoryId: string;
  patientId: string;
  biopsyId: string;
  onUploadCompleted: () => void;
};

export const useFullBiopsyUpload = ({
  apiClient,
  laboratoryId,
  patientId,
  biopsyId,
  onUploadCompleted,
}: AllFilesUploadInput) => {
  const nbOfUploadedBiopsyFilesRef = useRef<number>(0);

  const handleFileUploadCompletion = async () => {
    nbOfUploadedBiopsyFilesRef.current += 1;
    const isBiopsyFullyUploaded = nbOfUploadedBiopsyFilesRef.current === 4;
    if (isBiopsyFullyUploaded) {
      onUploadCompleted();
    }
  };

  const normalR1 = useOneBiopsyFileUpload({
    onUploadCompleted: handleFileUploadCompletion,
  });
  const normalR2 = useOneBiopsyFileUpload({
    onUploadCompleted: handleFileUploadCompletion,
  });
  const tumorR1 = useOneBiopsyFileUpload({
    onUploadCompleted: handleFileUploadCompletion,
  });
  const tumorR2 = useOneBiopsyFileUpload({
    onUploadCompleted: handleFileUploadCompletion,
  });

  const startAllFilesUpload = useCallback(async () => {
    const payload = {
      laboratoryId: laboratoryId,
      patientId: patientId,
      biopsyId: biopsyId,
      normalR1FileName: normalR1.selectedFile?.name,
      normalR1FileSize: normalR1.selectedFile?.size,
      normalR2FileName: normalR2.selectedFile?.name,
      normalR2FileSize: normalR2.selectedFile?.size,
      tumorR1FileName: tumorR1.selectedFile?.name,
      tumorR1FileSize: tumorR1.selectedFile?.size,
      tumorR2FileName: tumorR2.selectedFile?.name,
      tumorR2FileSize: tumorR2.selectedFile?.size,
    };
    const { data: filesUploadUrls } = await apiClient.request({
      url: "biopsies/upload/get-presigned-urls",
      method: "POST",
      data: payload,
    });

    const NormalR1UploadInfo: FileUploadInfo = filesUploadUrls.NormalR1;
    const NormalR2UploadInfo: FileUploadInfo = filesUploadUrls.NormalR2;
    const TumorR1UploadInfo: FileUploadInfo = filesUploadUrls.TumorR1;
    const TumorR2UploadInfo: FileUploadInfo = filesUploadUrls.TumorR2;

    normalR1.startUpload(apiClient, NormalR1UploadInfo);
    normalR2.startUpload(apiClient, NormalR2UploadInfo);
    tumorR1.startUpload(apiClient, TumorR1UploadInfo);
    tumorR2.startUpload(apiClient, TumorR2UploadInfo);
  }, [
    apiClient,
    laboratoryId,
    patientId,
    biopsyId,
    normalR1,
    normalR2,
    tumorR1,
    tumorR2,
  ]);

  const cancelAllFileUploads = useCallback(() => {
    normalR1.cancelUpload();
    normalR2.cancelUpload();
    tumorR1.cancelUpload();
    tumorR2.cancelUpload();
    nbOfUploadedBiopsyFilesRef.current = 0;
  }, [normalR1, normalR2, tumorR1, tumorR2]);

  const isBiopsyUploadReadyToStart = useMemo(
    () =>
      nbOfUploadedBiopsyFilesRef.current === 0 &&
      normalR1.isFileUploadReadyToStart &&
      normalR2.isFileUploadReadyToStart &&
      tumorR1.isFileUploadReadyToStart &&
      tumorR2.isFileUploadReadyToStart,
    [nbOfUploadedBiopsyFilesRef, normalR1, normalR2, tumorR1, tumorR2]
  );

  return {
    normalR1,
    normalR2,
    tumorR1,
    tumorR2,
    isBiopsyUploadReadyToStart,
    startAllFilesUpload,
    cancelAllFileUploads,
  };
};
