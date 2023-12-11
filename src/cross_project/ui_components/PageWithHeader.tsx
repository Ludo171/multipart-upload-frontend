import { Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export const PageWithHeader = (): JSX.Element => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <div className="app">
      <h1>MSICare POC</h1>
      {isLoggedIn && (
        <button
          style={{
            position: "absolute",
            right: "10px",
            top: "10px",
          }}
          onClick={logout}
        >
          Logout
        </button>
      )}
      <Outlet />
    </div>
  );
};
