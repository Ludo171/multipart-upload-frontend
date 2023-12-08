import "./BiopsyFilesSelector.style.css";
import { FileInputComponent } from "./FileInput";

type BiopsyFileUploadInfo = {
  datalakeObjectKey: string;
  progress: number;
  fileInputRef: React.RefObject<HTMLInputElement>;
};

type fileSelectHandler = (files: FileList | null) => void;

type BiopsyFilesInputProps = {
  normalR1: BiopsyFileUploadInfo & { handleFileSelect: fileSelectHandler };
  normalR2: BiopsyFileUploadInfo & { handleFileSelect: fileSelectHandler };
  tumorR1: BiopsyFileUploadInfo & { handleFileSelect: fileSelectHandler };
  tumorR2: BiopsyFileUploadInfo & { handleFileSelect: fileSelectHandler };
};

export const BiopsyFilesSelector = ({
  normalR1,
  normalR2,
  tumorR1,
  tumorR2,
}: BiopsyFilesInputProps): JSX.Element => {
  return (
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
  );
};
