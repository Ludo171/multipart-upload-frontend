import "./App.css";
import { FileInputComponent } from "./components/FileInputComponent";
import { useUploadParameters } from "./useUploadParameters";
import { useAllFilesUpload } from "./useAllFilesUpload";
import { useFileUpload } from "./useFileUpload";
import { ParamInputComponent } from "./components/ParamInputComponent";

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
      </div>
      <div className="fileInputs">
        <FileInputComponent
          title="Normal R1 File:"
          objectKey={datalakeObjectKey}
          progress={progress}
          handleFileSelect={handleFileSelect}
          fileInputRef={fileInputRef}
        />
        <FileInputComponent
          title="Normal R2 File:"
          objectKey={""}
          progress={0}
          handleFileSelect={() => void 0}
          fileInputRef={fileInputRef}
        />
        <FileInputComponent
          title="Tumor R1 File:"
          objectKey={""}
          progress={0}
          handleFileSelect={() => void 0}
          fileInputRef={fileInputRef}
        />
        <FileInputComponent
          title="Tumor R2 File:"
          objectKey={""}
          progress={0}
          handleFileSelect={() => void 0}
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
