import { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import React, { createContext } from "react";

type ApiConfigUpdater = ({
  baseUrl,
  headers,
}: {
  baseUrl: string;
  headers: AxiosRequestHeaders | undefined;
}) => void;

type ApiClientContextType = {
  apiConfig: AxiosRequestConfig;
  updateApiConfig: ApiConfigUpdater;
};

const defaultApiConfig: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

const defaultApiClientContext = {
  apiConfig: defaultApiConfig,
  updateApiConfig: ({
    baseUrl,
    headers,
  }: {
    baseUrl: string;
    headers: AxiosRequestHeaders | undefined;
  }) => void 0,
};

const ApiClientContext = createContext<ApiClientContextType>(
  defaultApiClientContext
);

export const ApiClientProvider = ({ children }: { children: JSX.Element }) => {
  const [apiConfig, setApiConfig] = React.useState(defaultApiConfig);

  const updateApiConfig: ApiConfigUpdater = async ({ baseUrl, headers }) => {
    const newApiConfig = {
      ...apiConfig,
      baseURL: baseUrl,
      headers,
    };
    setApiConfig(newApiConfig);
  };

  return (
    <ApiClientContext.Provider value={{ apiConfig, updateApiConfig }}>
      {children}
    </ApiClientContext.Provider>
  );
};

export const useApiClient = () => React.useContext(ApiClientContext);
