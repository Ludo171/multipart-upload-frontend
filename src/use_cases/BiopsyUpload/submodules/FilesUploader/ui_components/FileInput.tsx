import { ChangeEvent, RefObject } from "react";

type FileInputProps = {
  title: string;
  objectKey: string;
  progress: number;
  handleFileSelect: (e: FileList | null) => void;
  fileInputRef: RefObject<HTMLInputElement>;
};

export const FileInputComponent = ({
  title,
  objectKey,
  progress,
  handleFileSelect,
  fileInputRef,
}: FileInputProps) => {
  return (
    <div className="fileInput">
      <h3 className="title">{title}</h3>
      <div className="uploadProgress">
        <input
          className="rawInput"
          type="file"
          onChange={(e: ChangeEvent) =>
            handleFileSelect((e?.target as HTMLInputElement)?.files)
          }
          ref={fileInputRef}
        />
        <p>Upload Progress: {progress === 0 ? "" : `${progress} %`}</p>
      </div>
      <label className="objectKey">File key in the datalake: {objectKey}</label>
    </div>
  );
};
