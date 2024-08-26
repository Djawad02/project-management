import React, { useState } from "react";
import { Button, Box, Text } from "@chakra-ui/react";
import employees from "../data/employee";
import projects from "../data/projects";
import TableComponent from "../components/TableComponent";
import employeeColumns from "../data/employeeColumns";

const ResourceManagementPage = () => {
  const [view, setView] = useState<"assigned" | "free">("assigned");

  // Function to get employees assigned to a project with project names
  const getAssignedEmployeesWithProjects = () => {
    return employees
      .map((employee) => {
        const employeeProjects = projects
          .filter((project) => project.members.includes(employee.id))
          .map((project) => project.title);

        return {
          ...employee,
          projects:
            employeeProjects.length > 0 ? employeeProjects.join(", ") : "None",
        };
      })
      .filter((employee) => employee.projects !== "None");
  };

  // Function to get employees not assigned to any project
  const getFreeEmployees = () => {
    const assignedEmployeeIds = new Set(
      projects.flatMap((project) => project.members)
    );
    return employees.filter(
      (employee) => !assignedEmployeeIds.has(employee.id)
    );
  };

  const assignedEmployees = getAssignedEmployeesWithProjects();
  const freeEmployees = getFreeEmployees();

  // Log data for debugging
  console.log("Assigned Employees:", assignedEmployees);
  console.log("Free Employees:", freeEmployees);

  return (
    <Box>
      <Box mb="4" display="flex" justifyContent="center" gap="4">
        <Button
          colorScheme="blue"
          onClick={() => setView("assigned")}
          isActive={view === "assigned"}
        >
          Show Assigned Employees
        </Button>
        <Button
          colorScheme="teal"
          onClick={() => setView("free")}
          isActive={view === "free"}
        >
          Show Free Employees
        </Button>
      </Box>

      {view === "assigned" ? (
        <Box>
          <Text fontSize="xl" mb="4">
            Employees Assigned to Projects
          </Text>
          <TableComponent
            columns={[
              ...employeeColumns,
              { header: "Projects", accessor: "projects" }, // Adding 'projects' column dynamically
            ]}
            data={assignedEmployees}
            borderColor="blue.900"
            colorScheme="gray"
            width="100%"
          />
        </Box>
      ) : (
        <Box>
          <Text fontSize="xl" mb="4">
            Employees Not Assigned to Any Project
          </Text>
          <TableComponent
            columns={employeeColumns} // Assuming columns do not need modification for free employees
            data={freeEmployees}
            borderColor="blue.900"
            colorScheme="gray"
            width="100%"
          />
        </Box>
      )}
    </Box>
  );
};

export default ResourceManagementPage;
