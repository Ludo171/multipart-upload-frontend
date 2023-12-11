import React, { createContext } from "react";

type ApiContextType = {
  apiUrl: string;
  updateApiConfig: (config: { apiUrl: string }) => void;
};

type AuthServiceContextType = {
  authIdentityPoolId: string;
  authUserPoolId: string;
  authUserPoolWebClientId: string;
  updateAuthServiceConfig: (config: {
    authIdentityPoolId: string;
    authUserPoolId: string;
    authUserPoolWebClientId: string;
  }) => void;
};

type EnvContextType = ApiContextType & AuthServiceContextType;

const defaultEnv = {
  apiUrl: "",
  updateApiConfig: (config: { apiUrl: string }) => void 0,
  authIdentityPoolId: "",
  authUserPoolId: "",
  authUserPoolWebClientId: "",
  updateAuthServiceConfig: (config: {
    authIdentityPoolId: string;
    authUserPoolId: string;
    authUserPoolWebClientId: string;
  }) => void 0,
};

const EnvContext = createContext<EnvContextType>(defaultEnv);

export const PublicPocEnvProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [env, setEnv] = React.useState<EnvContextType>(defaultEnv);

  const updateApiConfig = (config: { apiUrl: string }) => {
    setEnv((prev) => ({ ...prev, ...config }));
  };

  const updateAuthServiceConfig = (config: {
    authIdentityPoolId: string;
    authUserPoolId: string;
    authUserPoolWebClientId: string;
  }) => {
    setEnv((prev) => ({ ...prev, ...config }));
  };

  return (
    <EnvContext.Provider
      value={{ ...env, updateApiConfig, updateAuthServiceConfig }}
    >
      {children}
    </EnvContext.Provider>
  );
};

export const usePublicPocEnv = () => React.useContext(EnvContext);
