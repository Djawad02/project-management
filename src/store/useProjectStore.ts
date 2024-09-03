import { create } from 'zustand'
import { Project } from '../interfaces/Project';
import initialProjectList from '../data/projects';
import initialEmployeeList from "../data/employee"; // Assuming initial employee data
import { Employee } from '../interfaces/Employee';
// Define the interface for the project store
interface ProjectStore {
    projectList: Project[];
    employeeList: Employee[];
    setProjectList: (projects: Project[]) => void;
    setEmployeeList: (employees: Employee[]) => void;
    updateProjectMembers: (projectId: number, newMembers: number[]) => void;
    addMemberToProject: (projectId:number,memberId:number) => void
    addProject: (project: Project) => void;
    removeProject: (projectId: number) => void;
    updateProject:(project: Project) => void
    editMemberToProject: ( memberId:number,UpdatedEmployee:Employee) =>void;
}

// Create the Zustand store
const useProjectStore = create<ProjectStore>((set) => ({
    projectList: initialProjectList,
    employeeList: initialEmployeeList,

    setProjectList: (projects) => set({ projectList: projects }),
    setEmployeeList: (employees) => set({ employeeList: employees }),

    updateProjectMembers: (projectId, newMembers) => {
      set((state) => {
        const updatedProjects = state.projectList.map((project) =>
          project.id === projectId ? { ...project, members: newMembers } : project
        );
        return { projectList: updatedProjects };
      });
    },
    addMemberToProject: (projectId, memberId) => {
        set((state) => {
          const updatedProjects = state.projectList.map((project) => {
            if (project.id === projectId && !project.members.includes(memberId)) {
              return { ...project, members: [...project.members, memberId] };
            }
            return project;
          });
          return { projectList: updatedProjects };
        });
      },
      editMemberToProject: ( memberId,UpdatedEmployee) =>{
        set((state) => ({
          employeeList: state.employeeList.map((emp) =>
            emp.id === memberId ? { ...emp, ...UpdatedEmployee } : emp
          ),
        }));
      }
      ,
      addProject: (project) => {
        set((state) => ({
            projectList: [...state.projectList, project],
        }));
    },
    removeProject: (projectId: number) => {
      set((state) => ({
        projectList: state.projectList.filter((project) => project.id !== projectId),
    }));
    },
    updateProject: (project:Project) =>{
      set((state) => ({
        projectList: state.projectList.map((pr) =>
          pr.id === project.id ? { ...pr, ...project } : pr
        ),
      }));
    },
     
  }))

export default useProjectStore;
