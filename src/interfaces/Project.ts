import { Deadline } from "./Deadline";
import { Sprint } from "./Sprint";

export interface Project {
    id: number;
    title: string;
    description: string;
    status: string;
    members:number[];
    source:string;
    teamLead:number;
    deadlines?: Deadline[]; // Optional field for deadlines
    sprints?: Sprint[]; 
}

export interface ProjectDetailsProps {
    projects: Project[];
  }