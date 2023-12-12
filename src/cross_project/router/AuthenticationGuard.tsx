import * as React from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import { useAuth } from "../auth/AuthProvider";

export type AuthenticationGuardProps = {
  children?: React.ReactElement;
  redirectPath?: string;
};

export const AuthenticationGuard: React.FC<AuthenticationGuardProps> = ({
  redirectPath = "/",
  ...props
}) => {
  const { isAuthConfigured, isLoggedIn, shouldResetPassword } = useAuth();

  return (
    <ProtectedRoute
      redirectPath={redirectPath}
      isAllowed={isAuthConfigured && isLoggedIn && !shouldResetPassword}
      {...props}
    />
  );
};

export const UnAuthenticationGuard: React.FC<AuthenticationGuardProps> = ({
  redirectPath = "/",
  ...props
}) => {
  const { isAuthConfigured, isLoggedIn, shouldResetPassword } = useAuth();

  return (
    <ProtectedRoute
      redirectPath={redirectPath}
      isAllowed={!isAuthConfigured || !isLoggedIn || shouldResetPassword}
      {...props}
    />
  );
};
