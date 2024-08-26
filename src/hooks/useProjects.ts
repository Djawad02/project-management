// useProjects.ts
import { useState } from "react";
import initialProjectList from "../data/projects"; // Assume initial data comes from a separate file

const useProjects = () => {
  const [projectList, setProjectList] = useState(initialProjectList);

  const updateProjectMembers = (projectId: number, updatedMembers: number[]) => {
    setProjectList((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? { ...project, members: updatedMembers } // Creates a new object with updated members
          : project
      )
    );
  };

  return {
    projectList,
    updateProjectMembers,
  };
};

export default useProjects;
