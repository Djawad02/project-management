import { Grid, GridItem, Show } from "@chakra-ui/react";
import React, { useContext } from "react";
import ProjectGrid from "../components/ProjectGrid";
import Sidebar from "../components/Sidebar";
import { AuthContext } from "../context/AuthContext";

const Homepage = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Handle the case where the user is not logged in
    return <div>Please log in to view this page.</div>;
  }
  return (
    <Grid>
      <GridItem area="main">
        <ProjectGrid userRole={user.role} />
      </GridItem>
    </Grid>
  );
};

export default Homepage;
