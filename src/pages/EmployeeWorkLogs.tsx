// WorkLogForm.tsx

import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import useUser from "../hooks/useUser"; // Assuming you have a hook to get the current user

interface WorkLogProps {
  projectId: number;
}

const EmployeeWorkLogs = ({ projectId }: WorkLogProps) => {
  const user = useUser(); // Assuming this returns the current logged-in user
  const [newLog, setNewLog] = useState({
    projectId: projectId,
    memberId: user?.id,
    date: "",
    hoursWorked: 0,
    description: "",
  });

  const handleLogInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLog({
      ...newLog,
      [name]: name === "hoursWorked" ? Number(value) : value,
    });
  };

  const handleSubmitLog = () => {
    if (newLog.projectId && newLog.date && newLog.hoursWorked > 0) {
      setNewLog({
        projectId: projectId,
        memberId: user?.id,
        date: "",
        hoursWorked: 0,
        description: "",
      });
    }
  };

  return (
    <Box as="form" mt={4} mb={4}>
      <FormControl mb={4}>
        <FormLabel>Date</FormLabel>
        <Input
          type="date"
          name="date"
          value={newLog.date}
          onChange={handleLogInputChange}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Hours Worked</FormLabel>
        <Input
          type="number"
          name="hoursWorked"
          value={newLog.hoursWorked}
          onChange={handleLogInputChange}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Description</FormLabel>
        <Input
          type="text"
          name="description"
          value={newLog.description}
          onChange={handleLogInputChange}
        />
      </FormControl>
      <Button colorScheme="blue" onClick={handleSubmitLog}>
        Submit Log
      </Button>
    </Box>
  );
};

export default EmployeeWorkLogs;
