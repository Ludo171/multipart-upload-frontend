import { useState } from "react";
import { useApiClient } from "../../../../cross_project/api_client/ApiClientProvider";

export const useConfigurationForm = () => {
  const [apiUrl, setApiUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isEditable, setIsEditable] = useState(true);

  const { apiConfig, updateApiConfig } = useApiClient();

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
    setIsEditable(false);
  };

  const editParams = () => {
    setIsEditable(true);
  };

  return {
    apiUrl,
    apiKey,
    isEditable,
    setApiUrl,
    setApiKey,
    setParams,
    editParams,
  };
};
