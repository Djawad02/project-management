import { create } from 'zustand'
import { Sprint } from "../interfaces/Sprint";
import { Task } from "../interfaces/Task";
import initialSprintList from "../data/sprint"
interface SprintStore {
    sprints: Sprint[];
    selectedSprintId: number | null;
    addSprint: (sprint: Sprint) => void;
    updateSprint: (id: number, updatedSprint: Sprint) => void;
    removeSprint: (id: number) => void;
    addTaskToSprint: (sprintId: number, task: Task) => void;
    updateTaskInSprint: (sprintId: number, taskId: number, updatedTask: Task) => void;
    removeTaskFromSprint: (sprintId: number, taskId: number) => void;
    setSelectedSprintId: (id: number | null) => void;
  }

const useSprintStore = create<SprintStore>((set) =>({
    sprints:initialSprintList,
    selectedSprintId: null,
    setSelectedSprintId: (id) => set({ selectedSprintId: id }),
    addSprint: (sprint) => set((state) => ({
        sprints: [...state.sprints, sprint],
      })),
      updateSprint: (id, updatedSprint) => set((state) => ({
        sprints: state.sprints.map((sprint) =>
          sprint.id === id ? { ...sprint, ...updatedSprint } : sprint
        ),
      })),
      removeSprint: (id) => set((state) => ({
        sprints: state.sprints.filter((sprint) => sprint.id !== id),
      })),
    
    addTaskToSprint: (sprintId, task) => set((state) => ({
        sprints: state.sprints.map((sprint) =>
          sprint.id === sprintId
            ? { ...sprint, task: [...sprint.task, task] }
            : sprint
        ),
      })),
    
    updateTaskInSprint: (sprintId, taskId, updatedTask) => set((state) => ({
        sprints: state.sprints.map((sprint) =>
          sprint.id === sprintId
            ? {
                ...sprint,
                task: sprint.task.map((task) =>
                  task.id === taskId ? { ...task, ...updatedTask } : task
                ),
              }
            : sprint
        ),
      })),
    
    removeTaskFromSprint: (sprintId, taskId) => set((state) => ({
        sprints: state.sprints.map((sprint) =>
          sprint.id === sprintId
            ? { ...sprint, task: sprint.task.filter((task) => task.id !== taskId) }
            : sprint
        ),
      })),
}));

export default useSprintStore;