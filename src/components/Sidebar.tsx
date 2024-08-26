import React from "react";
import { VStack, Box } from "@chakra-ui/react";
import SidebarItem from "./SidebarItem";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const isProjectPage = location.pathname.startsWith("/projects/");

  // Extract the base project path (e.g., "/projects/:title")
  const projectBasePath = isProjectPage
    ? location.pathname.split("/").slice(0, 3).join("/")
    : "";

  return (
    <VStack
      justifyContent="left"
      align="stretch"
      bg="blue.700"
      color="whiteAlpha.900"
      paddingX={2}
      spacing={2}
      height="100%"
      overflowY="auto"
    >
      <Box height="100%">
        <SidebarItem path="/" label="Home" />

        {isProjectPage && (
          <>
            <SidebarItem
              path={`${projectBasePath}/details`}
              label="Project Details"
            />
            <SidebarItem path={`${projectBasePath}/team`} label="View Team" />
            <SidebarItem
              path={`${projectBasePath}/sprint-details`}
              label="Sprint Details"
            />
            <SidebarItem
              path={`${projectBasePath}/dashboard`}
              label="Project Dashboard"
            />
            <SidebarItem
              path={`${projectBasePath}/resource-management`}
              label="Resource Management"
            />
            <SidebarItem
              path={`${projectBasePath}/employee-management`}
              label="Employee Management"
            />
          </>
        )}
      </Box>
    </VStack>
  );
};

export default Sidebar;
