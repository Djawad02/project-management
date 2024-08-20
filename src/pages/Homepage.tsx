import { Grid, GridItem, Show } from "@chakra-ui/react";
import React from "react";
import ProjectGrid from "../components/ProjectGrid";
import Sidebar from "../components/Sidebar";

const Homepage = () => {
  return (
    <Grid
      templateAreas={{
        base: `"main"`,
        lg: `"aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
      minHeight="100vh"
    >
      {/* <GridItem area="nav" bg="blue.900" color="whiteAlpha.900">
        <Navbar />
      </GridItem> */}
      <Show above="lg">
        <GridItem height="100%">
          <Sidebar />
        </GridItem>
      </Show>
      <GridItem area="main">
        <ProjectGrid />
      </GridItem>
    </Grid>
  );
};

export default Homepage;
