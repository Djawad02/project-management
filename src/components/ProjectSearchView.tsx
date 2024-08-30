import React, { useContext, useState } from "react";
import { Button, Input, Box, Text, Select, HStack } from "@chakra-ui/react";
import PieChartComponent from "./PieChart";
import useProjects from "../hooks/useProjects";
import employees from "../data/employee";
import { aggregateDesignations } from "../chartsFunctions/DesignationRatioFunction";
import { aggregateProjectDesignations } from "../chartsFunctions/SpecificProjectRatioFunction";
import { Project } from "../interfaces/Project";
import useProjectStore from "../store/useProjectStore";
import DetailsBox from "./DetailsBox";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import useUser from "../hooks/useUser";

interface ProjectSearchViewProps {
  setView: React.Dispatch<React.SetStateAction<"dashboard" | "projectSearch">>;
}

const ProjectSearchView = ({ setView }: ProjectSearchViewProps) => {
  const { projectList, employeeList } = useProjectStore();
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const user = useUser();
  const userRole = user?.role;
  const filterProjects = () => {
    if (user?.role === "Admin") {
      return projectList;
    }

    if (user?.role === "TeamLead" || user?.role === "Employee") {
      return projectList.filter((project) =>
        user.assignedProjects?.includes(project.id)
      );
    }

    // Default to an empty array if no role is matched or user is null
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
    if (selectedProject)
      navigate(
        `/projects/${encodeURIComponent(
          selectedProject.title
        )}/dashboard/specific-project`
      );
    else alert("Please select a project");
  };

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
            data={aggregateProjectDesignations(employees, selectedProject)}
          />
        </Box>
      )}
    </DetailsBox>
  );
};

export default ProjectSearchView;
