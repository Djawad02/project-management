import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HStack, Button, Text } from "@chakra-ui/react";
import TableComponent from "../components/TableComponent";
import DetailsBox from "../components/DetailsBox";
import employeeColumns from "../data/columns/employeeColumns";
import { Employee } from "../interfaces/Employee";
import { AuthContext } from "../context/AuthContext";
import useProjectStore from "../store/useProjectStore";
import { getEmployees } from "../services/EmployeeAPI";
import { Project } from "../interfaces/Project";

const ProjectTeamPage = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const { projectList } = useProjectStore();
  const { user } = React.useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [project, setProject] = useState<Project | null>(null);
  const [employeeList, setEmployeeList] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      setError(null); // Reset error state
      try {
        if (title) {
          const employees = await getEmployees(title);
          setEmployeeList(employees);
        }

        const foundProject = projectList.find(
          (p) => p.title === decodeURIComponent(title!)
        ) as Project;
        setProject(foundProject || null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [title]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  if (!project) {
    return <Text>Project not found</Text>;
  }
  const filteredEmployees = employeeList.filter(
    (employee: Employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const canEditMembers =
    user && (user.role === "Admin" || project.teamLead === user.id);

  return (
    <DetailsBox
      showSearchBar={true}
      context="teamMembers"
      title={project.title}
      searchTerm={searchTerm}
      onSearchTermChange={(e) => setSearchTerm(e.target.value)}
    >
      {employeeList.length > 0 ? (
        <TableComponent
          columns={employeeColumns}
          data={filteredEmployees}
          borderColor="blue.900"
          colorScheme="gray"
          width="100%"
        />
      ) : (
        <Text>No employees found for this project.</Text>
      )}

      <HStack spacing={4} mb="4" mt="8" justifyContent="center">
        {canEditMembers && (
          <HStack spacing={4}>
            <Button
              colorScheme="blue"
              onClick={() => navigate(`/projects/${title}/add-member`)}
            >
              Add Member
            </Button>
            <Button
              colorScheme="red"
              onClick={() => navigate(`/projects/${title}/remove-member`)}
            >
              Remove Member
            </Button>
          </HStack>
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

export default ProjectTeamPage;
