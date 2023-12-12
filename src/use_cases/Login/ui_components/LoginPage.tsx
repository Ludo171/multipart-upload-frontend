import { useAuth } from "../../../cross_project/auth/AuthProvider";
import { ConfigurationForm } from "./ConfigurationForm";
import { LoginForm } from "./LoginForm";

export const LoginPage = () => {
  const { isAuthConfigured, isLoggedIn } = useAuth();

  return (
    <div className="page">
      <h2>Login Page</h2>
      {!isAuthConfigured && <ConfigurationForm />}
      {isAuthConfigured && !isLoggedIn && <LoginForm />}
    </div>
  );
};
