import React from "react";
import useProjects from "../hooks/useProjects";
import { SimpleGrid, Text } from "@chakra-ui/react";
import ProjectCards from "./ProjectCards";
import ProjectCardContainer from "./ProjectCardContainer";

const ProjectGrid = () => {
  const { projectList } = useProjects();
  return (
    <>
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        padding="10px"
        spacing={3}
        marginTop="40px"
      >
        {projectList.map((project) => (
          <ProjectCardContainer key={project.id}>
            <ProjectCards project={project} />
          </ProjectCardContainer>
        ))}
      </SimpleGrid>
    </>
  );
};

export default ProjectGrid;
