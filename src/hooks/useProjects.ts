import { useState } from "react";
import initialProjectList from "../data/projects";

const useProjects = () => {
  const [projectList, setProjectList] = useState(initialProjectList);

  const updateProjectMembers = (projectId: number, newMembers: number[]) => {
    setProjectList((prevProjects) => {
      const updatedProjects = prevProjects.map((project) =>
        project.id === projectId
          ? { ...project, members: newMembers }
          : project
      );
      return updatedProjects;
    });
  };

  return {
    projectList,
    updateProjectMembers,
  };
};

export default useProjects;
