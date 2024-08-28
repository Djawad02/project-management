import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Select, Button, VStack, Text } from "@chakra-ui/react"; // Import Zustand store
import employeeData from "../data/employee"; // Assuming you have a separate file for employee data
import DetailsBox from "../components/DetailsBox";
import useProjectStore from "../store/useProjectStore";

const AddMemberPage = () => {
  const { title } = useParams();
  const navigate = useNavigate();

  const { projectList, updateProjectMembers, employeeList } = useProjectStore();
  // console.log("Current Project List:", projectList);

  const project = projectList.find(
    (p) => p.title === decodeURIComponent(title!)
  );

  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );

  if (!project) {
    return <Text>Project not found</Text>;
  }

  console.log("Current Project:", project);

  // Filter out employees who are already part of the project
  const availableEmployees = employeeList.filter(
    (emp) => !project.members.includes(emp.id)
  );

  const handleAddMember = () => {
    if (
      project &&
      selectedEmployeeId !== null &&
      !project.members.includes(selectedEmployeeId)
    ) {
      const updatedMembers = [...project.members, selectedEmployeeId];
      updateProjectMembers(project.id, updatedMembers);
      navigate(-1); // Navigate back after updating members
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
