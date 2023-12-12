import { useState } from "react";
import { useApiClient } from "../../../../cross_project/api_client/ApiClientProvider";
import { useAuth } from "../../../../cross_project/auth/AuthProvider";

export const useConfigurationForm = () => {
  const [apiUrl, setApiUrl] = useState("");
  const [apiKey, setApiKey] = useState("");

  const [authUserPoolId, setAuthUserPoolId] = useState("");
  const [authClientId, setAuthClientId] = useState("");

  const [isEditable, setIsEditable] = useState(true);

  const { apiConfig, updateApiConfig } = useApiClient();
  const { setAuthConfig } = useAuth();

  const setParams = () => {
    const headers = apiConfig.headers;
    console.log("updateApiClient");
    console.log({
      baseUrl: apiUrl,
      headers: {
        ...headers,
        "x-api-key": apiKey,
      },
    });
    updateApiConfig({
      baseUrl: apiUrl,
      headers: {
        ...headers,
        "x-api-key": apiKey,
      },
    });

    setAuthConfig({
      userPoolId: authUserPoolId,
      userPoolClientId: authClientId,
    });

    setIsEditable(false);
  };

  const editParams = () => {
    setIsEditable(true);
  };

  return {
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
  };
};
