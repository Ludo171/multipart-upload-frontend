import "./BiopsyUploadControls.style.css";

type BiopsyUploadControlsProps = {
  startUpload: () => void;
  cancelUploadAndReset: () => void;
  isUploadEnabled: boolean;
};

export const BiopsyUploadControls = ({
  startUpload,
  cancelUploadAndReset,
  isUploadEnabled,
}: BiopsyUploadControlsProps): JSX.Element => {
  return (
    <div className="controls">
      <h3 className="title">Controls:</h3>
      <div>
        <button disabled={!isUploadEnabled} onClick={startUpload}>
          Start Upload !
        </button>
        <button onClick={cancelUploadAndReset}>Cancel upload / Reset</button>
      </div>
    </div>
  );
};
