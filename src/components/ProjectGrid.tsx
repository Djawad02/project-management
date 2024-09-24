import React, { useEffect } from "react";
import { Box, Button, SimpleGrid, Text } from "@chakra-ui/react";
import ProjectCards from "./ProjectCards";
import ProjectCardContainer from "./ProjectCardContainer";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import useProjectStore from "../store/useProjectStore";

const ProjectGrid = () => {
  const navigate = useNavigate();
  const { projectList, fetchProjects } = useProjectStore();
  const user = useUser();
  const userRole = user?.role;

  const handleNewProject = () => {
    navigate(`new-project`);
  };

  const filterProjects = () => {
    if (userRole === "Admin") {
      return projectList;
    }

    if (userRole === "TeamLead" || userRole === "Employee") {
      return projectList.filter((project) => {
        if (user && user.id) {
          const isTeamLead = project.teamLead.id === user.id; // Compare using the id property
          const isMember = project.members.some(
            (member) => member.id === user.id
          ); // Check if the user is a member based on their id

          return isTeamLead || isMember;
        }
        return false;
      });
    }

    return [];
  };

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <Box padding="10px">
      {userRole === "Employee" ? (
        <Text fontSize="lg" mb={4}>
          You have read-only access to the projects.
        </Text>
      ) : (
        <Button colorScheme="blue" mb={4} onClick={handleNewProject}>
          Add New Project
        </Button>
      )}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        padding="10px"
        spacing={3}
        marginTop="40px"
      >
        {filterProjects().map((project) => (
          <ProjectCardContainer key={project.id}>
            <ProjectCards project={project} />
          </ProjectCardContainer>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ProjectGrid;
