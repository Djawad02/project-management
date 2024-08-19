import React from "react";
import { Project } from "../interfaces/Project";
import { Card, CardBody, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Props {
  project: Project;
}

const ProjectCards = ({ project }: Props) => {
  return (
    <Card
      bg="transparent" // Make the card background transparent
      boxShadow="none"
      color="whiteAlpha.900"
    >
      <CardBody>
        <Heading fontSize="2xl">
          <Link to={"/projects/" + project.title}> {project.title}</Link>
        </Heading>
      </CardBody>
    </Card>
  );
};

export default ProjectCards;
