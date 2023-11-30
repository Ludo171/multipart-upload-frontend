import { useState } from "react";

export const useUploadParameters = () => {
  const [apiBaseUrl, setApiBaseUrl] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>("");
  const [patientId, setPatientId] = useState<string>("");
  const [laboratoryId, setLaboratoryId] = useState<string>("");

  const handleApiBaseUrlChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setApiBaseUrl(event.target.value);

  const handleApiKeyChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setApiKey(event.target.value);

  const handlePatientIdChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPatientId(event.target.value);

  const handleLaboratoryIdChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setLaboratoryId(event.target.value);

  const areParametersValid =
    apiBaseUrl !== "" &&
    apiKey !== "" &&
    patientId !== "" &&
    laboratoryId !== "";

  return {
    apiBaseUrl,
    apiKey,
    patientId,
    laboratoryId,
    handleApiBaseUrlChange,
    handleApiKeyChange,
    handlePatientIdChange,
    handleLaboratoryIdChange,
    areParametersValid,
  };
};
