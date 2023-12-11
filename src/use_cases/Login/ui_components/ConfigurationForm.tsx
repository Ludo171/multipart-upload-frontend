import "./ConfigurationForm.style.css";
import { useConfigurationForm } from "../domain/behavior/useConfigurationForm";

export const ConfigurationForm = () => {
  const {
    apiUrl,
    apiKey,
    isEditable,
    setApiUrl,
    setApiKey,
    setParams,
    editParams,
  } = useConfigurationForm();

  return (
    <div className="configuration-form">
      <h3>Configuration</h3>
      <input
        type="text"
        placeholder="API URL"
        value={apiUrl}
        onChange={(e) => setApiUrl(e.target.value)}
        required
        disabled={!isEditable}
      />
      <input
        type="password"
        placeholder="API Key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        required
        disabled={!isEditable}
      />
      <div className="buttons">
        <button onClick={setParams} disabled={!isEditable || !apiUrl}>
          Set Params
        </button>
        <button onClick={editParams} disabled={isEditable}>
          Edit Params
        </button>
      </div>
    </div>
  );
};
