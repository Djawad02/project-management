import employees from "../data/employee";
import { Employee } from "../interfaces/Employee";

export const aggregateDesignations = (employees: Employee[]) => {
  return employees.reduce((acc, employee) => {
    acc[employee.designation] = (acc[employee.designation] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};
