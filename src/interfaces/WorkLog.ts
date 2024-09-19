export interface WorkLog {
    id: number;
    projectId: number;
    memberId: number;
    date: string;
    hoursWorked: number;
    description?:string;
  }