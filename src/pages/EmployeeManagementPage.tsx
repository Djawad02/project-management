import { HStack, Button, Text, Input, VStack } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import DetailsBox from "../components/DetailsBox";
import TableComponent from "../components/TableComponent";
import employeeColumns from "../data/employeeColumns";
import { useNavigate, useParams } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import employeeData from "../data/employee";
import { AuthContext } from "../context/AuthContext";
import useProjectStore from "../store/useProjectStore";
const EmployeeManagementPage = () => {
  const navigate = useNavigate();
  const { title } = useParams();
  const { projectList, employeeList } = useProjectStore();
  const project = projectList.find(
    (p) => p.title === decodeURIComponent(title!)
  );

  const [searchTerm, setSearchTerm] = useState("");

  if (!project) {
    return <Text>Project not found</Text>;
  }

  const filteredEmployees = employeeList.filter(
    (employeeList) =>
      employeeList.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employeeList.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const { user } = useContext(AuthContext); // Get the current user from context
  const userRole = user?.role || ""; // Get user role
  const canEditMembers =
    user && (user.role === "Admin" || project.teamLead === user.id);
  return (
    <DetailsBox
      showSearchBar={true}
      context="employeeManagement"
      title={project.title}
      searchTerm={searchTerm}
      onSearchTermChange={(e) => setSearchTerm(e.target.value)}
    >
      <TableComponent
        columns={employeeColumns}
        data={filteredEmployees}
        borderColor="blue.900"
        colorScheme="gray"
        width="100%"
      />

      <HStack spacing={4} mb="4" mt="8" justifyContent="center">
        {userRole === "Admin" && (
          <>
            <Button
              colorScheme="blue"
              onClick={() => navigate(`/projects/${title}/add-new-employee`)}
            >
              Add Employee
            </Button>
            <Button
              colorScheme="green"
              onClick={() =>
                navigate(`/projects/${project.title}/edit-employee`)
              }
            >
              Edit Employee
            </Button>
            <Button
              colorScheme="red"
              onClick={() =>
                navigate(`/projects/${title}/remove-employee-organization`)
              }
            >
              Remove Employee
            </Button>
          </>
        )}
      </HStack>
      <HStack spacing={2} justifyContent="center" mt={4} mb={2} ml={-6}>
        {(userRole === "Admin" || userRole === "TeamLead") && (
          <Button
            colorScheme="blue"
            onClick={() => navigate(`/projects/${title}/employee-detail`)}
          >
            View Employee
          </Button>
        )}
        {!canEditMembers && (
          <Text textAlign="center" mt="8" color="gray.500">
            You do not have permission to modify project members.
          </Text>
        )}
      </HStack>
    </DetailsBox>
  );
};

export default EmployeeManagementPage;
