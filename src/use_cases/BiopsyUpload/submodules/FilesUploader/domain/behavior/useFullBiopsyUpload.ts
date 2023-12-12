import { useCallback, useMemo, useRef } from "react";
import {
  FileUploadInfo,
  useOneBiopsyFileUpload,
} from "./useOneBiopsyFileUpload";
import { useGetPresignedUploadUrls } from "../../db_integration/useGetPresignedUploadUrls";

type AllFilesUploadInput = {
  laboratoryId: string;
  patientId: string;
  biopsyId: string;
  onUploadCompleted: () => void;
};

export const useFullBiopsyUpload = ({
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

  const getPresignedUploadUrls = useGetPresignedUploadUrls();

  const startAllFilesUpload = useCallback(async () => {
    const filesUploadUrls = await getPresignedUploadUrls(
      laboratoryId,
      patientId,
      biopsyId,
      normalR1.selectedFile,
      normalR2.selectedFile,
      tumorR1.selectedFile,
      tumorR2.selectedFile
    );

    const NormalR1UploadInfo: FileUploadInfo = filesUploadUrls.NormalR1;
    const NormalR2UploadInfo: FileUploadInfo = filesUploadUrls.NormalR2;
    const TumorR1UploadInfo: FileUploadInfo = filesUploadUrls.TumorR1;
    const TumorR2UploadInfo: FileUploadInfo = filesUploadUrls.TumorR2;

    normalR1.startUpload(NormalR1UploadInfo);
    normalR2.startUpload(NormalR2UploadInfo);
    tumorR1.startUpload(TumorR1UploadInfo);
    tumorR2.startUpload(TumorR2UploadInfo);
  }, [
    getPresignedUploadUrls,
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
