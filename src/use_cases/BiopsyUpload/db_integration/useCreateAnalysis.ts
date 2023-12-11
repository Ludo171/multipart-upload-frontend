import { useCallback } from "react";
import { useApiClient } from "../../../cross_project/api_client/ApiClientProvider";
import { CreateAnalysisInput, createAnalysis } from "./createAnalysis.query";
import axios from "axios";

export const useCreateAnalysis = () => {
  const { apiConfig } = useApiClient();
  const apiClient = axios.create(apiConfig);

  return useCallback(
    ({ laboratoryId, patientId, biopsyId }: CreateAnalysisInput) => {
      return createAnalysis(apiClient, {
        laboratoryId,
        patientId,
        biopsyId,
      });
    },
    [apiClient]
  );
};
