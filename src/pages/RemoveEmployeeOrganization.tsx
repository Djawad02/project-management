import { VStack, Select, Button, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import DetailsBox from "../components/DetailsBox";
import employeeData from "../data/employee"; // Assuming this is your employee list
import { useNavigate } from "react-router-dom";

const RemoveEmployeeOrganization = () => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );
  const navigate = useNavigate();
  const handleRemoveMember = () => {
    if (selectedEmployeeId !== null) {
      // Find index of the employee in the organization list
      const employeeIndex = employeeData.findIndex(
        (emp) => emp.id === selectedEmployeeId
      );

      // Remove the employee from the organization list
      if (employeeIndex > -1) {
        employeeData.splice(employeeIndex, 1); // Remove the employee from the array
      }

      // Update any state or perform actions needed after removing an employee
      // For example, you might want to update the backend or state management
      // updateEmployeeList(employeeData); // Uncomment if using state management or backend

      // Navigate back to the previous page or confirm removal
      alert("Member removed from the organization");
      navigate(-1);
    }
  };

  return (
    <DetailsBox
      showSearchBar={false}
      context="employeeManagement"
      title="Remove Employee"
    >
      <VStack spacing={4} align="start" p={6}>
        <Text>Select a Member to Remove from the Organization</Text>
        <Select
          placeholder="Select member to remove"
          onChange={(e) => setSelectedEmployeeId(Number(e.target.value))}
        >
          {employeeData.map((emp) => (
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
