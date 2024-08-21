
export interface Project {
    id: number;
    title: string;
    description: string;
    status: string;
    members:number[];
    source:string;
    teamLead:number
}

export interface ProjectDetailsProps {
    projects: Project[];
  }