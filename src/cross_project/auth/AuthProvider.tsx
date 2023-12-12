import React, { createContext, useEffect } from "react";
import {
  confirmSignInWithNewPassword,
  loginWithCognito,
  logoutWithCognito,
  updateAuthConfig,
} from "./auth.service";
import { User } from "./User.type";
import { getCurrentUser } from "aws-amplify/auth";

type AuthContextType = {
  isAuthConfigured: boolean;
  setAuthConfig: (config: {
    userPoolId: string;
    userPoolClientId: string;
  }) => void;
  user: User | null;
  isLoggedIn: boolean;
  shouldResetPassword: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  confirmNewPassword: (newPassword: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthConfigured: false,
  setAuthConfig: () => {},
  user: null,
  isLoggedIn: false,
  shouldResetPassword: false,
  login: async () => false,
  confirmNewPassword: async () => false,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [isAuthConfigured, setIsAuthConfigured] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [shouldResetPassword, setShouldResetPassword] = React.useState(false);

  const checkAuth = async () => {
    try {
      const user = await getCurrentUser();
      setIsLoggedIn(user !== null);
    } catch (e) {}
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    const loginResponse = await loginWithCognito(username, password);
    if (
      loginResponse.nextStep === "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED"
    ) {
      setShouldResetPassword(true);
      setIsLoggedIn(true);
      return true;
    }
    setIsLoggedIn(loginResponse.isSignedIn);
    return false;
  };

  const confirmNewPassword = async (newPassword: string) => {
    const confirmation = await confirmSignInWithNewPassword(newPassword);
    if (confirmation === true) {
      setShouldResetPassword(false);
      setIsLoggedIn(true);
    }
    return confirmation;
  };

  const logout = async () => {
    await logoutWithCognito();
    setUser(null);
    setIsLoggedIn(false);
    setShouldResetPassword(false);
  };

  const setAuthConfig = (config: {
    userPoolId: string;
    userPoolClientId: string;
  }) => {
    updateAuthConfig(config);
    setIsAuthConfigured(true);
    checkAuth();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthConfigured,
        setAuthConfig,
        user,
        isLoggedIn,
        shouldResetPassword,
        login,
        confirmNewPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
