import React from "react";
import { VStack, Box } from "@chakra-ui/react";
import SidebarItem from "./SidebarItem";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const isProjectPage = location.pathname.startsWith("/projects/");
  return (
    <VStack
      justifyContent="left"
      align="stretch"
      bg="blue.700"
      color="whiteAlpha.900"
      paddingX={2}
      spacing={4}
      height="100vh"
      overflowY="auto" // Enables vertical scrolling
    >
      <Box height="100%">
        <SidebarItem path="/" label="Home" />
        {isProjectPage && (
          <>
            <SidebarItem
              path={`${location.pathname}/user-management`}
              label="User Management"
            />
            {/* Add more project-specific sidebar items here if needed */}
          </>
        )}
        <SidebarItem path="/Sprint-Details" label="Sprint Details" />
        <SidebarItem path="/Dashboard" label="Project Dashboard" />
      </Box>
    </VStack>
  );
};

export default Sidebar;
