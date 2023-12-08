import axios from "axios";
import { useMemo, useState } from "react";

export const useUploadParameters = () => {
  const [apiBaseUrl, setApiBaseUrl] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>("");
  const [patientId, setPatientId] = useState<string>("");
  const [laboratoryId, setLaboratoryId] = useState<string>("");
  const [biopsyId, setBiopsyId] = useState<string>("");

  const handleApiBaseUrlChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setApiBaseUrl(event.target.value);

  const handleApiKeyChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setApiKey(event.target.value);

  const handleLaboratoryIdChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setLaboratoryId(event.target.value);

  const handlePatientIdChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPatientId(event.target.value);

  const handleBiopsyIdChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setBiopsyId(event.target.value);

  const areParametersValid =
    apiBaseUrl !== "" &&
    apiKey !== "" &&
    laboratoryId !== "" &&
    patientId !== "" &&
    biopsyId !== "";

  const apiClient = useMemo(
    () =>
      axios.create({
        baseURL: apiBaseUrl,
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json",
        },
      }),
    [apiBaseUrl, apiKey]
  );

  return {
    apiClient,
    apiBaseUrl,
    apiKey,
    laboratoryId,
    patientId,
    biopsyId,
    handleApiBaseUrlChange,
    handleApiKeyChange,
    handleLaboratoryIdChange,
    handlePatientIdChange,
    handleBiopsyIdChange,
    areParametersValid,
  };
};
