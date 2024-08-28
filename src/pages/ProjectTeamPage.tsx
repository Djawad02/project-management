import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import employees from "../data/employee";
import { HStack, Button, Text } from "@chakra-ui/react";
import TableComponent from "../components/TableComponent";
import DetailsBox from "../components/DetailsBox";
import employeeColumns from "../data/employeeColumns";
import { Employee } from "../interfaces/Employee";
import { AuthContext } from "../context/AuthContext";
import { Project } from "../interfaces/Project";
import useProjectStore from "../store/useProjectStore";

const ProjectTeamPage = () => {
  const { title } = useParams();
  const navigate = useNavigate();

  // Use Zustand's project store
  const { projectList, employeeList } = useProjectStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [project, setProject] = useState<Project | undefined>(
    projectList.find((p) => p.title === decodeURIComponent(title!))
  );

  const { user } = React.useContext(AuthContext);

  useEffect(() => {
    const updatedProject = projectList.find(
      (p) => p.title === decodeURIComponent(title!)
    );
    setProject(updatedProject);
    // console.log("updated project", updatedProject);
  }, [projectList, title]);

  if (!project) {
    return <Text>Project not found</Text>;
  }

  const projectEmployees = employeeList.filter((e: Employee) =>
    project.members.includes(e.id)
  );

  const filteredEmployees = projectEmployees.filter(
    (employee: Employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const canEditMembers =
    user && (user.role === "Admin" || project.teamLead === user.id);

  return (
    <DetailsBox
      showSearchBar={true}
      context="teamMembers"
      title={project.title}
      searchTerm={searchTerm}
      onSearchTermChange={(e) => setSearchTerm(e.target.value)}
    >
      <TableComponent
        columns={employeeColumns}
        data={filteredEmployees}
        borderColor="blue.900"
        colorScheme="gray"
        width="100%"
      />
      <HStack spacing={4} mb="4" mt="8" justifyContent="center">
        {canEditMembers && (
          <HStack spacing={4} mb="4" mt="8" justifyContent="center">
            <Button
              colorScheme="blue"
              onClick={() => navigate(`/projects/${title}/add-member`)}
            >
              Add Member
            </Button>
            <Button
              colorScheme="red"
              onClick={() => navigate(`/projects/${title}/remove-member`)}
            >
              Remove Member
            </Button>
          </HStack>
        )}
        {!canEditMembers && (
          <Text textAlign="center" mt="8" color="gray.500">
            You do not have permission to modify project members.
          </Text>
        )}
      </HStack>
    </DetailsBox>
  );
};

export default ProjectTeamPage;
