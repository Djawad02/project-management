import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { User } from "../interfaces/User";

const useUser = (): User | null => {
  const { user } = useContext(AuthContext);
  return user || null; // Return the full user object, or null if not available
};

export default useUser;