import { Employee } from "../interfaces/Employee";
import { Project } from "../interfaces/Project";

export const aggregateProjectDesignations = (
  employees: Employee[],
  project: Project
) => {
  // Filter employees based on project members
  const filteredEmployees = employees.filter((employee) =>
    project.members.includes(employee.id)
  );

  // Aggregate designations for the filtered employees
  const designationCounts: { [key: string]: number } = {};

  filteredEmployees.forEach((employee) => {
    if (designationCounts[employee.designation]) {
      designationCounts[employee.designation]++;
    } else {
      designationCounts[employee.designation] = 1;
    }
  });

  return designationCounts;
};
