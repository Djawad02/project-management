import React from "react";
import { useParams } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import ProjectMembers from "../components/ProjectMembers";
import { Box, Heading, Text } from "@chakra-ui/react";

const UserManagementPage = () => {
  const { title } = useParams();
  const { projectList } = useProjects();
  const project = projectList.find(
    (p) => p.title === decodeURIComponent(title!)
  );

  if (!project) {
    return <Text>Project not found</Text>;
  }

  return (
    <Box padding={5}>
      <Heading>{project.title} - Team Members</Heading>
      <ProjectMembers members={project.members} />
    </Box>
  );
};

export default UserManagementPage;
