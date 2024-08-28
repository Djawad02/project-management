import create from 'zustand';
import { User } from '../interfaces/User';

// Define the interface for the user store
interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Create the Zustand store
const useUserStore = create<UserStore>((set) => ({
  user: null,

  setUser: (user) => set({ user }),
}));

export default useUserStore;
