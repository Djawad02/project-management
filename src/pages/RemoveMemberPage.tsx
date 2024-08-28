import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Select, Button, VStack, Text } from "@chakra-ui/react";
import useProjectStore from "../store/useProjectStore"; // Corrected import path
import DetailsBox from "../components/DetailsBox";
import { Employee } from "../interfaces/Employee";
import employees from "../data/employee";

const RemoveMemberPage = () => {
  const { title } = useParams();
  const { projectList, updateProjectMembers, employeeList } = useProjectStore();
  const navigate = useNavigate();

  const project = projectList.find(
    (p) => p.title === decodeURIComponent(title!)
  );

  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );

  if (!project) {
    return <Text>Project not found</Text>;
  }

  // Fetch only the employees that are members of the project
  const projectMembers = project.members
    .map((memberId) => employeeList.find((e: Employee) => e.id === memberId))
    .filter(Boolean) as Employee[];

  const handleRemoveMember = () => {
    if (selectedEmployeeId !== null) {
      // Remove the employee from the project's members array
      const updatedMembers = project.members.filter(
        (id) => id !== selectedEmployeeId
      );

      // Update the project in the Zustand store
      updateProjectMembers(project.id, updatedMembers);
      alert("Member removed from the project");
      // Navigate back to the previous page or confirm removal
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
        <Text>Select a Member to Remove from the Project</Text>
        <Select
          placeholder="Select member to remove"
          onChange={(e) => setSelectedEmployeeId(Number(e.target.value))}
        >
          {projectMembers.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name} - {emp.designation}
            </option>
          ))}
        </Select>
        <Button
          colorScheme="red"
          onClick={handleRemoveMember}
          isDisabled={selectedEmployeeId === null}
        >
          Remove Member
        </Button>
      </VStack>
    </DetailsBox>
  );
};

export default RemoveMemberPage;
