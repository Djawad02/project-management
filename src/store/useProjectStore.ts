import { create } from 'zustand';
import { Project } from '../interfaces/Project';
import { Employee } from '../interfaces/Employee';
import { addMemberToProjectAPI, deleteMemberFromProjectAPI, getProjects } from "../services/ProjectAPI";
import { getAllEmployees } from '../services/EmployeeAPI'; 

interface ProjectStore {
    projectList: Project[];
    employeeList: Employee[];
    setProjectList: (projects: Project[]) => void;
    setEmployeeList: (employees: Employee[]) => void;
    fetchProjects: () => Promise<void>;  
    fetchEmployees: () => Promise<void>; 
    updateProjectMembers: (projectId: number, newMembers: number[]) => void;
    addMemberToProject: (projectId: number, memberId: number) => void;
    deleteMemberFromProject: (projectId: number, memberId: number) => void;
    addProject: (project: Project) => void;
    removeProject: (projectId: number) => void;
    updateProject: (project: Project) => void;
    editMemberToProject: (memberId: number, updatedEmployee: Employee) => void;
}

const useProjectStore = create<ProjectStore>((set) => ({
    projectList: [], 
    employeeList: [],

    setProjectList: (projects) => set({ projectList: projects }),

    setEmployeeList: (employees) => set({ employeeList: employees }),

    fetchProjects: async () => {
        try {
            const projects = await getProjects(); 
            set({ projectList: projects }); 
            console.log("Fetched Projects:", projects);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    },

    fetchEmployees: async () => {
        try {
            const employees = await getAllEmployees(); 
            set({ employeeList: employees }); 
            console.log("Fetched Employees:", employees);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    },
    
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
          await addMemberToProjectAPI(projectId, memberId);
          
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
          await deleteMemberFromProjectAPI(projectId, memberId);
          
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
    
    addProject: (project) => {
        set((state) => ({
            projectList: [...state.projectList, project]
        }));
    },

    removeProject: (projectId) => {
        set((state) => ({
            projectList: state.projectList.filter((project) => project.id !== projectId)
        }));
    },

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
