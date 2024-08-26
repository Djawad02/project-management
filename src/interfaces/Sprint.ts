export interface Sprint {
    id: number;
    projectId: number;
    sprintTitle: string;
    startDate: string; // ISO date string
    endDate: string; // ISO date string
    description: string;
    status: string;
  }