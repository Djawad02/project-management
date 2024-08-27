// EditEmployeePage.tsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  VStack,
  FormControl,
  FormLabel,
  Select,
  Button,
} from "@chakra-ui/react";
import DetailsBox from "../components/DetailsBox";
import InputFields from "../components/InputFields";
import { Employee } from "../interfaces/Employee";
import employees from "../data/employee";

const EditEmployeePage = () => {
  const { title } = useParams();
  const { employeeId } = useParams<{ employeeId: string }>();
  const navigate = useNavigate();

  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );
  const [employee, setEmployee] = useState<Employee | null>(null);

  // Handle dropdown change
  const handleEmployeeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const employeeId = Number(e.target.value);
    setSelectedEmployeeId(employeeId);
    const selectedEmployee = employees.find((emp) => emp.id === employeeId);
    setEmployee(selectedEmployee || null);
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (employee) {
      setEmployee((prevEmployee) => ({
        ...prevEmployee!,
        [name]: value,
      }));
    }
  };

  // Prepare fields for the InputFields component
  const fields = [
    {
      id: "name",
      label: "Name",
      placeholder: "Enter name",
      value: employee?.name || "",
      onChange: handleInputChange,
    },
    {
      id: "designation",
      label: "Designation",
      placeholder: "Enter designation",
      value: employee?.designation || "",
      onChange: handleInputChange,
    },
    {
      id: "contact",
      label: "Contact",
      placeholder: "Enter contact",
      value: employee?.contact || "",
      onChange: handleInputChange,
    },
  ];

  const handleUpdateEmployee = () => {
    if (employee) {
      console.log("Updated Employee:", employee);
      // Update logic here (e.g., update in state or API call)
      navigate(`/projects/${title}/employee-management`);
    }
  };

  return (
    <DetailsBox showSearchBar={false} title="Edit Employee">
      <VStack spacing={4} align="start" p={6}>
        <FormControl>
          <FormLabel>Select Employee</FormLabel>
          <Select
            placeholder="Select employee"
            onChange={handleEmployeeChange}
            value={selectedEmployeeId ?? ""}
          >
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name} - {emp.designation}
              </option>
            ))}
          </Select>
        </FormControl>

        {employee && <InputFields fields={fields} />}

        <Button
          colorScheme="blue"
          onClick={handleUpdateEmployee}
          isDisabled={!employee}
        >
          Update
        </Button>
      </VStack>
    </DetailsBox>
  );
};

export default EditEmployeePage;
