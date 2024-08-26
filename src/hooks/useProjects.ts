import { useState } from "react";
import initialProjectList from "../data/projects"; // Your initial project data

const useProjects = () => {
  const [projectList, setProjectList] = useState(initialProjectList);

  // Function to update project members
  const updateProjectMembers = (projectId: number, newMembers: number[]) => {
    setProjectList((prevProjects) => {
      const updatedProjects = prevProjects.map((project) =>
        project.id === projectId ? { ...project, members: newMembers } : project
      );
      console.log("Updated Projects after modification:", updatedProjects); // Debugging
      return updatedProjects;
    });
  };

  return {
    projectList,
    updateProjectMembers,
  };
};

export default useProjects;
