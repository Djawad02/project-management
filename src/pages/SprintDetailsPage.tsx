import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Deadline } from "../interfaces/Deadline";
import { Sprint } from "../interfaces/Sprint";
import { Text, Button, VStack, HStack, useToast } from "@chakra-ui/react";
import DetailsBox from "../components/DetailsBox";
import useUser from "../hooks/useUser";
import useProjectStore from "../store/useProjectStore";
import SprintList from "./SprintPage/SprintList";
import DeadlineForm from "./DeadlinePage/DeadlineForm";
import DeadlineList from "./DeadlinePage/DeadlineList";
import SprintForm from "./SprintPage/SprintForm";
import useSprintStore from "../store/useSprintStore";
import useDeadlineStore from "../store/useDeadlineStore";

const SprintDetailsPage = () => {
  const { title } = useParams<{ title: string }>();
  const user = useUser();
  const userRole = user?.role || "";
  const toast = useToast();

  const { sprints, addSprint, updateSprint, removeSprint } = useSprintStore();

  const { deadlines, addDeadline, updateDeadline, removeDeadline } =
    useDeadlineStore();

  const [projectSprints, setProjectSprints] = useState<Sprint[]>([]);
  const [projectDeadlines, setProjectDeadlines] = useState<Deadline[]>([]);
  const [isAddingSprint, setIsAddingSprint] = useState<boolean>(false);
  const [showDeadlines, setShowDeadlines] = useState<boolean>(false);
  const [isEditingSprint, setIsEditingSprint] = useState<number | false>(false);
  const [isAddingDeadline, setIsAddingDeadline] = useState<boolean>(false);
  const [editingDeadline, setEditingDeadline] = useState<Deadline | null>(null);
  const [newDeadline, setNewDeadline] = useState<Deadline>({
    id: 0,
    projectId: 0,
    deadlineDate: "",
    description: "",
  });
  const [newSprint, setNewSprint] = useState<Sprint>({
    id: 0,
    projectId: 0,
    sprintTitle: "",
    startDate: "",
    endDate: "",
    description: "",
    status: "",
    task: [],
  });

  const { projectList } = useProjectStore();
  const projectDetails = projectList.find((p) => p.title === title);

  useEffect(() => {
    if (projectDetails) {
      const filteredSprints = sprints.filter(
        (s) => s.projectId === projectDetails.id
      );
      const filteredDeadlines = deadlines.filter(
        (d) => d.projectId === projectDetails.id
      );
      setProjectSprints(filteredSprints);
      setProjectDeadlines(filteredDeadlines);
    }
  }, [projectDetails, sprints, deadlines]);

  const handleAddSprint = () => {
    setIsAddingSprint(true);
    setIsEditingSprint(false);
    setNewSprint({
      id: 0,
      projectId: projectDetails?.id ?? 0,
      sprintTitle: "",
      startDate: "",
      endDate: "",
      description: "",
      status: "",
      task: [],
    });
  };

  const handleSaveSprint = () => {
    if (
      !newSprint.sprintTitle ||
      !newSprint.startDate ||
      !newSprint.endDate ||
      !newSprint.description ||
      !newSprint.status
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill all fields.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Validation check for date range
    if (new Date(newSprint.startDate) >= new Date(newSprint.endDate)) {
      toast({
        title: "Invalid Date Range",
        description: "Start date must be before end date.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (isEditingSprint !== false) {
      // Update the sprint if editing
      updateSprint(isEditingSprint, newSprint);
    } else {
      // Add a new sprint
      addSprint({ ...newSprint, id: sprints.length + 1 });
    }
    setIsAddingSprint(false);
    setIsEditingSprint(false);
  };

  const handleEditSprint = (id: number) => {
    setIsEditingSprint(id);
    const sprint = projectSprints.find((sprint) => sprint.id === id);
    if (sprint) {
      setNewSprint(sprint);
      setIsAddingSprint(true);
    }
  };

  const handleRemoveSprint = (id: number) => {
    removeSprint(id);
  };

  const handleAddDeadline = () => {
    setIsAddingDeadline(true);
    setEditingDeadline(null);
    setNewDeadline({
      id: 0,
      projectId: projectDetails?.id ?? 0,
      deadlineDate: "",
      description: "",
    });
  };

  const handleSaveDeadline = () => {
    if (editingDeadline) {
      updateDeadline(editingDeadline.id, newDeadline);
    } else {
      addDeadline({ ...newDeadline, projectId: projectDetails?.id ?? 0 });
    }
    setIsAddingDeadline(false);
    setEditingDeadline(null);
  };

  const handleEditDeadline = (deadline: Deadline) => {
    setEditingDeadline(deadline);
    setNewDeadline(deadline);
    setIsAddingDeadline(true);
  };

  const handleRemoveDeadline = (id: number) => {
    removeDeadline(id);
  };
  return (
    <DetailsBox title={`Sprint Details for ${title}`}>
      <SprintList
        sprints={projectSprints}
        userRole={userRole}
        onEdit={handleEditSprint}
        onRemove={handleRemoveSprint}
      />
      {(userRole === "Admin" || userRole === "TeamLead") && (
        <>
          <Button mt={4} colorScheme="teal" onClick={handleAddSprint}>
            Add Sprint
          </Button>
          {isAddingSprint && (
            <SprintForm
              sprint={newSprint}
              onChange={setNewSprint}
              onSave={handleSaveSprint}
              isEditing={isEditingSprint}
            />
          )}
        </>
      )}
      <HStack justify="space-evenly">
        <Button
          mt={2}
          colorScheme="blue"
          onClick={() => setShowDeadlines(!showDeadlines)}
        >
          {showDeadlines ? "Hide Deadlines" : "Show Deadlines"}
        </Button>
      </HStack>

      {showDeadlines && (
        <>
          <DeadlineList
            deadlines={projectDeadlines}
            onEdit={handleEditDeadline}
            onRemove={handleRemoveDeadline}
          />
          {(userRole === "Admin" || userRole === "TeamLead") && (
            <>
              {projectDeadlines.length === 0 && (
                <Button mt={4} colorScheme="teal" onClick={handleAddDeadline}>
                  Add Deadline
                </Button>
              )}
              {isAddingDeadline && (
                <DeadlineForm
                  deadline={newDeadline}
                  onChange={setNewDeadline}
                  onSave={handleSaveDeadline}
                />
              )}
            </>
          )}
        </>
      )}
    </DetailsBox>
  );
};

export default SprintDetailsPage;
