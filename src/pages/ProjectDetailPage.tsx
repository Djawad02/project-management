import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, HStack, Text } from "@chakra-ui/react";
import TableComponent from "../components/TableComponent";
import DetailsBox from "../components/DetailsBox";
import useProjectStore from "../store/useProjectStore";
import projectColumns from "../data/columns/projectColumns";
import { getEmployeeById } from "../services/EmployeeAPI";

const ProjectDetailPage = () => {
  const { title } = useParams();
  const { projectList } = useProjectStore();
  const navigate = useNavigate();

  const [teamLeadName, setTeamLeadName] = useState<string>("Unknown");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const project = projectList.find(
    (p) => p.title === decodeURIComponent(title!)
  );

  useEffect(() => {
    const fetchTeamLead = async () => {
      try {
        if (project?.teamLead) {
          let teamLeadId;
          teamLeadId = project.teamLead.id; //works fine

          const employee = await getEmployeeById(teamLeadId);
          setTeamLeadName(employee.name || "Unknown");
        }
      } catch (error) {
        console.error("Error fetching team lead:", error);
        setError("Failed to fetch team lead.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamLead();
  }, [project]);

  if (!project) {
    return <Text>Project not found</Text>;
  }

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  const projectWithTeamLeadName = {
    ...project,
    teamLead: teamLeadName,
  };

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
