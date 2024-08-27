import React, { useState } from "react";
import DetailsBox from "../components/DetailsBox";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";
import { Project } from "../interfaces/Project";
import { useProject } from "../context/ProjectContext";

const AddNewProject = () => {
  const { addProject } = useProject();
  const [newProject, setNewProject] = useState<Project>({
    id: 0,
    title: "",
    description: "",
    status: "",
    members: [],
    source: "",
    teamLead: 0,
    deadlines: [],
    sprints: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({
      ...prev,
      [name]: name === "teamLead" ? (value ? Number(value) : 0) : value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProject = () => {
    if (!newProject.title || !newProject.description || !newProject.source) {
      alert("Please fill in all required fields.");
      return;
    }

    const newProjectWithId = {
      ...newProject,
      id: Math.floor(Math.random() * 1000), // Example ID generation; replace with your logic
    };

    addProject(newProjectWithId);
    setNewProject({
      id: 0,
      title: "",
      description: "",
      status: "",
      members: [],
      source: "",
      teamLead: 0,
      deadlines: [],
      sprints: [],
    });
  };

  return (
    <DetailsBox showSearchBar={false} title="Add New Project">
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Project Title</FormLabel>
          <Input
            name="title"
            value={newProject.title}
            onChange={handleInputChange}
            placeholder="Enter project title"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Input
            name="description"
            value={newProject.description}
            onChange={handleInputChange}
            placeholder="Enter project description"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Status</FormLabel>
          <Select
            name="status"
            value={newProject.status}
            onChange={handleSelectChange}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="completed">Completed</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Source</FormLabel>
          <Input
            name="source"
            value={newProject.source}
            onChange={handleInputChange}
            placeholder="Enter source"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Team Lead</FormLabel>
          <Input
            type="number"
            name="teamLead"
            value={newProject.teamLead || ""}
            onChange={handleInputChange}
            placeholder="Enter team lead ID"
          />
        </FormControl>
        <Button colorScheme="blue" mb={4} onClick={handleAddProject}>
          Add New Project
        </Button>
      </VStack>
    </DetailsBox>
  );
};

export default AddNewProject;
