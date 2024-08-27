import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import router from "./routing/route";
import { AuthProvider } from "./context/AuthContext";
import { ProjectProvider } from "./context/ProjectContext";
import { EmployeeProvider } from "./context/EmployeeContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <ProjectProvider>
          <EmployeeProvider>
            <RouterProvider router={router} />
          </EmployeeProvider>
        </ProjectProvider>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
