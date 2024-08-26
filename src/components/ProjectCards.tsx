import React, { useContext } from "react";
import { Project } from "../interfaces/Project";
import { Box, Button, Card, CardBody, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface Props {
  project: Project;
  userRole?: string;
}

const ProjectCards = ({ project, userRole }: Props) => {
  const { user } = useContext(AuthContext);
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
        {user && (
          <Box mt={4}>
            {user.role === "Admin" || user.role === "TeamLead" ? (
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
                {user.role === "Admin" && (
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => {
                      // Add logic for deleting project
                      alert("Delete action not implemented yet");
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
