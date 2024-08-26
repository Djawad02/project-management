import { HStack, Button, Text, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import DetailsBox from "../components/DetailsBox";
import TableComponent from "../components/TableComponent";
import employeeColumns from "../data/employeeColumns";
import { useNavigate, useParams } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import employeeData from "../data/employee";
const EmployeeManagementPage = () => {
  const navigate = useNavigate();
  const { title } = useParams();
  const { projectList } = useProjects();
  const project = projectList.find(
    (p) => p.title === decodeURIComponent(title!)
  );

  const [searchTerm, setSearchTerm] = useState("");

  if (!project) {
    return <Text>Project not found</Text>;
  }

  const filteredEmployees = employeeData.filter(
    (employeeData) =>
      employeeData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employeeData.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const availableEmployees = employeeData.filter(
    (emp) => !project.members.includes(emp.id)
  );
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );
  const [newEmployeeName, setNewEmployeeName] = useState("");
  const [newEmployeeDesignation, setNewEmployeeDesignation] = useState("");
  const [newEmployeeContact, setNewEmployeeContact] = useState("");

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
          onClick={() => navigate(`/projects/${title}/add-new-employee`)}
        >
          Add Employee
        </Button>
        <Button
          colorScheme="green"
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
