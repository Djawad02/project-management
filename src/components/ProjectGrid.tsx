import React from "react";
import useProjects from "../hooks/useProjects";
import { SimpleGrid, Text } from "@chakra-ui/react";
import ProjectCards from "./ProjectCards";
const ProjectGrid = () => {
  const { projectList, error } = useProjects();
  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} padding="10px">
        {projectList.map((project) => (
          <ProjectCards key={project.id} project={project} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default ProjectGrid;
