import React, { useEffect, useState } from "react";
import DetailsBox from "../components/DetailsBox";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Button,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import useProjectStore from "../store/useProjectStore";
import { Project } from "../interfaces/Project";

const EditProjectPage = () => {
  const { title } = useParams<{ title: string }>();
  const { projectList, updateProject } = useProjectStore();
  const [project, setProject] = useState<Project | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (title) {
      const decodedTitle = decodeURIComponent(title);
      const fetchedProject = projectList.find((p) => p.title === decodedTitle);
      setProject(fetchedProject);
    }
  }, [title, projectList]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (project) {
      setProject({
        ...project,
        [name]: value,
      });
    }
  };

  const handleSubmit = () => {
    if (project) {
      updateProject(project);
      alert("Project updated!");
      navigate("/");
    }
  };

  if (project === undefined) {
    return <Text>Project not found</Text>;
  }

  return (
    <DetailsBox showSearchBar={false} title="Edit Project">
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Project Title</FormLabel>
          <Input
            name="title"
            placeholder="Enter project title"
            value={project.title || ""}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Input
            name="description"
            placeholder="Enter project description"
            value={project.description || ""}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Status</FormLabel>
          <Input
            name="status"
            placeholder="Enter project status"
            value={project.status || ""}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Source</FormLabel>
          <Input
            name="source"
            placeholder="Enter source"
            value={project.source || ""}
            onChange={handleChange}
          />
        </FormControl>
        <Button colorScheme="blue" mb={4} onClick={handleSubmit}>
          Save Changes
        </Button>
      </VStack>
    </DetailsBox>
  );
};

export default EditProjectPage;
