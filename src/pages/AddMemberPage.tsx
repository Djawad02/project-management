import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Select, Button, VStack, Text, Input, HStack } from "@chakra-ui/react";
import useProjects from "../hooks/useProjects";
import employeeData from "../data/employee"; // Assuming you have a separate file for employee data
import DetailsBox from "../components/DetailsBox";

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

  // Filter out employees who are already part of the project
  const availableEmployees = employeeData.filter(
    (emp) => !project.members.includes(emp.id)
  );

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

  return (
    <DetailsBox
      showSearchBar={false}
      context="employeeManagement"
      title={project.title}
    >
      <VStack spacing={4} align="start" p={6}>
        <Text>Select an Employee to Add to the Project</Text>
        <Select
          placeholder="Select employee"
          onChange={(e) => setSelectedEmployeeId(Number(e.target.value))}
        >
          {availableEmployees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name} - {emp.designation}
            </option>
          ))}
        </Select>

        <Button
          colorScheme="blue"
          onClick={handleAddMember}
          isDisabled={selectedEmployeeId === null}
        >
          Add Member
        </Button>
      </VStack>
    </DetailsBox>
  );
};

export default AddMemberPage;
