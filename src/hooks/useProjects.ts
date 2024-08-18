import { useEffect, useState } from "react";
import projects from "../data/projects";

export interface Project {
    id: number;
    title: string;
    description: string;
    status: string;
  }

const useProjects = () =>{
    const [projectList, setProjectLists] = useState<Project[]>([])
    const [error, setError] = useState("")
    useEffect(() => {
        // Simulate fetching data
        setProjectLists(projects) }, []);
    
    return {projectList,error}
}

export default useProjects;