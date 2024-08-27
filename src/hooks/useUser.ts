import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useUser = () => {
  const { user } = useContext(AuthContext);
  const userRole = user?.role || ""; 

  return userRole;
};

export default useUser;