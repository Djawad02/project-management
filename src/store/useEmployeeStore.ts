import { create } from 'zustand';
import { Project } from '../interfaces/Project';
import { Employee } from '../interfaces/Employee';
import { AddNewEmployee, DeleteEmployee, getAllEmployees } from '../services/EmployeeAPI';

interface EmployeeStore {
    projectList: Project[]; 
    employeeList: Employee[];
    setEmployeeList: (employees: Employee[]) => void;
    fetchEmployees: () => Promise<void>; 
    AddNewEmployeeOrg: (newEmployeeData: Omit<Employee, 'id'>, projectId: number) => Promise<void>; 
    DeleteEmployeeOrg: (memberId:number)=> Promise<void>; 
}

const useEmployeeStore = create<EmployeeStore>((set) => ({
    projectList: [], 
    employeeList: [], 

    setEmployeeList: (employees) => set({ employeeList: employees }),

    fetchEmployees: async () => {
        try {
            const employees = await getAllEmployees(); 
            set({ employeeList: employees }); 
            console.log("Fetched Employees:", employees);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    },

    AddNewEmployeeOrg: async (newEmployeeData: Omit<Employee, 'id'>, projectId: number) => {
        try {
            const newEmployee = await AddNewEmployee(newEmployeeData);
            
            set((state) => {
                const updatedProjects = state.projectList.map((project) =>
                    project.id === projectId
                        ? { ...project, members: [...project.members, newEmployee.id] } 
                        : project
                );
                return { projectList: updatedProjects };
            });
        } catch (error) {
            console.error("Error adding member to project:", error);
        }
    },
    DeleteEmployeeOrg: async (memberId: number) => {
        try {
            await DeleteEmployee(memberId);
    
            set((state) => {
                const updatedProjects = state.projectList.map((project) => ({
                    ...project,
                    members: project.members.filter(id => id !== memberId)
                }));
                return { projectList: updatedProjects };
            });
        } catch (error) {
            console.error("Error deleting member from organization:", error);
        }
    },
    
}));

export default useEmployeeStore;
