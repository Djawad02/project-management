import { Grid, GridItem, Show } from "@chakra-ui/react";
import React from "react";
import ProjectGrid from "../components/ProjectGrid";
import Sidebar from "../components/Sidebar";

const Homepage = () => {
  return (
    <Grid>
      <GridItem area="main">
        <ProjectGrid />
      </GridItem>
    </Grid>
  );
};

export default Homepage;
