import { Deadline } from "./Deadline";
import { Sprint } from "./Sprint";
import { WorkLog } from "./WorkLog";

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
    workLogs?: WorkLog[];
}

