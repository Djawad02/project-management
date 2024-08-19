import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProjectDetailPage from "../pages/ProjectDetailPage";
import Homepage from "../pages/Homepage";
import Layout from "../pages/Layout";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "projects/:id", element: <ProjectDetailPage /> },
    ],
  },
]);

export default router;
