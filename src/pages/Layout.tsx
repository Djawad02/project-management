// Layout.tsx
import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { Box, Grid, GridItem, Show } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Grid
        templateColumns={{ base: "1fr", lg: "250px 1fr" }}
        minHeight="100vh"
      >
        <Show above="lg">
          <GridItem>
            <Sidebar />
          </GridItem>
        </Show>

        <GridItem>
          <Box p={4}>
            <Outlet />
          </Box>
        </GridItem>
      </Grid>
    </>
  );
};

export default Layout;
