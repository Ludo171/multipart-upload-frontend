import { useState } from "react";

export const useUploadParameters = () => {
  const [patientId, setPatientId] = useState<string>("");
  const [laboratoryId, setLaboratoryId] = useState<string>("");
  const [biopsyId, setBiopsyId] = useState<string>("");

  const handleLaboratoryIdChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setLaboratoryId(event.target.value);

  const handlePatientIdChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPatientId(event.target.value);

  const handleBiopsyIdChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setBiopsyId(event.target.value);

  const areParametersValid =
    laboratoryId !== "" && patientId !== "" && biopsyId !== "";

  return {
    laboratoryId,
    patientId,
    biopsyId,
    handleLaboratoryIdChange,
    handlePatientIdChange,
    handleBiopsyIdChange,
    areParametersValid,
  };
};
