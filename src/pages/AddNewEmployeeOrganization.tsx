// src/pages/AddNewEmployeeOrganization.tsx
import { Button, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import employeeData from "../data/employee";
import DetailsBox from "../components/DetailsBox";
import InputFields from "../components/InputFields";

const AddNewEmployeeOrganization = () => {
  const { title } = useParams();
  const { projectList } = useProjects();
  const project = projectList.find(
    (p) => p.title === decodeURIComponent(title!)
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [newEmployeeName, setNewEmployeeName] = useState("");
  const [newEmployeeDesignation, setNewEmployeeDesignation] = useState("");
  const [newEmployeeContact, setNewEmployeeContact] = useState("");

  if (!project) {
    return <Text>Project not found</Text>;
  }

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

      employeeData.push(newEmployee);
      setNewEmployeeName("");
      setNewEmployeeDesignation("");
      setNewEmployeeContact("");
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
      <InputFields
        fields={[
          {
            id: "employee-name",
            label: "Employee Name",
            placeholder: "Enter employee name",
            value: newEmployeeName,
            onChange: (e) => setNewEmployeeName(e.target.value),
          },
          {
            id: "designation",
            label: "Designation",
            placeholder: "Enter designation",
            value: newEmployeeDesignation,
            onChange: (e) => setNewEmployeeDesignation(e.target.value),
          },
          {
            id: "contact",
            label: "Contact",
            placeholder: "Enter contact number",
            value: newEmployeeContact,
            onChange: (e) => setNewEmployeeContact(e.target.value),
          },
        ]}
      />
      <Button colorScheme="blue" onClick={handleAddNewEmployee}>
        Add
      </Button>
    </DetailsBox>
  );
};

export default AddNewEmployeeOrganization;
