import { useCallback } from "react";
import { getPresignedUploadUrls } from "./getPresignedUploadUrls.query";
import { useApiClient } from "../../../../../cross_project/api_client/ApiClientProvider";
import axios from "axios";

export const useGetPresignedUploadUrls = () => {
  const { apiConfig } = useApiClient();
  const apiClient = axios.create(apiConfig);

  console.log(apiClient, "apiClient");
  return useCallback(
    (
      laboratoryId: string,
      patientId: string,
      biopsyId: string,
      normalR1File: File | null,
      normalR2File: File | null,
      tumorR1File: File | null,
      tumorR2File: File | null
    ) => {
      return getPresignedUploadUrls(
        apiClient,
        laboratoryId,
        patientId,
        biopsyId,
        normalR1File,
        normalR2File,
        tumorR1File,
        tumorR2File
      );
    },
    [apiClient]
  );
};
