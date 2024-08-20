import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { Box, GridItem, Show } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Box>
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
