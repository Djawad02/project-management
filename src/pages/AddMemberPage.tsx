import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Select, Button, VStack, Text } from "@chakra-ui/react";
import DetailsBox from "../components/DetailsBox";
import useProjectStore from "../store/useProjectStore";

const AddMemberPage = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const {
    projectList,
    updateProjectMembers,
    employeeList,
    fetchEmployees,
    addMemberToProject,
  } = useProjectStore();

  const project = projectList.find(
    (p) => p.title === decodeURIComponent(title!)
  );

  console.log("project:", project);
  console.log("members:", project?.members);

  const projectMemberIds =
    Array.from(new Set(project?.members.map((member) => member.id))) || [];

  console.log("Project Member IDs:", projectMemberIds);

  const [otherEmployees, setOtherEmployees] = useState(
    employeeList.filter((employee) => !projectMemberIds.includes(employee.id))
  );

  console.log("Other Employees:", otherEmployees);

  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );

  if (!project) {
    return <Text>Project not found</Text>;
  }

  const handleAddMember = async () => {
    if (
      project &&
      selectedEmployeeId !== null &&
      !project.members.some((member) => member.id === selectedEmployeeId)
    ) {
      try {
        await addMemberToProject(project.id, selectedEmployeeId);

        updateProjectMembers(project.id, [
          ...project.members,
          { id: selectedEmployeeId },
        ]);

        setOtherEmployees((prev) =>
          prev.filter((employee) => employee.id !== selectedEmployeeId)
        );

        navigate(-1);
      } catch (error) {
        console.error("Error adding member:", error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchEmployees();
    };

    fetchData();
    setLoading(false);
  }, [fetchEmployees, projectList]);

  return (
    <DetailsBox
      showSearchBar={false}
      context="employeeManagement"
      title={project.title}
    >
      <VStack spacing={4} align="start" p={6}>
        <Text>Select an Employee to Add to the Project</Text>

        {/* Select component to choose an employee */}
        <Select
          placeholder="Select employee"
          onChange={(e) => setSelectedEmployeeId(Number(e.target.value))}
        >
          {otherEmployees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name} - {emp.designation}
            </option>
          ))}
        </Select>

        {/* Button to add the selected employee to the project */}
        <Button
          colorScheme="blue"
          onClick={handleAddMember}
          isDisabled={
            selectedEmployeeId === null ||
            project.members.some((member) => member.id === selectedEmployeeId)
          }
        >
          Add Member
        </Button>
      </VStack>
    </DetailsBox>
  );
};

export default AddMemberPage;
