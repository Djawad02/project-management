import React from "react";
import { Box, Text, Button, HStack } from "@chakra-ui/react";
import { Deadline } from "../../interfaces/Deadline";

interface DeadlineListProps {
  deadlines: Deadline[];
  onEdit: (deadline: Deadline) => void;
  onRemove: (id: number) => void;
}

const DeadlineList = ({ deadlines, onEdit, onRemove }: DeadlineListProps) => {
  return (
    <>
      {deadlines.length > 0 ? (
        <div>
          <Text mt={4} fontWeight="bold">
            Project Deadlines:
          </Text>
          {deadlines.map((deadline) => (
            <Box
              key={deadline.projectId}
              mt={2}
              p={4}
              borderWidth={1}
              borderRadius="md"
              bg="gray.50"
            >
              <Text>
                Due Date: {new Date(deadline.deadlineDate).toLocaleDateString()}
              </Text>
              <Text>Description: {deadline.description}</Text>
              <HStack mt={2} spacing={4}>
                <Button colorScheme="blue" onClick={() => onEdit(deadline)}>
                  Edit Deadline
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => onRemove(deadline.projectId)}
                >
                  Remove Deadline
                </Button>
              </HStack>
            </Box>
          ))}
        </div>
      ) : (
        <Text>No deadlines available for this project.</Text>
      )}
    </>
  );
};

export default DeadlineList;
