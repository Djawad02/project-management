// Layout.tsx
import React, { useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { Box, Grid, GridItem, Show } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import { AuthContext } from "../context/AuthContext";
import useUser from "../hooks/useUser";

const Layout = () => {
  const user = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      <Navbar />
      <Grid
        templateColumns={{ base: "1fr", lg: "210px 1fr" }}
        minHeight="100vh"
      >
        <Show above="lg">
          <GridItem>
            <Sidebar />
          </GridItem>
        </Show>

        <GridItem>
          <Box p={2}>
            <Outlet />
          </Box>
        </GridItem>
      </Grid>
    </>
  );
};

export default Layout;
