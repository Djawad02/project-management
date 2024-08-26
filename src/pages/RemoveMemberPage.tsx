import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Select, Button, VStack, Text } from "@chakra-ui/react";
import useProjects from "../hooks/useProjects";
import employee from "../data/employee";
import DetailsBox from "../components/DetailsBox";

const RemoveMemberPage = () => {
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

  // Fetch only the employees that are members of the project
  const projectMembers = employee.filter((e) => project.members.includes(e.id));

  const handleRemoveMember = () => {
    if (selectedEmployeeId !== null) {
      const updatedMembers = project.members.filter(
        (memberId) => memberId !== selectedEmployeeId
      );

      updateProjectMembers(project.id, updatedMembers); // Ensure state is updated

      navigate(-1); // Navigate back to the previous page
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
