import "./App.css";
import { FileInputComponent } from "./components/FileInputComponent";
import { useUploadParameters } from "./useUploadParameters";
import { useAllFilesUpload } from "./useAllFilesUpload";
import { useFileUpload } from "./useFileUpload";

function App() {
  const {
    apiBaseUrl,
    apiKey,
    apiClient,
    patientId,
    laboratoryId,
    handleApiBaseUrlChange,
    handleApiKeyChange,
    handleLaboratoryIdChange,
    handlePatientIdChange,
    areParametersValid,
  } = useUploadParameters();

  const {
    selectedFile,
    fileInputRef,
    progress,
    datalakeObjectKey,
    handleFileSelect,
    startUpload,
    cancelUpload,
    isFileUploadReadyToStart,
  } = useFileUpload();

  const startAllFilesUpload = useAllFilesUpload({
    apiClient,
    laboratoryId,
    patientId,
    selectedFile1: selectedFile,
    uploadFile1: startUpload,
  });

  return (
    <div className="App">
      <h1>PoC MSInsight - File Upload Form</h1>
      <div className="apiSettings">
        <div className="url">
          <span>API Base URL: </span>
          <input
            type="text"
            value={apiBaseUrl}
            onChange={handleApiBaseUrlChange}
          />
        </div>
        <div>
          <span>API Key: </span>
          <input type="password" value={apiKey} onChange={handleApiKeyChange} />
        </div>
        <div className="laboratoryId">
          <span>Laboratory ID: </span>
          <input
            type="text"
            value={laboratoryId}
            onChange={handleLaboratoryIdChange}
          />
        </div>
        <div className="patientId">
          <span>Patient ID: </span>
          <input
            type="text"
            value={patientId}
            onChange={handlePatientIdChange}
          />
        </div>
      </div>

      <div className="fileInputs">
        <FileInputComponent
          objectKey={datalakeObjectKey}
          progress={progress}
          handleFileSelect={handleFileSelect}
          fileInputRef={fileInputRef}
        />
      </div>
      <div className="controls">
        <h3 className="title">Controls:</h3>
        <div>
          <button
            disabled={!isFileUploadReadyToStart || !areParametersValid}
            onClick={startAllFilesUpload}
          >
            Start Upload !
          </button>
          <button onClick={cancelUpload}>Cancel upload / Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
