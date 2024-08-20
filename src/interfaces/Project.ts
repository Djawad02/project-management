import { Member } from "../components/ProjectMembers";

export interface Project {
    id: number;
    title: string;
    description: string;
    status: string;
    members:Member[];
}
