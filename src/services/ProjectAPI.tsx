import { Project } from "../interfaces/Project";
import { api } from "./api";

//For Projects

export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get("/api/project");
  return response.data;
};

export const createProject = async (projectData: Project): Promise<Project> => {
  return api.post("/api/project", projectData);
};

export const addMemberToProjectAPI = async (
  projectId: number,
  memberId: number
): Promise<void> => {
  console.log(projectId, memberId);
  const response = await api.put(`/api/project/${projectId}/add-member`, {
    memberId,
  });
};

export const deleteMemberFromProjectAPI = async (
  projectId: number,
  memberId: number
): Promise<void> => {
  console.log(projectId, memberId);
  const response = await api.delete(`/api/project/${projectId}/remove-member`, {
    data: { memberId },
  });
  console.log(response.data); // Log the response to verify
};
