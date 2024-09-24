import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Select, Button, VStack, Text } from "@chakra-ui/react";
import useProjectStore from "../store/useProjectStore"; // Corrected import path
import DetailsBox from "../components/DetailsBox";
import { Employee } from "../interfaces/Employee";

const RemoveMemberPage = () => {
  const { title } = useParams();
  const { projectList, employeeList, deleteMemberFromProject, fetchEmployees } =
    useProjectStore();
  const navigate = useNavigate();

  const project = projectList.find(
    (p) => p.title === decodeURIComponent(title!)
  );

  if (!project) {
    return <Text>Project not found</Text>;
  }

  console.log("project:", project);
  console.log("members:", project?.members);

  // Extracting unique project member IDs
  const projectMemberIds =
    Array.from(new Set(project?.members.map((member) => member.id))) || [];

  // Logging unique project member IDs
  console.log("Project Member IDs:", projectMemberIds);

  // Filtering employeeList to get project members
  const projectMembers = employeeList.filter((employee) =>
    projectMemberIds.includes(employee.id)
  );

  // Logging project members
  console.log("Project Members:", projectMembers);

  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );

  const handleRemoveMember = async () => {
    if (selectedEmployeeId !== null) {
      try {
        await deleteMemberFromProject(project.id, selectedEmployeeId);
        alert("Member removed from the project");
        navigate(-1);
      } catch (error) {
        console.error("Error removing member:", error);
        alert("Failed to remove member. Please try again.");
      }
    }
  };

  useEffect(() => {
    fetchEmployees(); // Fetch employees when the component mounts
  }, [fetchEmployees, projectList]);

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
