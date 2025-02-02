import { Employee } from "../interfaces/Employee";
import { api } from "./api";

//For Employee

export const getAllEmployees = async (): Promise<Employee[]> => {
  const response = await api.get("/api/employee");
  return response.data;
};
export const getEmployees = async (title: string): Promise<Employee[]> => {
  const response = await api.get(`/api/project/${encodeURIComponent(title)}`);
  return response.data;
};

export const getEmployeeById = async (id: number): Promise<Employee> => {
  const response = await api.get(`/api/employee/${id}`);
  return response.data;
};

export const AddNewEmployee = async (
  newEmployeeData: Omit<Employee, "id">
): Promise<Employee> => {
  const response = await api.post(`/api/employee`, newEmployeeData);
  return response.data;
};

export const DeleteEmployee = async (memberId: number): Promise<Employee> => {
  const response = await api.delete(`/api/employee/${memberId}`);
  return response.data;
};
