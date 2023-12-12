import "./UploadBiopsyPage.style.css";
import { UploadParamsForm } from "../submodules/UploadParams/ui_components/UploadParamsForm";
import { useUploadParameters } from "../submodules/UploadParams/domain/behavior/useUploadParameters";
import { useFullBiopsyUpload } from "../submodules/FilesUploader/domain/behavior/useFullBiopsyUpload";
import { BiopsyFilesSelector } from "../submodules/FilesUploader/ui_components/BiopsyFilesSelector";
import { BiopsyUploadControls } from "../submodules/FilesUploader/ui_components/BiopsyUploadControls";
import { useCreateAnalysis } from "../db_integration/useCreateAnalysis";

function NewBiopsyPage() {
  const {
    laboratoryId,
    patientId,
    biopsyId,
    handleLaboratoryIdChange,
    handlePatientIdChange,
    handleBiopsyIdChange,
    areParametersValid,
  } = useUploadParameters();

  const createAnalysis = useCreateAnalysis();

  const {
    normalR1,
    normalR2,
    tumorR1,
    tumorR2,
    isBiopsyUploadReadyToStart,
    startAllFilesUpload,
    cancelAllFileUploads,
  } = useFullBiopsyUpload({
    laboratoryId,
    patientId,
    biopsyId,
    onUploadCompleted: () =>
      createAnalysis({
        laboratoryId,
        patientId,
        biopsyId,
      }),
  });

  return (
    <div className="page">
      <h2>Upload a new biopsy (and start an analysis automatically)</h2>
      <UploadParamsForm
        laboratoryId={laboratoryId}
        patientId={patientId}
        biopsyId={biopsyId}
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
