import React, { useState, useEffect } from "react";
import { Button, Box, Text, Select, HStack, Spinner } from "@chakra-ui/react";
import PieChartComponent from "./PieChart";
import useProjectStore from "../store/useProjectStore";
import { aggregateProjectDesignations } from "../chartsFunctions/SpecificProjectRatioFunction";
import { Project } from "../interfaces/Project";
import DetailsBox from "./DetailsBox";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { Employee } from "../interfaces/Employee";

interface ProjectSearchViewProps {
  setView: React.Dispatch<React.SetStateAction<"dashboard" | "projectSearch">>;
  employeeList: Employee[];
}

const ProjectSearchView = ({
  setView,
  employeeList,
}: ProjectSearchViewProps) => {
  const { projectList, fetchProjects, fetchEmployees } = useProjectStore();
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const user = useUser();

  const userRole = user?.role;

  useEffect(() => {
    const fetchData = async () => {
      await fetchProjects();
      await fetchEmployees();
      setLoading(false);
    };

    fetchData();
  }, [fetchProjects, fetchEmployees]);

  const filterProjects = () => {
    if (userRole === "Admin") {
      return projectList;
    }

    if (userRole === "TeamLead" || userRole === "Employee") {
      return projectList.filter((project) =>
        user?.assignedProjects?.includes(project.id)
      );
    }

    return [];
  };

  const specificProjects = filterProjects();

  const handleProjectSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const projectId = e.target.value;
    const project = projectList.find((p) => p.id.toString() === projectId);
    setSelectedProject(project || null);
  };

  const handleBackToDashboard = () => {
    setView("dashboard");
  };

  const handleSpecificProjectDetails = () => {
    if (selectedProject) {
      navigate(
        `/projects/${encodeURIComponent(
          selectedProject.title
        )}/dashboard/specific-project`
      );
    } else {
      alert("Please select a project");
    }
  };

  if (loading) return <Spinner />;

  return (
    <DetailsBox
      showSearchBar={false}
      title="Per Project Employee Designation Ratio"
    >
      <HStack justify="space-between">
        <Button colorScheme="blue" onClick={handleBackToDashboard}>
          Back to Dashboard
        </Button>
        <Button colorScheme="blue" onClick={handleSpecificProjectDetails}>
          View Project Details
        </Button>
      </HStack>
      <Select
        mt={5}
        placeholder="Select a project"
        onChange={handleProjectSelect}
      >
        {specificProjects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.title}
          </option>
        ))}
      </Select>
      {selectedProject && (
        <Box mt={4}>
          <Text fontSize="xl" mb={2}>
            {selectedProject.title} Designation Ratio
          </Text>
          <PieChartComponent
            data={aggregateProjectDesignations(employeeList, selectedProject)}
          />
        </Box>
      )}
    </DetailsBox>
  );
};

export default ProjectSearchView;
