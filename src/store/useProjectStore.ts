import { create } from 'zustand'
import { Project } from '../interfaces/Project';
import initialProjectList from '../data/projects';
import initialEmployeeList from "../data/employee"; // Assuming initial employee data
import { Employee } from '../interfaces/Employee';
import { Sprint } from '../interfaces/Sprint';
import { Deadline } from '../interfaces/Deadline';
import initialSprintList from '../data/sprint';  // Assuming initial sprint data
import initialDeadlineList from '../data/deadline';
// Define the interface for the project store
interface ProjectStore {
    projectList: Project[];
    employeeList: Employee[];
    sprintList: Sprint[];
    deadlineList: Deadline[];
    setProjectList: (projects: Project[]) => void;
    setEmployeeList: (employees: Employee[]) => void;
    setSprintList: (sprints: Sprint[]) => void;
    setDeadlineList: (deadlines: Deadline[]) => void;
    updateProjectMembers: (projectId: number, newMembers: number[]) => void;
    addMemberToProject: (projectId:number,memberId:number) => void
    addProject: (project: Project) => void;
    removeProject: (projectId: number) => void;
    addSprint: (sprint: Sprint) => void;
    updateSprint: (sprintId: number, updatedSprint: Sprint) => void;
    removeSprint: (sprintId: number) => void;
    addDeadline: (deadline: Deadline) => void;
    updateDeadline: (deadlineId: number, updatedDeadline: Deadline) => void;
    removeDeadline: (deadlineId: number) => void;
    editMemberToProject: ( memberId:number,UpdatedEmployee:Employee) =>void;
}

// Create the Zustand store
const useProjectStore = create<ProjectStore>((set) => ({
    projectList: initialProjectList,
    employeeList: initialEmployeeList,
    sprintList: initialSprintList,
    deadlineList: initialDeadlineList,

    setProjectList: (projects) => set({ projectList: projects }),
    setEmployeeList: (employees) => set({ employeeList: employees }),
    setSprintList: (sprints) => set({ sprintList: sprints }),
    setDeadlineList: (deadlines) => set({ deadlineList: deadlines }),

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
     addSprint: (sprint) => {
      set((state) => ({
          sprintList: [...state.sprintList, sprint],
      }));
     },
     updateSprint: (sprintId, updatedSprint) => {
      set((state) => ({
          sprintList: state.sprintList.map((sprint) =>
              sprint.id === sprintId ? updatedSprint : sprint
          ),
        }));
      },
    removeSprint: (sprintId) => {
      set((state) => ({
          sprintList: state.sprintList.filter((sprint) => sprint.id !== sprintId),
       }));
     },
    addDeadline: (deadline) => {
      set((state) => ({
          deadlineList: [...state.deadlineList, deadline],
        }));
     },
    updateDeadline: (deadlineId, updatedDeadline) => {
      set((state) => ({
          deadlineList: state.deadlineList.map((deadline) =>
              deadline.projectId === deadlineId ? updatedDeadline : deadline
          ),
       }));
     },
     removeDeadline: (deadlineId) => {
      set((state) => ({
          deadlineList: state.deadlineList.filter((deadline) => deadline.projectId !== deadlineId),
        }));
     },
  }))

export default useProjectStore;
