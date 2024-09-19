import { WorkLog } from "../interfaces/WorkLog";

export const workLogs: WorkLog[] = [
    { id: 1, projectId: 1, memberId: 1, date: '2024-08-01', hoursWorked: 8,description:"Did client meeting today" },
    { id: 2, projectId: 1, memberId: 2, date: '2024-08-01', hoursWorked: 8 ,description:"Implemented Sprint page"},
    { id: 3, projectId: 1, memberId: 3, date: '2024-08-02', hoursWorked: 8, description:"Add member functionality implemented" },
    { id: 4, projectId: 1, memberId: 4, date: '2024-08-02', hoursWorked: 8 , description:"Waiting for work to be assigned"},
  ];