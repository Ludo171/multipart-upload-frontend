import { useAuth } from "../../../cross_project/auth/AuthProvider";
import { ConfigurationForm } from "./ConfigurationForm";
import { CreateNewPasswordForm } from "./CreateNewPasswordForm";
import { LoginForm } from "./LoginForm";

export const LoginPage = () => {
  const { isAuthConfigured, isLoggedIn, shouldResetPassword } = useAuth();

  return (
    <div className="page">
      <h2>Login Page</h2>
      {!isAuthConfigured && <ConfigurationForm />}
      {isAuthConfigured && !isLoggedIn && <LoginForm />}
      {isAuthConfigured && isLoggedIn && shouldResetPassword && (
        <CreateNewPasswordForm />
      )}
    </div>
  );
};
