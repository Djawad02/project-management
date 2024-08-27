import { createBrowserRouter } from "react-router-dom";
import ProjectDetailPage from "../pages/ProjectDetailPage";
import Homepage from "../pages/Homepage";
import Layout from "../pages/Layout";
import ErrorPage from "../pages/ErrorPage";
import SprintDetailsPage from "../pages/SprintDetailsPage";
import ProjectDashboardPage from "../pages/ProjectDashboardPage";
import LoginPage from "../pages/LoginPage";
import ProjectTeamPage from "../pages/ProjectTeamPage";
import EmployeeManagementPage from "../pages/EmployeeManagementPage";
import AddMemberPage from "../pages/AddMemberPage";
import RemoveMemberPage from "../pages/RemoveMemberPage";
import ResourceManagementPage from "../pages/ResourceManagementPage";
import AddNewEmployeeOrganization from "../pages/AddNewEmployeeOrganization";
import RemoveEmployeeOrganization from "../pages/RemoveEmployeeOrganization";
import EmployeeDetailPage from "../pages/EmployeeDetailPage";
import AddNewProject from "../pages/AddNewProject";
import EditMemberPage from "../pages/EditEmployeePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "login", element: <LoginPage /> },
      {
        path: "new-project",
        element: <AddNewProject />,
      },
      {
        path: "projects/:title",
        children: [
          { index: true, element: <ProjectDetailPage /> },
          { path: "details", element: <ProjectDetailPage /> },
          { path: "team", element: <ProjectTeamPage /> },
          { path: "sprint-details", element: <SprintDetailsPage /> },
          { path: "dashboard", element: <ProjectDashboardPage /> },
          { path: "employee-management", element: <EmployeeManagementPage /> },
          { path: "resource-management", element: <ResourceManagementPage /> },
          { path: "add-member", element: <AddMemberPage /> },
          { path: "remove-member", element: <RemoveMemberPage /> },
          { path: "edit-employee", element: <EditMemberPage /> },
          { path: "add-new-employee", element: <AddNewEmployeeOrganization /> },
          {
            path: "remove-employee-organization",
            element: <RemoveEmployeeOrganization />,
          },
          {
            path: "employee-detail",
            element: <EmployeeDetailPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
