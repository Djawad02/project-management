import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import employee from "../data/employee"; // Adjust path as needed
import {
  Box,
  Heading,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  HStack,
  Button,
} from "@chakra-ui/react";

const UserManagementPage = () => {
  const { title } = useParams();
  const { projectList } = useProjects();
  const project = projectList.find(
    (p) => p.title === decodeURIComponent(title!)
  );

  const [searchTerm, setSearchTerm] = useState("");

  if (!project) {
    return <Text>Project not found</Text>;
  }

  // Filter employees based on project member IDs
  const projectEmployees = employee.filter((e) =>
    project.members.includes(e.id)
  );

  // Filter employees based on search term
  const filteredEmployees = projectEmployees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Box
        padding="20px"
        maxWidth="800px"
        margin="auto"
        bg="lavendar"
        borderWidth="1px"
        borderColor="blue.700"
        borderRadius="8px"
        mt={10}
      >
        <Heading as="h2" size="lg" mb="10">
          {project.title} - Team Members
        </Heading>

        <Box
          width="100%"
          padding="20px"
          borderWidth="1px"
          borderRadius="8px"
          borderColor="blue.700"
        >
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            mb="4"
            width="80"
          />
          <TableContainer>
            <Table
              variant="striped"
              colorScheme="gray"
              size="md"
              borderRadius={6}
              borderColor="blue.900"
              borderWidth="2px"
              width="100%"
            >
              <Thead bg="blue.700">
                <Tr>
                  <Th borderColor="blue.900" textColor="white">
                    ID
                  </Th>
                  <Th borderColor="blue.900" textColor="white">
                    Name
                  </Th>
                  <Th borderColor="blue.900" textColor="white">
                    Designation
                  </Th>
                  <Th borderColor="blue.900" textColor="white">
                    Contact
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredEmployees.map((employee) => (
                  <Tr key={employee.id} border="2px" borderColor="blue.900">
                    <Td>{employee.id}</Td>
                    <Td>{employee.name}</Td>
                    <Td>{employee.designation}</Td>
                    <Td>{employee.email}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <HStack spacing={4} mb="4" mt="8" justifyContent="center">
          <Button
            colorScheme="blue"
            // onClick={() => navigate(`/add-employee/${project.title}`)}
          >
            Add Employee
          </Button>
          <Button
            colorScheme="blue"
            // onClick={() => navigate(`/edit-employee/${project.title}`)}
          >
            Edit Employee
          </Button>
          <Button
            colorScheme="red"
            // onClick={() => navigate(`/remove-employee/${project.title}`)}
          >
            Remove Employee
          </Button>
        </HStack>
      </Box>
    </>
  );
};

export default UserManagementPage;
