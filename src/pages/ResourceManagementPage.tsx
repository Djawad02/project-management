import React, { useEffect, useState } from "react";
import TableComponent from "../components/TableComponent";
import employeeColumns from "../data/columns/employeeColumns";
import useProjectStore from "../store/useProjectStore";
import { Box, Button, Text, Spinner } from "@chakra-ui/react";

const ResourceManagementPage = () => {
  const [view, setView] = useState<"assigned" | "free">("assigned");
  const { projectList, employeeList, fetchEmployees, fetchProjects } =
    useProjectStore();
  const [loading, setLoading] = useState(true);

  const getAssignedEmployeesWithProjects = () => {
    return employeeList
      .map((employee) => {
        const employeeProjects = projectList
          .filter((project) =>
            project.members.some((member) => member.id === employee.id)
          )
          .map((project) => project.title);

        if (employeeProjects.length > 0) {
          return {
            ...employee,
            projects: employeeProjects.join(", "),
          };
        }
        return null;
      })
      .filter((employee) => employee !== null);
  };

  const getFreeEmployees = () => {
    const assignedEmployeeIds = new Set(
      projectList.flatMap((project) =>
        project.members.map((member) => member.id)
      )
    );

    return employeeList.filter(
      (employee) => !assignedEmployeeIds.has(employee.id)
    );
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await fetchEmployees();
        await fetchProjects();
        console.log("Fetched Employees:", employeeList);
        console.log("Fetched Projects:", projectList);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchEmployees, fetchProjects]);
  projectList.forEach((project) => {
    console.log(`Project: ${project.title}, Members:`, project.members);
  });

  const assignedEmployees = getAssignedEmployeesWithProjects();
  const freeEmployees = getFreeEmployees();

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

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="200px"
        >
          <Spinner size="xl" />
          <Text ml={4}>Loading...</Text>
        </Box>
      ) : view === "assigned" ? (
        <Box>
          <Text fontSize="xl" mb="4">
            Employees Assigned to Projects
          </Text>
          <TableComponent
            columns={[
              ...employeeColumns,
              { header: "Projects", accessor: "projects" },
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
            columns={employeeColumns}
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
