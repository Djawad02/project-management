import { createBrowserRouter } from "react-router-dom";
import ProjectDetailPage from "../pages/ProjectDetailPage";
import Homepage from "../pages/Homepage";
import Layout from "../pages/Layout";
import ErrorPage from "../pages/ErrorPage";
import UserManagementPage from "../pages/UserManagementPage";
import SprintDetailsPage from "../pages/SprintDetailsPage";
import ProjectDashboardPage from "../pages/ProjectDashboardPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Homepage /> },
      {
        path: "projects/:title",
        children: [
          { index: true, element: <ProjectDetailPage /> },
          { path: "details", element: <ProjectDetailPage /> },
          { path: "team", element: <UserManagementPage /> },
          { path: "sprint-details", element: <SprintDetailsPage /> },
          { path: "dashboard", element: <ProjectDashboardPage /> },
        ],
      },
    ],
  },
]);

export default router;
