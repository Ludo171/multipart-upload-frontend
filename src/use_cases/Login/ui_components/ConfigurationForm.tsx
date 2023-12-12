import "./ConfigurationForm.style.css";
import { useConfigurationForm } from "../domain/behavior/useConfigurationForm";

export const ConfigurationForm = () => {
  const {
    apiUrl,
    apiKey,
    authUserPoolId,
    authClientId,
    isEditable,
    setApiUrl,
    setApiKey,
    setAuthUserPoolId,
    setAuthClientId,
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
      <input
        type="text"
        placeholder="Auth User Pool ID"
        value={authUserPoolId}
        onChange={(e) => setAuthUserPoolId(e.target.value)}
        required
        disabled={!isEditable}
      />
      <input
        type="text"
        placeholder="Auth Client ID"
        value={authClientId}
        onChange={(e) => setAuthClientId(e.target.value)}
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
