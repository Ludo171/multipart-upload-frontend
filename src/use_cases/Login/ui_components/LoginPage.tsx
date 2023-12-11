import { ConfigurationForm } from "./ConfigurationForm";
import { LoginForm } from "./LoginForm";

export const LoginPage = () => {
  return (
    <div className="page">
      <h2>Login Page</h2>
      <ConfigurationForm />
      <LoginForm />
    </div>
  );
};
