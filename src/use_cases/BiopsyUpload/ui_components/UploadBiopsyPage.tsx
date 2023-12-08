import "./UploadBiopsyPage.style.css";
import { UploadParamsForm } from "../submodules/UploadParams/ui_components/UploadParamsForm";
import { useUploadParameters } from "../submodules/UploadParams/domain/behavior/useUploadParameters";
import { useFullBiopsyUpload } from "../submodules/FilesUploader/domain/behavior/useFullBiopsyUpload";
import { useCreateAnalysis } from "../domain/behaviour/useCreateAnalysis";
import { BiopsyFilesSelector } from "../submodules/FilesUploader/ui_components/BiopsyFilesSelector";
import { BiopsyUploadControls } from "../submodules/FilesUploader/ui_components/BiopsyUploadControls";

function NewBiopsyPage() {
  const {
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
  } = useUploadParameters();

  const createAnalysis = useCreateAnalysis({
    apiClient,
    laboratoryId,
    patientId,
    biopsyId,
  });

  const {
    normalR1,
    normalR2,
    tumorR1,
    tumorR2,
    isBiopsyUploadReadyToStart,
    startAllFilesUpload,
    cancelAllFileUploads,
  } = useFullBiopsyUpload({
    apiClient,
    laboratoryId,
    patientId,
    biopsyId,
    onUploadCompleted: createAnalysis,
  });

  return (
    <div className="App">
      <h1>PoC MSInsight - File Upload Form</h1>
      <UploadParamsForm
        apiBaseUrl={apiBaseUrl}
        apiKey={apiKey}
        laboratoryId={laboratoryId}
        patientId={patientId}
        biopsyId={biopsyId}
        handleApiBaseUrlChange={handleApiBaseUrlChange}
        handleApiKeyChange={handleApiKeyChange}
        handleLaboratoryIdChange={handleLaboratoryIdChange}
        handlePatientIdChange={handlePatientIdChange}
        handleBiopsyIdChange={handleBiopsyIdChange}
      />
      <BiopsyFilesSelector
        normalR1={normalR1}
        normalR2={normalR2}
        tumorR1={tumorR1}
        tumorR2={tumorR2}
      />
      <BiopsyUploadControls
        startUpload={startAllFilesUpload}
        cancelUploadAndReset={cancelAllFileUploads}
        isUploadEnabled={areParametersValid && isBiopsyUploadReadyToStart}
      />
    </div>
  );
}

export default NewBiopsyPage;
