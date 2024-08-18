import React from "react";
import { Project } from "../hooks/useProjects";
import { Card, CardBody, Heading } from "@chakra-ui/react";

interface Props {
  project: Project;
}

const ProjectCards = ({ project }: Props) => {
  return (
    <Card borderRadius={10} overflow="hidden">
      <CardBody>
        <Heading fontSize="2xl">{project.title}</Heading>
      </CardBody>
    </Card>
  );
};

export default ProjectCards;
