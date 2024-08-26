import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { deadlines } from "../data/deadline"; // Ensure correct path
import projects from "../data/projects"; // Ensure correct path
import { sprints } from "../data/sprint"; // Ensure correct path
import { Deadline } from "../interfaces/Deadline";
import { Sprint } from "../interfaces/Sprint";
import {
  Text,
  Button,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  Box,
  HStack,
} from "@chakra-ui/react";
import DetailsBox from "../components/DetailsBox";
import InputFields from "../components/InputFields"; // Your reusable component

const SprintDetailsPage: React.FC = () => {
  const { title } = useParams<{ title: string }>(); // Extracting title from URL
  const [projectSprints, setProjectSprints] = useState<Sprint[]>([]);
  const [projectDeadlines, setProjectDeadlines] = useState<Deadline[]>([]);
  const [isAddingSprint, setIsAddingSprint] = useState(false);
  const [showDeadlines, setShowDeadlines] = useState(false);
  const [isEditingSprint, setIsEditingSprint] = useState<boolean | number>(
    false
  ); // Added editing state
  const [newSprint, setNewSprint] = useState<Sprint>({
    id: 0, // Temporary ID, generate a unique one later
    projectId: 0, // Set after matching the project
    sprintTitle: "",
    startDate: "",
    endDate: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    if (title) {
      const decodedTitle = decodeURIComponent(title);
      const matchedProject = projects.find(
        (project) => project.title === decodedTitle
      );

      if (matchedProject) {
        const filteredSprints = sprints.filter(
          (sprint) => sprint.projectId === matchedProject.id
        );
        setProjectSprints(filteredSprints);

        const filteredDeadlines = deadlines.filter(
          (deadline) => deadline.projectId === matchedProject.id
        );
        setProjectDeadlines(filteredDeadlines);
        // Initialize new sprint's projectId with matched project id
        setNewSprint((prevSprint) => ({
          ...prevSprint,
          projectId: matchedProject.id,
        }));
      }
    }
  }, [title]);

  const handleAddSprint = () => {
    setIsAddingSprint(true);
    setIsEditingSprint(false);
  };
  const handleRemoveSprint = (sprintId: number) => {
    setProjectSprints((prevSprints) =>
      prevSprints.filter((sprint) => sprint.id !== sprintId)
    );
  };
  const handleDeadlineView = () => {
    setShowDeadlines(!showDeadlines);
  };
  const handleEditSprint = (sprintId: number) => {
    const sprintToEdit = projectSprints.find(
      (sprint) => sprint.id === sprintId
    );
    if (sprintToEdit) {
      setNewSprint(sprintToEdit);
      setIsEditingSprint(sprintId);
      setIsAddingSprint(false);
    }
  };

  const handleSaveSprint = () => {
    if (newSprint.sprintTitle && newSprint.startDate && newSprint.endDate) {
      if (isEditingSprint) {
        setProjectSprints((prevSprints) =>
          prevSprints.map((sprint) =>
            sprint.id === isEditingSprint ? { ...sprint, ...newSprint } : sprint
          )
        );
      } else {
        const newSprintWithId = {
          ...newSprint,
          id: projectSprints.length
            ? Math.max(...projectSprints.map((sprint) => sprint.id)) + 1
            : 1,
        };

        setProjectSprints((prevSprints) => [...prevSprints, newSprintWithId]);
      }

      setNewSprint({
        id: 0,
        projectId: newSprint.projectId,
        sprintTitle: "",
        startDate: "",
        endDate: "",
        description: "",
        status: "",
      });
      setIsAddingSprint(false);
      setIsEditingSprint(false);
    }
  };

  return (
    <div>
      <DetailsBox showSearchBar={false} title="Sprint Details">
        {projectSprints.length > 0 ? (
          <Accordion allowToggle>
            {projectSprints.map((sprint) => (
              <AccordionItem key={sprint.id}>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    {sprint.sprintTitle}
                  </Box>
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Text>
                    Start Date:{" "}
                    {new Date(sprint.startDate).toLocaleDateString()}
                  </Text>
                  <Text>
                    End Date: {new Date(sprint.endDate).toLocaleDateString()}
                  </Text>
                  <Text>Description: {sprint.description}</Text>
                  <Text>Status: {sprint.status}</Text>
                  <HStack>
                    <Button
                      mt={2}
                      colorScheme="blue"
                      onClick={() => handleEditSprint(sprint.id)}
                    >
                      Edit Sprint
                    </Button>
                    <Button
                      mt={2}
                      colorScheme="red"
                      onClick={() => handleRemoveSprint(sprint.id)}
                    >
                      Remove Sprint
                    </Button>
                  </HStack>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p>No sprints available for this project.</p>
        )}

        <HStack spacing={2} justify="space-between">
          <Button mt={4} colorScheme="blue" onClick={handleAddSprint}>
            Add New Sprint
          </Button>
          <Button mt={4} colorScheme="blue" onClick={handleDeadlineView}>
            {showDeadlines ? "Hide Deadlines" : "View Deadlines"}
          </Button>
        </HStack>

        {(isAddingSprint || isEditingSprint) && (
          <InputFields
            fields={[
              {
                id: "sprint-title",
                label: "Sprint Title",
                placeholder: "Enter sprint title",
                value: newSprint.sprintTitle,
                onChange: (e) =>
                  setNewSprint({ ...newSprint, sprintTitle: e.target.value }),
              },
              {
                id: "sprint-start-date",
                label: "Start Date",
                placeholder: "Enter start date",
                value: newSprint.startDate,
                onChange: (e) =>
                  setNewSprint({ ...newSprint, startDate: e.target.value }),
              },
              {
                id: "sprint-end-date",
                label: "End Date",
                placeholder: "Enter end date",
                value: newSprint.endDate,
                onChange: (e) =>
                  setNewSprint({ ...newSprint, endDate: e.target.value }),
              },
              {
                id: "sprint-description",
                label: "Description",
                placeholder: "Enter description",
                value: newSprint.description,
                onChange: (e) =>
                  setNewSprint({ ...newSprint, description: e.target.value }),
              },
              {
                id: "sprint-status",
                label: "Status",
                placeholder: "Enter status",
                value: newSprint.status,
                onChange: (e) =>
                  setNewSprint({ ...newSprint, status: e.target.value }),
              },
            ]}
          />
        )}
        {(isAddingSprint || isEditingSprint) && (
          <Button mt={2} colorScheme="green" onClick={handleSaveSprint}>
            {isEditingSprint ? "Update Sprint" : "Save Sprint"}
          </Button>
        )}

        {showDeadlines && projectDeadlines.length > 0 && (
          <div>
            <Text mt={4} fontWeight="bold">
              Project Deadline:
            </Text>
            {projectDeadlines.map((deadline) => (
              <Box
                key={deadline.projectId}
                mt={2}
                p={4}
                borderWidth={1}
                borderRadius="md"
              >
                <Text>
                  Due Date:{" "}
                  {new Date(deadline.deadlineDate).toLocaleDateString()}
                </Text>
                <Text>Description: {deadline.description}</Text>
              </Box>
            ))}
          </div>
        )}

        {showDeadlines && projectDeadlines.length === 0 && (
          <p>No deadlines available for this project.</p>
        )}
      </DetailsBox>
    </div>
  );
};

export default SprintDetailsPage;
