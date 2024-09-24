import {
  Flex,
  Box,
  VStack,
  Image,
  Text,
  Input,
  Button,
  UnorderedList,
  ListItem,
  HStack,
  Select,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DetailsBox from "../components/DetailsBox";
import employeeImage from "../assets/employeeImage.png";
import useProjectStore from "../store/useProjectStore";

const EmployeeDetailPage = () => {
  const { projectTitle } = useParams<{ projectTitle: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null);
  const { employeeList, projectList } = useProjectStore();

  const getEmployeeProjects = (employeeId: number) => {
    console.log("projectList", projectList);
    const employeeProjects = projectList.filter((project) =>
      project.members.some((member) => member.id === employeeId)
    );

    return employeeProjects;
  };

  const handleEmployeeSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const employeeId = parseInt(event.target.value);
    const employee = employeeList.find((emp) => emp.id === employeeId);
    setSelectedEmployee(employee || null);
    const employeeProjects = getEmployeeProjects(employeeId);
    console.log("employeeProjects", employeeProjects);
  };
  return (
    <DetailsBox showSearchBar={false} title="Employee Details">
      <Flex direction="column" align="center" justify="center" p={4} gap={4}>
        <Select
          placeholder="Select employee"
          onChange={handleEmployeeSelect}
          width="300px"
        >
          {employeeList.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.name}
            </option>
          ))}
        </Select>

        {selectedEmployee ? (
          <Flex
            direction="row"
            align="start"
            justify="space-between"
            w="full"
            p={4}
          >
            <Box flex="1">
              <VStack align="start" spacing={4}>
                <Text fontSize="2xl" fontWeight="bold">
                  {selectedEmployee.name}
                </Text>
                <Box>
                  <Text fontSize="lg" color="gray.600">
                    Employee ID: {selectedEmployee.id}
                  </Text>
                  <Text fontSize="lg" color="gray.600">
                    Designation: {selectedEmployee.designation}
                  </Text>
                  <Text fontSize="lg" color="gray.600">
                    Contact: {selectedEmployee.contact}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="lg" fontWeight="bold">
                    Projects:
                  </Text>
                  <UnorderedList spacing={2}>
                    {getEmployeeProjects(selectedEmployee.id).length > 0 ? (
                      getEmployeeProjects(selectedEmployee.id).map(
                        (project) => (
                          <ListItem key={project.id} fontSize="md">
                            {project.title}
                          </ListItem>
                        )
                      )
                    ) : (
                      <Text fontSize="md" color="gray.600">
                        No projects assigned.
                      </Text>
                    )}
                  </UnorderedList>
                </Box>
              </VStack>
            </Box>
            <Box ml="auto">
              <Image
                src={employeeImage}
                alt={selectedEmployee.name}
                boxSize="150px"
                objectFit="cover"
                borderRadius="lg"
              />
            </Box>
          </Flex>
        ) : (
          searchTerm && (
            <Text fontSize="xl">No employee found. Please search again.</Text>
          )
        )}
      </Flex>
    </DetailsBox>
  );
};

export default EmployeeDetailPage;
