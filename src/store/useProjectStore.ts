import { create } from 'zustand';
import { Project } from '../interfaces/Project';
import { Employee } from '../interfaces/Employee';
import { addMemberToProjectAPI, deleteMemberFromProjectAPI, getProjects } from "../services/ProjectAPI"; // Your API function to get projects
import { getAllEmployees } from '../services/EmployeeAPI'; // Example function for employees

// Define the interface for the project store
interface ProjectStore {
    projectList: Project[];
    employeeList: Employee[];
    setProjectList: (projects: Project[]) => void;
    setEmployeeList: (employees: Employee[]) => void;
    fetchProjects: () => Promise<void>;  // Function to fetch projects from DB
    fetchEmployees: () => Promise<void>; // Function to fetch employees from DB
    updateProjectMembers: (projectId: number, newMembers: number[]) => void;
    addMemberToProject: (projectId: number, memberId: number) => void;
    deleteMemberFromProject: (projectId: number, memberId: number) => void;
    addProject: (project: Project) => void;
    removeProject: (projectId: number) => void;
    updateProject: (project: Project) => void;
    editMemberToProject: (memberId: number, updatedEmployee: Employee) => void;
}

// Create the Zustand store
const useProjectStore = create<ProjectStore>((set) => ({
    projectList: [], // Start with an empty array
    employeeList: [],

    // Method to set the fetched project list
    setProjectList: (projects) => set({ projectList: projects }),

    // Method to set the fetched employee list
    setEmployeeList: (employees) => set({ employeeList: employees }),

    // Function to fetch projects from MongoDB
    fetchProjects: async () => {
        try {
            const projects = await getProjects(); // Fetch projects via API
            set({ projectList: projects }); // Update Zustand state with fetched data
            console.log("Fetched Projects:", projects);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    },

    // Function to fetch employees from MongoDB (optional)
    fetchEmployees: async () => {
        try {
            const employees = await getAllEmployees(); // Fetch employees via API
            set({ employeeList: employees }); // Update Zustand state with fetched data
            console.log("Fetched Employees:", employees);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    },
    

    // Other actions such as updating members, adding/removing projects
    updateProjectMembers: (projectId, newMembers) => {
        set((state) => {
            const updatedProjects = state.projectList.map((project) =>
                project.id === projectId ? { ...project, members: newMembers } : project
            );
            return { projectList: updatedProjects };
        });
    },

    addMemberToProject: async (projectId, memberId) => {
        try {
          // Call the API to add the member in the backend
          await addMemberToProjectAPI(projectId, memberId);
          
          // Update local state after successful API call
          set((state) => {
            const updatedProjects = state.projectList.map((project) =>
              project.id === projectId 
                ? { ...project, members: [...project.members, memberId] } 
                : project
            );
            return { projectList: updatedProjects };
          });
        } catch (error) {
          console.error('Error adding member to project:', error);
        }
      },
      deleteMemberFromProject: async (projectId, memberId) => {
        try {
          // Call the API to delete the member in the backend
          await deleteMemberFromProjectAPI(projectId, memberId);
          
          // Update local state after successful API call
          set((state) => {
            const updatedProjects = state.projectList.map((project) =>
              project.id === projectId 
                ? { ...project, members: project.members.filter(id => id !== memberId) } 
                : project
            );
            return { projectList: updatedProjects };
          });
        } catch (error) {
          console.error('Error removing member from project:', error);
        }
      },      
    

    // Add a new project
    addProject: (project) => {
        set((state) => ({
            projectList: [...state.projectList, project]
        }));
    },

    // Remove a project
    removeProject: (projectId) => {
        set((state) => ({
            projectList: state.projectList.filter((project) => project.id !== projectId)
        }));
    },

    // Update project details
    updateProject: (project) => {
        set((state) => ({
            projectList: state.projectList.map((p) => (p.id === project.id ? project : p))
        }));
    },

    editMemberToProject: (memberId, updatedEmployee) => {
        set((state) => ({
            employeeList: state.employeeList.map((employee) =>
                employee.id === memberId ? updatedEmployee : employee
            )
        }));
    }
}));

export default useProjectStore;
