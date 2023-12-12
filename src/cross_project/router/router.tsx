import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import NewBiopsyPage from "../../use_cases/BiopsyUpload/ui_components/UploadBiopsyPage";
import { LoginPage } from "../../use_cases/Login/ui_components/LoginPage";
import {
  AuthenticationGuard,
  UnAuthenticationGuard,
} from "./AuthenticationGuard";
import { NotFoundPage } from "../ui_components/NotFoundPage";
import { PageWithHeader } from "../ui_components/PageWithHeader";
import { ROUTES } from "./routes";

const routes = createRoutesFromElements(
  <Route element={<PageWithHeader />}>
    {/* Protect route based on authentication */}
    <Route element={<AuthenticationGuard redirectPath={ROUTES.LOGIN} />}>
      <Route path={ROUTES.NEW_BIOPSY} element={<NewBiopsyPage />} />
      <Route path="*" element={<Navigate to={ROUTES.NEW_BIOPSY} replace />} />
    </Route>

    {/* Login page in case unauthenticated */}
    <Route element={<UnAuthenticationGuard redirectPath={ROUTES.NEW_BIOPSY} />}>
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
    </Route>

    <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
  </Route>
);

export const router = createBrowserRouter(routes);
