// WorkLogView.tsx

import React, { useState } from "react";
import { Box, Select, Text } from "@chakra-ui/react";
import useProjectStore from "../store/useProjectStore";
import { workLogs } from "../data/worklog";
import TableComponent from "../components/TableComponent";
import DetailsBox from "../components/DetailsBox";
import useUser from "../hooks/useUser";
import EmployeeWorkLogs from "./EmployeeWorkLogs";

const WorkLogs = () => {
  const user = useUser();
  const userRole = user?.role;
  const { projectList } = useProjectStore();
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );

  const columns = [
    { header: "Member ID", accessor: "memberId" },
    { header: "Date", accessor: "date" },
    { header: "Hours Worked", accessor: "hoursWorked" },
    { header: "Work Logs", accessor: "description" },
  ];

  const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProjectId(Number(event.target.value));
  };

  const getTotalHours = (projectId: number) => {
    return workLogs
      .filter((log) => log.projectId === projectId)
      .reduce((total, log) => total + log.hoursWorked, 0);
  };

  const filteredLogs = workLogs.filter(
    (log) => log.projectId === selectedProjectId
  );

  return (
    <DetailsBox showSearchBar={false} title="Work Logs">
      <Select placeholder="Select project" onChange={handleProjectChange}>
        {projectList.map((project) => (
          <option key={project.id} value={project.id}>
            {project.title}
          </option>
        ))}
      </Select>

      {selectedProjectId && (
        <>
          <Text fontSize="lg" mt={4} mb={4}>
            Total Hours on Project: {getTotalHours(selectedProjectId)} hours
          </Text>

          {/* Conditionally render the WorkLogForm for non-admin users */}
          {userRole !== "Admin" && (
            <EmployeeWorkLogs projectId={selectedProjectId} />
          )}
          {(userRole == "Admin" || userRole == "TeamLead") && (
            <TableComponent
              columns={columns}
              data={filteredLogs}
              borderColor="blue.900"
              colorScheme="gray"
              width="100%"
            />
          )}
        </>
      )}
    </DetailsBox>
  );
};

export default WorkLogs;
