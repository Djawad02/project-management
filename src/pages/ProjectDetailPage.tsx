import React from "react";
import { useParams } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import { Box, Heading, Text } from "@chakra-ui/react";

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
    <>
      <Heading>{project.title}</Heading>
      <Text>{project.description}</Text>
      <Text>Status: {project.status}</Text>
    </>
  );
};

export default ProjectDetailPage;
