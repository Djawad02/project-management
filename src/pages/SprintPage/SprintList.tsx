import React, { useState } from "react";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { Sprint } from "../../interfaces/Sprint";
import TableComponent from "../../components/TableComponent";
import { Task } from "../../interfaces/Task";

interface SprintListProps {
  sprints: Sprint[];
  userRole: string;
  onEdit: (id: number) => void;
  onRemove: (id: number) => void;
}

const SprintList = ({
  sprints,
  userRole,
  onEdit,
  onRemove,
}: SprintListProps) => {
  const [expandedSprintId, setExpandedSprintId] = useState<number | null>(null);

  const sprintColumns = [
    { header: "Sprint Title", accessor: "sprintTitle" },
    { header: "Start Date", accessor: "startDate" },
    { header: "End Date", accessor: "endDate" },
    { header: "Description", accessor: "description" },
    { header: "Status", accessor: "status" },
    { header: "Actions", accessor: "actions" },
  ];

  const taskColumns = [
    { header: "Task Title", accessor: "title" },
    { header: "Frontend Hours", accessor: "frontend" },
    { header: "Backend Hours", accessor: "backend" },
    { header: "QA Hours", accessor: "qa" },
  ];

  const getTaskData = (tasks: Task[] = []): Record<string, any>[] => {
    return tasks.map((task, index) => ({
      key: `task-${task.id || index}`, // Ensure a unique key
      title: task.title,
      frontend: task.resources.frontend,
      backend: task.resources.backend,
      qa: task.resources.qa,
    }));
  };

  const handleToggleTasks = (sprintId: number) => {
    setExpandedSprintId(expandedSprintId === sprintId ? null : sprintId);
  };

  const handleBackToSprints = () => {
    setExpandedSprintId(null);
  };

  const combinedData = sprints.map((sprint) => ({
    key: `sprint-${sprint.id}`, // Ensure a unique key
    sprintTitle: sprint.sprintTitle,
    startDate: new Date(sprint.startDate).toLocaleDateString(),
    endDate: new Date(sprint.endDate).toLocaleDateString(),
    description: sprint.description,
    status: sprint.status,
    actions: (
      <HStack>
        {(userRole === "Admin" || userRole === "TeamLead") && (
          <>
            <Button colorScheme="blue" onClick={() => onEdit(sprint.id)}>
              Edit Sprint
            </Button>
            <Button colorScheme="red" onClick={() => onRemove(sprint.id)}>
              Remove Sprint
            </Button>
            <Button
              colorScheme="teal"
              onClick={() => handleToggleTasks(sprint.id)}
            >
              {expandedSprintId === sprint.id ? "Hide Tasks" : "View Tasks"}
            </Button>
          </>
        )}
      </HStack>
    ),
  }));

  return (
    <>
      {expandedSprintId === null ? (
        <>
          {sprints.length > 0 ? (
            <TableComponent
              columns={sprintColumns}
              data={combinedData}
              borderColor="blue.700"
              colorScheme="blue"
              width="100%"
            />
          ) : (
            <Text>No sprints available for this project.</Text>
          )}
        </>
      ) : (
        <Box mt={4}>
          {sprints
            .filter((sprint) => sprint.id === expandedSprintId)
            .map((sprint) => (
              <Box
                key={`sprint-details-${sprint.id}`}
                p={4}
                borderWidth={1}
                borderRadius="md"
              >
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                  {sprint.sprintTitle} - Tasks
                </Text>
                <TableComponent
                  columns={taskColumns}
                  data={getTaskData(sprint.task)}
                  borderColor="green.700"
                  colorScheme="green"
                  width="100%"
                />
                <Button mt={4} colorScheme="blue" onClick={handleBackToSprints}>
                  Back to Sprints
                </Button>
              </Box>
            ))}
        </Box>
      )}
    </>
  );
};

export default SprintList;
