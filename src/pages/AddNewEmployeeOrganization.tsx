import { HStack, Input, Button, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import employeeData from "../data/employee";
import DetailsBox from "../components/DetailsBox";

const AddNewEmployeeOrganization = () => {
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
  const handleAddNewEmployee = () => {
    if (newEmployeeName && newEmployeeDesignation) {
      const newEmployeeId = employeeData.length
        ? Math.max(...employeeData.map((emp) => emp.id)) + 1
        : 1;
      const newEmployee = {
        id: newEmployeeId,
        name: newEmployeeName,
        designation: newEmployeeDesignation,
        contact: newEmployeeContact,
      };

      // Add the new employee to the list (This update should be done in the data source or state management if using a backend)
      employeeData.push(newEmployee);

      // Clear input fields
      setNewEmployeeName("");
      setNewEmployeeDesignation("");
      setNewEmployeeContact("");

      // Optionally set this new employee as selected
      setSelectedEmployeeId(newEmployeeId);
    }
  };

  return (
    <DetailsBox
      showSearchBar={false}
      context="employeeManagement"
      title={project.title}
      searchTerm={searchTerm}
      onSearchTermChange={(e) => setSearchTerm(e.target.value)}
    >
      <Text mt={4}>Add a New Employee to the Organization</Text>
      <HStack spacing={2} mt={2}>
        <Input
          placeholder="Employee Name"
          value={newEmployeeName}
          onChange={(e) => setNewEmployeeName(e.target.value)}
        />
        <Input
          placeholder="Designation"
          value={newEmployeeDesignation}
          onChange={(e) => setNewEmployeeDesignation(e.target.value)}
        />
        <Input
          placeholder="Contact"
          value={newEmployeeContact}
          onChange={(e) => setNewEmployeeContact(e.target.value)}
        />
        <Button
          colorScheme="blue"
          onClick={handleAddNewEmployee}
          // isDisabled={
          //   newEmployeeName === null ||
          //   newEmployeeContact === null ||
          //   newEmployeeDesignation === null
          // }
        >
          Add
        </Button>
      </HStack>
    </DetailsBox>
  );
};

export default AddNewEmployeeOrganization;
