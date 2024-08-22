import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Select, Button, VStack, Text } from "@chakra-ui/react";
import useProjects from "../hooks/useProjects";
import employee from "../data/employee"; // Adjust path as needed

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

  if (!project) {
    return <Text>Project not found</Text>;
  }

  const handleAddMember = () => {
    if (
      selectedEmployeeId !== null &&
      !project.members.includes(selectedEmployeeId)
    ) {
      // Update the members array in the state
      updateProjectMembers(project.id, [
        ...project.members,
        selectedEmployeeId,
      ]);
      // Navigate back to the ProjectTeamPage
      navigate(-1);
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
    </VStack>
  );
};

export default AddMemberPage;
