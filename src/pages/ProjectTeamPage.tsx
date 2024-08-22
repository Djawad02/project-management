import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import employee from "../data/employee"; // Adjust path as needed
import { HStack, Button, Text } from "@chakra-ui/react";
import TableComponent from "../components/TableComponent";
import DetailsBox from "../components/DetailsBox";
import employeeColumns from "../data/employeeColumns";

const ProjectTeamPage = () => {
  const { title } = useParams();
  const { projectList } = useProjects();
  const project = projectList.find(
    (p) => p.title === decodeURIComponent(title!)
  );
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  if (!project) {
    return <Text>Project not found</Text>;
  }

  // Filter employees based on project member IDs
  const projectEmployees = employee.filter((e) =>
    project.members.includes(e.id)
  );

  // Filter employees based on search term
  const filteredEmployees = projectEmployees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <Button
          colorScheme="blue"
          onClick={() => navigate(`/projects/${title}/add-member`)}
        >
          Add Member
        </Button>
        <Button
          colorScheme="blue"
          // onClick={() => navigate(`/edit-employee/${project.title}`)}
        >
          Edit Member
        </Button>
        <Button
          colorScheme="red"
          // onClick={() => navigate(`/remove-employee/${project.title}`)}
        >
          Remove Member
        </Button>
      </HStack>
    </DetailsBox>
  );
};

export default ProjectTeamPage;
