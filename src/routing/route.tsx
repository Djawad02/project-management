import { createBrowserRouter } from "react-router-dom";
import ProjectDetailPage from "../pages/ProjectDetailPage";
import Homepage from "../pages/Homepage";
import Layout from "../pages/Layout";
import ErrorPage from "../pages/ErrorPage";
import UserManagementPage from "../pages/UserManagementPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "projects/:title", element: <ProjectDetailPage /> },
      {
        path: "projects/:title/team",
        element: <UserManagementPage />,
      },
    ],
  },
]);

export default router;
