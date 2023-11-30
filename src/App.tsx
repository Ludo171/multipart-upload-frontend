import React, { useState } from "react";
import "./App.css";
import { Uploader } from "./utils/Uploader";
import { FileInputComponent } from "./components/FileInputComponent";

function App() {
  const [file, setFile] = useState<any>(undefined);
  const [uploader, setUploader] = useState<any>(undefined);
  const [progress, setProgress] = useState(0);
  const [apiBaseUrl, setApiBaseUrl] = useState<string>(
    process.env.REACT_APP_API_BASE_URL ?? ""
  );
  const [apiKey, setApiKey] = useState<string>("");
  const [objectKey, setObjectKey] = useState<string>("");
  const [patientId, setPatientId] = useState<string>("");
  const [laboratoryId, setLaboratoryId] = useState<string>("");

  const handleApiBaseUrlChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setApiBaseUrl(event.target.value);
  };

  const handleApiKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(event.target.value);
  };
  const handlePatientIdChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPatientId(event.target.value);
  };
  const handleLaboratoryIdChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLaboratoryId(event.target.value);
  };

  const handleFileSelect = (files: FileList | null) => {
    if (files) {
      setFile(files[0]);
    }
  };

  const uploadFile = () => {
    if (file) {
      console.log(file);

      let percentage: any = undefined;

      const videoUploaderOptions = {
        file: file,
        apiBaseUrl: apiBaseUrl,
        apiKey: apiKey,
        patientId: patientId,
        laboratoryId: laboratoryId,
      };
      const uploader = new Uploader(videoUploaderOptions);
      setUploader(uploader);

      uploader
        .onProgress(({ percentage: newPercentage }: any) => {
          // to avoid the same percentage to be logged twice
          if (newPercentage !== percentage) {
            percentage = newPercentage;
            setProgress(percentage);
            console.log("percentage", `${percentage}%`);
          }
        })
        .onError((error: any) => {
          setFile(undefined);
          console.error(error);
        })
        .onCompleted((newObjectKey: string) => {
          setObjectKey(newObjectKey);
          console.log("newObjectKey", newObjectKey);
        });

      uploader.start();
    }
  };

  const cancelUpload = () => {
    if (uploader) {
      uploader.abort();
    }
    setFile(undefined);
    setObjectKey("");
    setProgress(0);
  };

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
        <div className="key">
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
          objectKey={objectKey}
          progress={progress}
          handleFileSelect={handleFileSelect}
        />
      </div>
      <div className="controls">
        <h3 className="title">Controls:</h3>
        <div>
          <button
            disabled={
              file === undefined ||
              progress > 0 ||
              apiBaseUrl === "" ||
              apiKey === "" ||
              patientId === "" ||
              laboratoryId === ""
            }
            onClick={uploadFile}
          >
            Start Upload !
          </button>
          <button onClick={cancelUpload}>Cancel upload</button>
        </div>
      </div>
    </div>
  );
}

export default App;
