import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import { Button, HStack, Text } from "@chakra-ui/react";
import TableComponent from "../components/TableComponent";
import employees from "../data/employee"; // Assuming you have a projects array
import DetailsBox from "../components/DetailsBox";

const ProjectDetailPage = () => {
  const { title } = useParams();
  const { error, projectList } = useProjects();
  const navigate = useNavigate();

  const project = projectList.find(
    (p) => p.title === decodeURIComponent(title!)
  );

  if (error) throw error;

  if (!project) {
    return <Text>Project not found</Text>;
  }

  const teamLead =
    employees.find((e) => e.id === project.teamLead)?.name || "Unknown";

  const projectWithTeamLeadName = {
    ...project,
    teamLead: teamLead, // Replace teamLead ID with the name
  };
  const projectColumns = [
    // { header: "Project ID", accessor: "projectId" },
    { header: "Title", accessor: "title" },
    { header: "Description", accessor: "description" },
    { header: "Team Lead", accessor: "teamLead" },
    { header: "Source", accessor: "source" },
  ];

  // Create a single item array for the TableComponent
  const projectData = [project];

  return (
    <DetailsBox title={project.title} context="projectDetails">
      <TableComponent
        columns={projectColumns}
        data={[projectWithTeamLeadName]}
        borderColor="blue.900"
        colorScheme="gray"
        width="100%"
      />
      <HStack spacing={4} mb="4" mt="8" justifyContent="center">
        <Button
          colorScheme="blue"
          onClick={() =>
            navigate(`/projects/${encodeURIComponent(project.title)}/team`)
          }
        >
          View Team
        </Button>
      </HStack>
    </DetailsBox>
  );
};

export default ProjectDetailPage;
