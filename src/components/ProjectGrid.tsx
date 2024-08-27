import React, { useContext } from "react";
import useProjects from "../hooks/useProjects";
import { Box, Button, SimpleGrid, Text } from "@chakra-ui/react";
import ProjectCards from "./ProjectCards";
import ProjectCardContainer from "./ProjectCardContainer";
import { AuthContext } from "../context/AuthContext";
import useUser from "../hooks/useUser";

const ProjectGrid = () => {
  const { projectList } = useProjects();
  const userRole = useUser();
  return (
    <>
      <Box padding="10px">
        {userRole === "Employee" ? (
          <Text fontSize="lg" mb={4}>
            You have read-only access to the projects.
          </Text>
        ) : (
          <Button colorScheme="blue" mb={4}>
            {userRole === "Admin" ? "Add New Project" : "Request Access"}
          </Button>
        )}
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
      </Box>
    </>
  );
};

export default ProjectGrid;
