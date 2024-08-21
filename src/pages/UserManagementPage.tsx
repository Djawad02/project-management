import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import employee from "../data/employee"; // Adjust path as needed
import { HStack, Button, Text } from "@chakra-ui/react";
import ProjectDetailsBox from "../components/DetailsBox";
import TableComponent from "../components/TableComponent";
import DetailsBox from "../components/DetailsBox";

const UserManagementPage = () => {
  const { title } = useParams();
  const { projectList } = useProjects();
  const project = projectList.find(
    (p) => p.title === decodeURIComponent(title!)
  );

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

  const employeeColumns = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Designation", accessor: "designation" },
    { header: "Contact", accessor: "contact" },
  ];

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
          // onClick={() => navigate(`/add-employee/${project.title}`)}
        >
          Add Employee
        </Button>
        <Button
          colorScheme="blue"
          // onClick={() => navigate(`/edit-employee/${project.title}`)}
        >
          Edit Employee
        </Button>
        <Button
          colorScheme="red"
          // onClick={() => navigate(`/remove-employee/${project.title}`)}
        >
          Remove Employee
        </Button>
      </HStack>
    </DetailsBox>
  );
};

export default UserManagementPage;
