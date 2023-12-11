import "./LoginForm.style.css";
import { useLoginForm } from "../domain/behavior/useLoginForm";

export const LoginForm = () => {
  const { username, password, setUsername, setPassword, handleLogin } =
    useLoginForm();

  return (
    <form className="login-form">
      <h3>Login</h3>
      <input
        className="login-input"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        className="login-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        className="login-button"
        onClick={(e) => handleLogin(e)}
        disabled={!username || !password}
      >
        Login
      </button>
    </form>
  );
};
