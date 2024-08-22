import { HStack, Button, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import DetailsBox from "../components/DetailsBox";
import TableComponent from "../components/TableComponent";
import employeeColumns from "../data/employeeColumns";
import { useParams } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import employee from "../data/employee";

const EmployeeManagementPage = () => {
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

  // Filter employees based on search term
  const filteredEmployees = employee.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <DetailsBox
      showSearchBar={true}
      context="employeeManagement"
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

export default EmployeeManagementPage;
