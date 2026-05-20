import { api } from "@api/HttpInterceptor";
import { 
  type TeamApiResponse, 
  type TeamListApiResponse,
  type CreateTeamRequestDTO,
  type UpdateTeamRequestDTO,
  type ChangeTeamStatusRequestDTO
} from "../models/team-api.model";

export const TeamService = {
  getAll: async (organizationId: string): Promise<TeamListApiResponse> => {
    const { data } = await api.get<TeamListApiResponse>(`/team`, {
      params: { organizationId }
    });
    return data;
  },

  create: async (payload: CreateTeamRequestDTO): Promise<TeamApiResponse> => {
    const { data } = await api.post<TeamApiResponse>("/team", payload);
    return data;
  },

  update: async (id: string, payload: UpdateTeamRequestDTO): Promise<TeamApiResponse> => {
    const { data } = await api.patch<TeamApiResponse>(`/team/${id}`, payload);
    return data;
  },

  changeStatus: async (id: string, status: 'ACTIVE' | 'INACTIVE'): Promise<TeamApiResponse> => {
    const payload: ChangeTeamStatusRequestDTO = { status };
    const { data } = await api.patch<TeamApiResponse>(`/team/${id}/status`, payload);
    return data;
  }
};