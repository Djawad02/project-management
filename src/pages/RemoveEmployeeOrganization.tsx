import { VStack, Select, Button, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DetailsBox from "../components/DetailsBox";
import { useNavigate, useParams } from "react-router-dom";
import useProjectStore from "../store/useProjectStore";
import useEmployeeStore from "../store/useEmployeeStore";
const RemoveEmployeeOrganization = () => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );
  const { projectList, employeeList, fetchEmployees } = useProjectStore();
  const { DeleteEmployeeOrg } = useEmployeeStore();
  const navigate = useNavigate();
  const { title } = useParams();
  const project = projectList.find(
    (p) => p.title === decodeURIComponent(title!)
  );
  if (!project) {
    return <Text>Project not found</Text>;
  }
  const handleRemoveMember = async () => {
    if (selectedEmployeeId !== null) {
      try {
        await DeleteEmployeeOrg(selectedEmployeeId);
        navigate(-1);
      } catch (error) {
        console.error("Error removing member:", error);
      }
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees, projectList, employeeList]);
  return (
    <DetailsBox showSearchBar={false} title="Remove Employee">
      <VStack spacing={4} align="start" p={6}>
        <Text>Select a Member to Remove from the Organization</Text>
        <Select
          placeholder="Select member to remove"
          onChange={(e) => setSelectedEmployeeId(Number(e.target.value))}
        >
          {employeeList.map((emp) => (
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

export default RemoveEmployeeOrganization;
