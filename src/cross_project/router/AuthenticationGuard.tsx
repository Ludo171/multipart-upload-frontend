import * as React from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import { useAuth } from "../auth/AuthProvider";

export type AuthenticationGuardProps = {
  children?: React.ReactElement;
  redirectPath?: string;
};

export const AuthenticationGuard: React.FC<AuthenticationGuardProps> = ({
  redirectPath = "/login",
  ...props
}) => {
  const { user } = useAuth();

  return (
    <ProtectedRoute redirectPath={redirectPath} isAllowed={!!user} {...props} />
  );
};

export const UnAuthenticationGuard: React.FC<AuthenticationGuardProps> = ({
  redirectPath = "/",
  ...props
}) => {
  const { user } = useAuth();

  return (
    <ProtectedRoute redirectPath={redirectPath} isAllowed={!user} {...props} />
  );
};
