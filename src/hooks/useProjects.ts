import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import initialProjectList from "../data/projects"; // Your initial project data
import { Project } from "../interfaces/Project";

const useProjects = () => {
  const { user } = useContext(AuthContext);
  const [projectList, setProjectList] = useState<Project[]>(initialProjectList);

  useEffect(() => {
    if (user) {
      // Filter projects based on user role and assignments
      const filteredProjects = initialProjectList.filter((project) => {
        if (user.role === "Admin") {
          return true; // Admins see all projects
        }

        if (user.role === "TeamLead") {
          return (
            project.teamLead === user.id || project.members.includes(user.id)
          ); // Team leads see projects they are team leads of or members
        }

        if (user.role === "Employee") {
          return project.members.includes(user.id); // Employees see projects they are members of
        }

        return false;
      });

      setProjectList(filteredProjects);
    }
  }, [user]);

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
