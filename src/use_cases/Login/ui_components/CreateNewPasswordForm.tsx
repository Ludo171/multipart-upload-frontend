import "./LoginForm.style.css";
import { useConfirmNewPassword } from "../domain/behavior/useConfirmNewPassword";

export const CreateNewPasswordForm = () => {
  const {
    newPassword,
    newPasswordConfirmation,
    setNewPassword,
    setNewPasswordConfirmation,
    confirmNewPassword,
    isError,
  } = useConfirmNewPassword();

  return (
    <form className="login-form">
      <h3>Create new password</h3>
      <input
        className="login-input"
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <input
        className="login-input"
        type="password"
        placeholder="New Password Confirmation"
        value={newPasswordConfirmation}
        onChange={(e) => setNewPasswordConfirmation(e.target.value)}
        required
      />
      {isError && newPassword !== "" && newPasswordConfirmation !== "" && (
        <p className="error-message">
          Your password must :
          <br />- match the confirmation
          <br />- be at least 12 characters long
          <br />- include at least one uppercase letter
          <br />- include at least one lowercase lette
          <br />- include at least one number
          <br />- include at least one special character
        </p>
      )}
      <button
        className="login-button"
        onClick={(e) => confirmNewPassword(e)}
        disabled={isError}
      >
        Confirm new password
      </button>
    </form>
  );
};
