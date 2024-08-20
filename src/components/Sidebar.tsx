import React from "react";
import { VStack, Box } from "@chakra-ui/react";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <VStack
      justifyContent="left"
      align="stretch"
      bg="blue.700"
      color="whiteAlpha.900"
      paddingX={2}
      spacing={4}
      height="100vh"
    >
      <Box>
        <SidebarItem path="/" label="Home" />
        <SidebarItem path="/User-Management" label="User Management" />
        <SidebarItem path="/Sprint-Details" label="Sprint Details" />
        <SidebarItem path="/Dashboard" label="Project Dashboard" />
      </Box>
    </VStack>
  );
};

export default Sidebar;
