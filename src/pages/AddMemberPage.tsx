import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Select, Button, VStack, Text, Input, HStack } from "@chakra-ui/react";
import useProjects from "../hooks/useProjects";
import employee from "../data/employee"; // Make sure this is mutable or consider using state if necessary

const AddMemberPage = () => {
  const { title } = useParams();
  const { projectList, updateProjectMembers } = useProjects();
  const navigate = useNavigate();
  const project = projectList.find(
    (p) => p.title === decodeURIComponent(title!)
  );

  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );
  const [newEmployeeName, setNewEmployeeName] = useState("");
  const [newEmployeeDesignation, setNewEmployeeDesignation] = useState("");
  const [newEmployeeContact, setNewEmployeeContact] = useState("");

  if (!project) {
    return <Text>Project not found</Text>;
  }

  const handleAddMember = () => {
    if (
      selectedEmployeeId !== null &&
      !project.members.includes(selectedEmployeeId)
    ) {
      const updatedMembers = [...project.members, selectedEmployeeId];
      updateProjectMembers(project.id, updatedMembers);
      navigate(-1);
    }
  };

  const handleAddNewEmployee = () => {
    if (newEmployeeName && newEmployeeDesignation) {
      const newEmployeeId = employee.length
        ? Math.max(...employee.map((emp) => emp.id)) + 1
        : 1;
      const newEmployee = {
        id: newEmployeeId,
        name: newEmployeeName,
        designation: newEmployeeDesignation,
        contact: newEmployeeContact,
      };

      // Add the new employee to the list
      employee.push(newEmployee);

      // Clear input fields
      setNewEmployeeName("");
      setNewEmployeeDesignation("");
      setNewEmployeeContact("");
      // Optionally set this new employee as selected
      setSelectedEmployeeId(newEmployeeId);
    }
  };

  return (
    <VStack spacing={4} align="start" p={6}>
      <Text>Select an Employee to Add to the Project</Text>
      <Select
        placeholder="Select employee"
        onChange={(e) => setSelectedEmployeeId(Number(e.target.value))}
      >
        {employee.map((emp) => (
          <option key={emp.id} value={emp.id}>
            {emp.name} - {emp.designation}
          </option>
        ))}
      </Select>

      <Button colorScheme="blue" onClick={handleAddMember}>
        Add Member
      </Button>

      <Text mt={4}>Or Add a New Employee to the Organization</Text>
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
        <Button colorScheme="green" onClick={handleAddNewEmployee}>
          Add
        </Button>
      </HStack>
    </VStack>
  );
};

export default AddMemberPage;
