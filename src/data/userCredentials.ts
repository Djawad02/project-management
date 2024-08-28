import { User } from "../interfaces/User";

export const users: User[] = [
    {
      id: 0,
      username: 'adminUser',
      password: 'admin',
      role: 'Admin',
    },
    {
      id: 1,
      username: 'leadUser',
      password: 'lead',
      role: 'TeamLead',
      assignedProjects: [1, 7,11,13,14],
    },
    {
      id: 2,
      username: 'dania',
      password: 'dania',
      role: 'Employee',
      assignedProjects: [1,2,4,10,12,13,14,15],
    },
  ];
  