import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Select, Button, VStack, Text } from "@chakra-ui/react";
import useProjectStore from "../store/useProjectStore";
import DetailsBox from "../components/DetailsBox";

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

  const projectMemberIds =
    Array.from(new Set(project?.members.map((member) => member.id))) || [];

  console.log("Project Member IDs:", projectMemberIds);

  const projectMembers = employeeList.filter((employee) =>
    projectMemberIds.includes(employee.id)
  );

  console.log("Project Members:", projectMembers);

  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );

  const handleRemoveMember = async () => {
    if (selectedEmployeeId !== null) {
      try {
        await deleteMemberFromProject(project.id, selectedEmployeeId);
        navigate(-1);
      } catch (error) {
        console.error("Error removing member:", error);
      }
    }
  };

  useEffect(() => {
    fetchEmployees();
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
