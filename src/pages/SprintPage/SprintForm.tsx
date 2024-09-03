import React from "react";
import {
  Button,
  Box,
  HStack,
  VStack,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  FormControl,
  FormLabel,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import InputFields from "../../components/InputFields";
import { Sprint } from "../../interfaces/Sprint";
import DatePickerComponent from "../../components/DatePickerComponent";
import { Task } from "../../interfaces/Task";

interface SprintFormProps {
  sprint: Sprint;
  onChange: (sprint: Sprint) => void;
  onSave: () => void;
  isEditing: boolean | number;
}

const SprintForm = ({
  sprint,
  onChange,
  onSave,
  isEditing,
}: SprintFormProps) => {
  // Function to handle adding a new task
  const handleAddTask = () => {
    const newTask: Task = {
      id: 0,
      title: "",
      resources: {
        frontend: 0,
        backend: 0,
        qa: 0,
      },
      status: "Incomplete",
    };
    onChange({ ...sprint, task: [...sprint.task, newTask] });
  };

  // Function to handle task change
  const handleTaskChange = (index: number, key: keyof Task, value: any) => {
    const updatedTasks = [...sprint.task];
    updatedTasks[index] = { ...updatedTasks[index], [key]: value };
    onChange({ ...sprint, task: updatedTasks });
  };

  // Function to handle resource change
  const handleResourceChange = (
    taskIndex: number,
    role: "frontend" | "backend" | "qa",
    value: number
  ) => {
    const updatedTasks = [...sprint.task];
    updatedTasks[taskIndex].resources[role] = value;
    onChange({ ...sprint, task: updatedTasks });
  };

  // Function to handle removing a task
  const handleRemoveTask = (index: number) => {
    const updatedTasks = sprint.task.filter((_, i) => i !== index);
    onChange({ ...sprint, task: updatedTasks });
  };

  return (
    <>
      <InputFields
        fields={[
          {
            id: "sprint-title",
            label: "Sprint Title",
            placeholder: "Enter sprint title",
            value: sprint.sprintTitle,
            onChange: (e) =>
              onChange({ ...sprint, sprintTitle: e.target.value }),
          },
          {
            id: "sprint-date-range",
            label: "Date Range",
            placeholder: "Enter date range",
            component: (
              <DatePickerComponent
                startDate={
                  sprint.startDate ? new Date(sprint.startDate) : undefined
                }
                endDate={sprint.endDate ? new Date(sprint.endDate) : undefined}
                onChange={(dates: [Date | null, Date | null]) => {
                  const [startDate, endDate] = dates;
                  onChange({
                    ...sprint,
                    startDate: startDate
                      ? startDate.toISOString().split("T")[0]
                      : "",
                    endDate: endDate ? endDate.toISOString().split("T")[0] : "",
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
            value: sprint.description,
            onChange: (e) =>
              onChange({ ...sprint, description: e.target.value }),
          },
          {
            id: "sprint-status",
            label: "Status",
            placeholder: "Enter status",
            value: sprint.status,
            onChange: (e) => onChange({ ...sprint, status: e.target.value }),
          },
        ]}
      />

      {/* Task Management Section */}
      <VStack spacing={4} mt={4} align="stretch">
        {sprint.task.map((task, index) => (
          <Box key={index} p={4} borderWidth={1} borderRadius="md">
            <FormControl mb={2}>
              <FormLabel>Task Title</FormLabel>
              <Input
                placeholder="Enter task title"
                value={task.title}
                onChange={(e) =>
                  handleTaskChange(index, "title", e.target.value)
                }
              />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel>Frontend Resources</FormLabel>
              <NumberInput
                min={0}
                value={task.resources.frontend}
                onChange={(valueString) =>
                  handleResourceChange(index, "frontend", Number(valueString))
                }
              >
                <NumberInputField />
              </NumberInput>
            </FormControl>
            <FormControl mb={2}>
              <FormLabel>Backend Resources</FormLabel>
              <NumberInput
                min={0}
                value={task.resources.backend}
                onChange={(valueString) =>
                  handleResourceChange(index, "backend", Number(valueString))
                }
              >
                <NumberInputField />
              </NumberInput>
            </FormControl>
            <FormControl mb={2}>
              <FormLabel>QA Resources</FormLabel>
              <NumberInput
                min={0}
                value={task.resources.qa}
                onChange={(valueString) =>
                  handleResourceChange(index, "qa", Number(valueString))
                }
              >
                <NumberInputField />
              </NumberInput>
            </FormControl>
            <HStack justify="flex-end">
              <IconButton
                icon={<DeleteIcon />}
                colorScheme="red"
                aria-label="Remove task"
                onClick={() => handleRemoveTask(index)}
              />
            </HStack>
          </Box>
        ))}
        <Button
          leftIcon={<AddIcon />}
          colorScheme="teal"
          onClick={handleAddTask}
        >
          Add Task
        </Button>
      </VStack>
      <Button mt={4} colorScheme="green" onClick={onSave}>
        {isEditing ? "Update Sprint" : "Save Sprint"}
      </Button>
    </>
  );
};

export default SprintForm;
