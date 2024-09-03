import { create } from 'zustand'
import { Deadline } from '../interfaces/Deadline'; 
import initialProjectDeadline from "../data/deadline"
interface DeadlineStore {
  deadlines: Deadline[];
  addDeadline: (deadline: Deadline) => void;
  updateDeadline: (id: number, updatedDeadline: Partial<Deadline>) => void;
  removeDeadline: (id: number) => void;
}

const useDeadlineStore = create<DeadlineStore>((set) => ({
  deadlines:initialProjectDeadline,
  addDeadline: (deadline) => set((state) => ({
    deadlines: [...state.deadlines, deadline],
  })),
  updateDeadline: (id, updatedDeadline) => set((state) => ({
    deadlines: state.deadlines.map((deadline) =>
      deadline.id === id ? { ...deadline, ...updatedDeadline } : deadline
    ),
  })),
  removeDeadline: (id) => set((state) => ({
    deadlines: state.deadlines.filter((deadline) => deadline.id !== id),
  })),
}));

export default useDeadlineStore;
