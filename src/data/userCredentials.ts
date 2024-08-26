import { User } from "../interfaces/User";

export const users: User[] = [
    {
      id: 1,
      username: 'adminUser',
      password: 'admin',
      role: 'Admin',
    },
    {
      id: 2,
      username: 'leadUser',
      password: 'lead',
      role: 'TeamLead',
      assignedProjects: [1, 2], // Example project IDs
    },
    {
      id: 3,
      username: 'dania',
      password: 'dania',
      role: 'Employee',
      assignedProjects: [1],
    },
  ];
  