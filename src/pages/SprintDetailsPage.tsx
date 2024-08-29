import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import deadlines from "../data/deadline"; // Ensure correct path
import sprints from "../data/sprint"; // Ensure correct path
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
  VStack,
} from "@chakra-ui/react";
import DetailsBox from "../components/DetailsBox";
import InputFields from "../components/InputFields"; // Your reusable component
import useUser from "../hooks/useUser";
import useProjectStore from "../store/useProjectStore";
import DatePicker from "react-datepicker";
import DatePickerComponent from "../components/DatePickerComponent";

const SprintDetailsPage = () => {
  const { title } = useParams<{ title: string }>(); // Extracting title from URL

  const user = useUser();
  const userRole = user?.role;
  const [projectSprints, setProjectSprints] = useState<Sprint[]>([]);
  const [projectDeadlines, setProjectDeadlines] = useState<Deadline[]>([]);
  const [isAddingSprint, setIsAddingSprint] = useState(false);
  const [showDeadlines, setShowDeadlines] = useState(false);
  const [isEditingSprint, setIsEditingSprint] = useState<boolean | number>(
    false
  ); // Added editing state
  const [isAddingDeadline, setIsAddingDeadline] = useState(false);
  const [newDeadline, setNewDeadline] = useState<Deadline>({
    projectId: 0, // Set this after matching the project
    deadlineDate: "", // Assuming this is the date format
    description: "",
  });
  const [newSprint, setNewSprint] = useState<Sprint>({
    id: 0, // Temporary ID, generate a unique one later
    projectId: 0, // Set after matching the project
    sprintTitle: "",
    startDate: "",
    endDate: "",
    description: "",
    status: "",
  });
  const { projectList } = useProjectStore();
  useEffect(() => {
    if (title) {
      const decodedTitle = decodeURIComponent(title);
      const matchedProject = projectList.find(
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
        setNewDeadline((prevDeadline) => ({
          ...prevDeadline,
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
    } else {
      alert("Please fill all fields");
    }
  };
  const handleAddDeadline = () => {
    setIsAddingDeadline(true);
  };

  const handleSaveDeadline = () => {
    if (newDeadline.deadlineDate && newDeadline.description) {
      const newDeadlineWithId = {
        ...newDeadline,
        id: projectDeadlines.length
          ? Math.max(
              ...projectDeadlines.map((deadline) => deadline.projectId)
            ) + 1
          : 1,
      };

      setProjectDeadlines((prevDeadlines) => [
        ...prevDeadlines,
        newDeadlineWithId,
      ]);

      setNewDeadline({
        projectId: newDeadline.projectId,
        deadlineDate: "",
        description: "",
      });

      setIsAddingDeadline(false);
    } else {
      alert("Please fill all fields");
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
                  {(userRole === "Admin" || userRole === "TeamLead") && (
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
                  )}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <Text>No sprints available for this project.</Text>
        )}

        {(userRole === "Admin" || userRole === "TeamLead") && (
          <>
            <Button mt={4} colorScheme="blue" onClick={handleAddSprint}>
              Add New Sprint
            </Button>
            {(isAddingSprint || isEditingSprint) && (
              <InputFields
                fields={[
                  {
                    id: "sprint-title",
                    label: "Sprint Title",
                    placeholder: "Enter sprint title",
                    value: newSprint.sprintTitle,
                    onChange: (e) =>
                      setNewSprint({
                        ...newSprint,
                        sprintTitle: e.target.value,
                      }),
                  },
                  {
                    id: "sprint-date-range",
                    label: "Date Range",
                    placeholder: "Enter date range",
                    component: (
                      <DatePickerComponent
                        startDate={
                          newSprint.startDate
                            ? new Date(newSprint.startDate)
                            : undefined
                        }
                        endDate={
                          newSprint.endDate
                            ? new Date(newSprint.endDate)
                            : undefined
                        }
                        onChange={(dates: [Date | null, Date | null]) => {
                          const [startDate, endDate] = dates;

                          setNewSprint({
                            ...newSprint,
                            startDate: startDate
                              ? startDate.toISOString().split("T")[0]
                              : "", // Assigning empty string if null
                            endDate: endDate
                              ? endDate.toISOString().split("T")[0]
                              : "", // Assigning empty string if null
                          });
                        }}
                        selectsRange
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Enter date range"
                      />
                    ),
                  },
                  {
                    id: "sprint-description",
                    label: "Description",
                    placeholder: "Enter description",
                    value: newSprint.description,
                    onChange: (e) =>
                      setNewSprint({
                        ...newSprint,
                        description: e.target.value,
                      }),
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
          </>
        )}
        <VStack spacing={2} justify="space-between">
          <Button mt={4} colorScheme="blue" onClick={handleDeadlineView}>
            {showDeadlines ? "Hide Deadlines" : "View Deadlines"}
          </Button>
        </VStack>
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
          <>
            <p>No deadlines available for this project.</p>
            {(userRole === "Admin" || userRole === "TeamLead") && (
              <Button mt={2} colorScheme="blue" onClick={handleAddDeadline}>
                Add Deadline
              </Button>
            )}
          </>
        )}
        {isAddingDeadline && (
          <InputFields
            fields={[
              {
                id: "deadline-date",
                label: "Deadline Date",
                placeholder: "Enter deadline date",
                value: newDeadline.deadlineDate,
                onChange: (e) =>
                  setNewDeadline({
                    ...newDeadline,
                    deadlineDate: e.target.value,
                  }),
              },
              {
                id: "deadline-description",
                label: "Description",
                placeholder: "Enter description",
                value: newDeadline.description,
                onChange: (e) =>
                  setNewDeadline({
                    ...newDeadline,
                    description: e.target.value,
                  }),
              },
            ]}
          />
        )}

        {isAddingDeadline && (
          <Button mt={2} colorScheme="green" onClick={handleSaveDeadline}>
            Save Deadline
          </Button>
        )}
      </DetailsBox>
    </div>
  );
};

export default SprintDetailsPage;
