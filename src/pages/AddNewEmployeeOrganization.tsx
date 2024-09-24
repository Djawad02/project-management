import { Box, Button, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import DetailsBox from "../components/DetailsBox";
import InputFields from "../components/InputFields";
import useEmployeeStore from "../store/useEmployeeStore";

const AddNewEmployeeOrganization = () => {
  const { title } = useParams();
  const { projectList } = useProjects();
  const { AddNewEmployeeOrg } = useEmployeeStore();
  const project = projectList.find(
    (p) => p.title === decodeURIComponent(title!)
  );

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [newEmployeeName, setNewEmployeeName] = useState("");
  const [newEmployeeDesignation, setNewEmployeeDesignation] = useState("");
  const [newEmployeeContact, setNewEmployeeContact] = useState("");
  const [loading, setLoading] = useState(false);

  if (!project) {
    return <Text>Project not found</Text>;
  }

  const handleAddNewEmployee = async () => {
    if (newEmployeeName && newEmployeeDesignation) {
      setLoading(true);
      try {
        const newEmployeeData = {
          name: newEmployeeName,
          designation: newEmployeeDesignation,
          contact: newEmployeeContact,
        };
        await AddNewEmployeeOrg(newEmployeeData, project.id);
        setNewEmployeeName("");
        setNewEmployeeDesignation("");
        setNewEmployeeContact("");

        navigate(`/projects/${title}/employee-management`);
      } catch (error) {
        console.error("Error adding new employee:", error);
        alert("Failed to add employee.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <DetailsBox
      showSearchBar={false}
      title="Employee Management"
      searchTerm={searchTerm}
      onSearchTermChange={(e) => setSearchTerm(e.target.value)}
    >
      <Text mt={4}>Add a New Employee to the Organization</Text>
      <InputFields
        fields={[
          {
            id: "employee-name",
            label: "Employee Name",
            placeholder: "Enter employee name",
            value: newEmployeeName,
            onChange: (e) => setNewEmployeeName(e.target.value),
          },
          {
            id: "designation",
            label: "Designation",
            placeholder: "Enter designation",
            value: newEmployeeDesignation,
            onChange: (e) => setNewEmployeeDesignation(e.target.value),
          },
          {
            id: "contact",
            label: "Contact",
            placeholder: "Enter contact number",
            value: newEmployeeContact,
            onChange: (e) => setNewEmployeeContact(e.target.value),
          },
        ]}
      />
      <Box mt={3} ml={330}>
        <Button
          colorScheme="blue"
          onClick={handleAddNewEmployee}
          isLoading={loading}
        >
          Add
        </Button>
      </Box>
    </DetailsBox>
  );
};

export default AddNewEmployeeOrganization;
