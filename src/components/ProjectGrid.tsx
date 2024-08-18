import React from "react";
import useProjects from "../hooks/useProjects";
import { SimpleGrid, Text } from "@chakra-ui/react";
import ProjectCards from "./ProjectCards";
import ProjectCardContainer from "./ProjectCardContainer";
const ProjectGrid = () => {
  const { projectList, error } = useProjects();
  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        padding="10px"
        spacing={4}
      >
        {projectList.map((project) => (
          <ProjectCardContainer>
            <ProjectCards key={project.id} project={project} />
          </ProjectCardContainer>
        ))}
      </SimpleGrid>
    </>
  );
};

export default ProjectGrid;
