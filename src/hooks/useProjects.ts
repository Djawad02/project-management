import { useState } from "react";
import projectData from "../data/projects";

const useProjects = () => {
    const [projectList, setProjectList] = useState(projectData);
  
    const updateProjectMembers = (projectId: number, updatedMembers: number[]) => {
      const updatedProjects = projectList.map((project) =>
        project.id === projectId ? { ...project, members: updatedMembers } : project
      );
      setProjectList(updatedProjects);
    };
  
    return {
      projectList,
      updateProjectMembers,
    };
  };
  
  export default useProjects;
