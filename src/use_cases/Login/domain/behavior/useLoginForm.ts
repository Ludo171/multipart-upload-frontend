import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../../cross_project/auth/AuthProvider";
import { ROUTES } from "../../../../cross_project/router/routes";

export const useLoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const targetPageBeforeLogin: string | undefined =
    location.state?.from?.pathname;

  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    await login();
    navigate(targetPageBeforeLogin || ROUTES.NEW_BIOPSY, { replace: true });
  };

  return {
    username,
    password,
    setUsername,
    setPassword,
    handleLogin,
  };
};
