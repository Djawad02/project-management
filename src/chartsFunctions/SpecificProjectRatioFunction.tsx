import { Employee } from "../interfaces/Employee";
import { Project } from "../interfaces/Project";

export const aggregateProjectDesignations = (
  employees: Employee[],
  project: Project
) => {
  if (!employees || !Array.isArray(employees)) {
    console.warn(
      "Invalid employee list passed to aggregateProjectDesignations:",
      employees
    );
    return {};
  }

  if (!project || !Array.isArray(project.members)) {
    console.warn(
      "Invalid project passed to aggregateProjectDesignations:",
      project
    );
    return {};
  }

  const projectMemberIds = Array.from(
    new Set(project.members.map((member) => member.id))
  );

  console.log("Project Member IDs:", projectMemberIds);

  const filteredEmployees = employees.filter((employee) =>
    projectMemberIds.includes(employee.id)
  );

  console.log("Filtered Employees:", filteredEmployees);

  const designationCounts: { [key: string]: number } = {};

  filteredEmployees.forEach((employee) => {
    console.log("Aggregating for employee:", employee);
    if (designationCounts[employee.designation]) {
      designationCounts[employee.designation]++;
    } else {
      designationCounts[employee.designation] = 1;
    }
  });
  console.log("Designation Counts:", designationCounts);
  return designationCounts;
};
