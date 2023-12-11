import * as React from "react";
import "./App.style.css";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./cross_project/auth/AuthProvider";
import { router } from "./cross_project/router/router";
import { ApiClientProvider } from "./cross_project/api_client/ApiClientProvider";

const App = () => (
  <ApiClientProvider>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </ApiClientProvider>
);

export default App;
