import React from "react";
import { useParams } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import { Box, Grid, GridItem, Heading, Show, Text } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";

const ProjectDetailPage = () => {
  const { title } = useParams();
  const { projectList, error } = useProjects();
  const project = projectList.find(
    (p) => p.title === decodeURIComponent(title!)
  );

  if (!project) {
    return <Text>Project not found</Text>;
  }
  if (error) throw error;
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
      <Show above="lg">
        <GridItem height="100%">
          <Sidebar />
        </GridItem>
      </Show>
      <GridItem area="main">
        <Box padding={5}>
          <Heading>{project.title}</Heading>
          <Text>{project.description}</Text>
          <Text>Status: {project.status}</Text>
          <Text>Source: {project.source}</Text>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default ProjectDetailPage;
