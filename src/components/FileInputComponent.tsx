import FileUpload from "./FileUploadComponent";

type FileInputProps = {
  objectKey: string;
  progress: number;
  handleFileSelect: (e: FileList | null) => void;
};

export const FileInputComponent = ({
  objectKey,
  progress,
  handleFileSelect,
}: FileInputProps) => {
  return (
    <div className="fileInput">
      <h3 className="title">Normal R1:</h3>
      <div className="uploadProgress">
        <FileUpload className="rawInput" handleOnselect={handleFileSelect} />
        <p>Upload Progress: {progress === 0 ? "" : `${progress} %`}</p>
      </div>
      <label className="objectKey">File key in the datalake: {objectKey}</label>
    </div>
  );
};
