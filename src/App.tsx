import "./App.css";
import { FileInputComponent } from "./components/FileInputComponent";
import { useUploadParameters } from "./useUploadParameters";
import { useFullBiopsyUpload } from "./useFullBiopsyUpload";
import { useOneBiopsyFileUpload } from "./useOneBiopsyFileUpload";
import { ParamInputComponent } from "./components/ParamInputComponent";
import { useCreateAnalysisAfterBiopsyUpload } from "./useCreateAnalysisAfterBiopsyUpload";

function App() {
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

  const {handleFileUploadCompletion, reinitializeNbOfUploadedBiopsyFiles} = useCreateAnalysisAfterBiopsyUpload({apiClient, laboratoryId, patientId, biopsyId});

  const normalR1 = useOneBiopsyFileUpload({onUploadCompleted: handleFileUploadCompletion});
  const normalR2 = useOneBiopsyFileUpload({onUploadCompleted: handleFileUploadCompletion});
  const tumorR1 = useOneBiopsyFileUpload({onUploadCompleted: handleFileUploadCompletion});
  const tumorR2 = useOneBiopsyFileUpload({onUploadCompleted: handleFileUploadCompletion});

  const { startAllFilesUpload, cancelAllFileUploads } = useFullBiopsyUpload({
    apiClient,
    laboratoryId,
    patientId,
    biopsyId,
    normalR1File: normalR1.selectedFile,
    uploadNormalR1: normalR1.startUpload,
    cancelUploadNormalR1: normalR1.cancelUpload,
    normalR2File: normalR2.selectedFile,
    uploadNormalR2: normalR2.startUpload,
    cancelUploadNormalR2: normalR2.cancelUpload,
    tumorR1File: tumorR1.selectedFile,
    uploadTumorR1: tumorR1.startUpload,
    cancelUploadTumorR1: tumorR1.cancelUpload,
    tumorR2File: tumorR2.selectedFile,
    uploadTumorR2: tumorR2.startUpload,
    cancelUploadTumorR2: tumorR2.cancelUpload,
    reinitializeNbOfUploadedBiopsyFiles,
  });

  return (
    <div className="App">
      <h1>PoC MSInsight - File Upload Form</h1>
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
      <div className="fileInputs">
        <FileInputComponent
          title="Normal R1 File:"
          objectKey={normalR1.datalakeObjectKey}
          progress={normalR1.progress}
          handleFileSelect={normalR1.handleFileSelect}
          fileInputRef={normalR1.fileInputRef}
        />
        <FileInputComponent
          title="Normal R2 File:"
          objectKey={normalR2.datalakeObjectKey}
          progress={normalR2.progress}
          handleFileSelect={normalR2.handleFileSelect}
          fileInputRef={normalR2.fileInputRef}
        />
        <FileInputComponent
          title="Tumor R1 File:"
          objectKey={tumorR1.datalakeObjectKey}
          progress={tumorR1.progress}
          handleFileSelect={tumorR1.handleFileSelect}
          fileInputRef={tumorR1.fileInputRef}
        />
        <FileInputComponent
          title="Tumor R2 File:"
          objectKey={tumorR2.datalakeObjectKey}
          progress={tumorR2.progress}
          handleFileSelect={tumorR2.handleFileSelect}
          fileInputRef={tumorR2.fileInputRef}
        />
      </div>
      <div className="controls">
        <h3 className="title">Controls:</h3>
        <div>
          <button
            disabled={
              !normalR1.isFileUploadReadyToStart ||
              !normalR2.isFileUploadReadyToStart ||
              !tumorR1.isFileUploadReadyToStart ||
              !tumorR2.isFileUploadReadyToStart ||
              !areParametersValid
            }
            onClick={startAllFilesUpload}
          >
            Start Upload !
          </button>
          <button onClick={cancelAllFileUploads}>Cancel upload / Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
