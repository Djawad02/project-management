export interface User {
    id: number;
    username: string;
    password:string;
    role: 'Admin' | 'TeamLead' | 'Employee';
    assignedProjects?: number[]; // List of project IDs the user is assigned to
  }
  