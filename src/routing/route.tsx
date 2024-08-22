import { createBrowserRouter } from "react-router-dom";
import ProjectDetailPage from "../pages/ProjectDetailPage";
import Homepage from "../pages/Homepage";
import Layout from "../pages/Layout";
import ErrorPage from "../pages/ErrorPage";
import UserManagementPage from "../pages/ProjectTeamPage";
import SprintDetailsPage from "../pages/SprintDetailsPage";
import ProjectDashboardPage from "../pages/ProjectDashboardPage";
import LoginPage from "../pages/LoginPage";
import ProjectTeamPage from "../pages/ProjectTeamPage";
import EmployeeManagementPage from "../pages/EmployeeManagementPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "login", element: <LoginPage /> },
      {
        path: "projects/:title",
        children: [
          { index: true, element: <ProjectDetailPage /> },
          { path: "details", element: <ProjectDetailPage /> },
          { path: "team", element: <ProjectTeamPage /> },
          { path: "sprint-details", element: <SprintDetailsPage /> },
          { path: "dashboard", element: <ProjectDashboardPage /> },
          { path: "employee-management", element: <EmployeeManagementPage /> },
        ],
      },
    ],
  },
]);

export default router;
