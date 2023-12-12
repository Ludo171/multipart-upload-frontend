import "./UploadParamsForm.style.css";
import { ParamInputComponent } from "./ParamInput";

type UploadParamsFormProps = {
  laboratoryId: string;
  patientId: string;
  biopsyId: string;
  handleLaboratoryIdChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePatientIdChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBiopsyIdChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const UploadParamsForm = ({
  laboratoryId,
  patientId,
  biopsyId,
  handleLaboratoryIdChange,
  handlePatientIdChange,
  handleBiopsyIdChange,
}: UploadParamsFormProps) => {
  return (
    <div className="params">
      <h3 className="title">Parameters:</h3>
      <ParamInputComponent
        title="Laboratory ID:"
        value={laboratoryId}
        handleValueChange={handleLaboratoryIdChange}
      />
      <ParamInputComponent
        title="Patient ID:"
        value={patientId}
        handleValueChange={handlePatientIdChange}
      />
      <ParamInputComponent
        title="Biopsy ID:"
        value={biopsyId}
        handleValueChange={handleBiopsyIdChange}
      />
    </div>
  );
};
