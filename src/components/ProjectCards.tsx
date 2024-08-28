import React, { useContext, useState } from "react";
import { Project } from "../interfaces/Project";
import { Box, Button, Card, CardBody, Heading } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import useUser from "../hooks/useUser";
import useProjectStore from "../store/useProjectStore";

interface Props {
  project: Project;
}

const ProjectCards = ({ project }: Props) => {
  const user = useUser();
  const userRol = user?.role;
  const { removeProject } = useProjectStore();
  const handleRemoveProject = (projectId: number) => {
    if (projectId !== null) {
      // Remove the project from the Zustand store
      removeProject(projectId);
      alert("Project removed successfully");
    }
  };

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
        {userRol && (
          <Box mt={4}>
            {userRol === "Admin" || userRol === "TeamLead" ? (
              <>
                <Button
                  as={Link}
                  to={`/projects/${project.title}/edit-project`}
                  colorScheme="blue"
                  size="sm"
                  mr={2}
                >
                  Edit
                </Button>
                {userRol === "Admin" && (
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => {
                      // Add logic for deleting project
                      handleRemoveProject(project.id);
                    }}
                  >
                    Delete
                  </Button>
                )}
              </>
            ) : null}
          </Box>
        )}
      </CardBody>
    </Card>
  );
};

export default ProjectCards;
