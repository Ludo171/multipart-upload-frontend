import { useCallback } from "react";
import {
  CreateAnalysisInput,
  createAnalysis,
} from "../../db_integration/createAnalysis.query";

export const useCreateAnalysis = ({
  apiClient,
  laboratoryId,
  patientId,
  biopsyId,
}: CreateAnalysisInput) => {
  return useCallback(
    () =>
      createAnalysis({
        apiClient,
        laboratoryId,
        patientId,
        biopsyId,
      }),
    [apiClient, biopsyId, laboratoryId, patientId]
  );
};
