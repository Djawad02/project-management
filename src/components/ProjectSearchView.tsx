import React, { useState } from "react";
import { Button, Input, Box, Text } from "@chakra-ui/react";
import PieChartComponent from "./PieChart";
import useProjects from "../hooks/useProjects";
import employees from "../data/employee";
import { aggregateDesignations } from "../chartsFunctions/DesignationRatioFunction";
import { aggregateProjectDesignations } from "../chartsFunctions/SpecificProjectRatioFunction";
import { Project } from "../interfaces/Project";

interface ProjectSearchViewProps {
  setView: React.Dispatch<React.SetStateAction<"dashboard" | "projectSearch">>;
}

const ProjectSearchView = ({ setView }: ProjectSearchViewProps) => {
  const { projectList } = useProjects();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
  };

  const handleBackToDashboard = () => {
    setView("dashboard");
  };

  return (
    <Box>
      <Button colorScheme="blue" onClick={handleBackToDashboard}>
        Back to Dashboard
      </Button>
      <Input
        placeholder="Search for a project"
        value={searchTerm}
        onChange={handleSearchChange}
        my={4}
      />
      <Box>
        {projectList
          .filter((project) =>
            project.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((project) => (
            <Box
              key={project.id}
              onClick={() => handleProjectSelect(project)}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              mb={2}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
            >
              <Text>{project.title}</Text>
            </Box>
          ))}
      </Box>

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
    </Box>
  );
};

export default ProjectSearchView;
