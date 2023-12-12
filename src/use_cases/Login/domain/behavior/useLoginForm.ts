import { useState } from "react";
import { useAuth } from "../../../../cross_project/auth/AuthProvider";

export const useLoginForm = () => {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const isLoggedIn = await login(username, password);
    if (!isLoggedIn) {
      setIsError(true);
      return;
    }
  };

  return {
    username,
    password,
    isError,
    setUsername,
    setPassword,
    handleLogin,
  };
};
