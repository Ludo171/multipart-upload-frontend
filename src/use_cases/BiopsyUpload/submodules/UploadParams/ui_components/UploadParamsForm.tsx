import "./UploadParamsForm.style.css";
import { ParamInputComponent } from "./ParamInput";

type UploadParamsFormProps = {
  apiBaseUrl: string;
  apiKey: string;
  laboratoryId: string;
  patientId: string;
  biopsyId: string;
  handleApiBaseUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleApiKeyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLaboratoryIdChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePatientIdChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBiopsyIdChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const UploadParamsForm = ({
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
}: UploadParamsFormProps) => {
  return (
    <div className="params">
      <h3 className="title">Parameters:</h3>
      <ParamInputComponent
        title="Base API Url:"
        value={apiBaseUrl}
        handleValueChange={handleApiBaseUrlChange}
      />
      <ParamInputComponent
        title="API Key:"
        value={apiKey}
        handleValueChange={handleApiKeyChange}
        type="password"
      />
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
