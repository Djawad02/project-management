import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProjectDetailPage from "../pages/ProjectDetailPage";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/details", element: <ProjectDetailPage /> },
]);

export default router;
