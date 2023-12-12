import { useEffect, useState } from "react";
import { useAuth } from "../../../../cross_project/auth/AuthProvider";
import { PASSWORD_REGEX } from "../../../../cross_project/auth/auth.service";

export const useConfirmNewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
  const [isError, setIsError] = useState(false);

  const { confirmNewPassword: confirm } = useAuth();
  const confirmNewPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isError) {
      const confirmation = await confirm(newPassword);
      if (confirmation === false) {
        setIsError(true);
      }
    }
  };

  useEffect(() => {
    const isValid =
      newPassword !== "" &&
      newPasswordConfirmation !== "" &&
      newPassword === newPasswordConfirmation &&
      newPassword.length >= 12 &&
      newPasswordConfirmation.length >= 12 &&
      newPassword.match(PASSWORD_REGEX);
    setIsError(!isValid);
  }, [newPassword, newPasswordConfirmation]);

  return {
    newPassword,
    newPasswordConfirmation,
    isError,
    setNewPassword,
    setNewPasswordConfirmation,
    confirmNewPassword,
  };
};
