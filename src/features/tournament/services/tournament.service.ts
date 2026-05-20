import { api } from "@api/HttpInterceptor";
import { 
  type TournamentApiResponse, 
  type TournamentListApiResponse,
  type TournamentTeamsApiResponse,
  type CreateTournamentRequestDTO,
  type UpdateTournamentRequestDTO,
  type RegisterTeamsRequestDTO,
  type TournamentStatus,
  type RegisterTeamsApiResponse
} from "../models/tournament-api.model";
import type { ApiResponse } from "@api/interfaces/api-response.interface";

export const TournamentService = {
  getByEvent: async (eventId: string): Promise<TournamentListApiResponse> => {
    const { data } = await api.get<TournamentListApiResponse>("/tournament", {
      params: { eventId }
    });
    return data;
  },

  getById: async (id: string): Promise<TournamentApiResponse> => {
    const { data } = await api.get<TournamentApiResponse>(`/tournament/${id}`);
    return data;
  },

  create: async (payload: CreateTournamentRequestDTO): Promise<TournamentApiResponse> => {
    const { data } = await api.post<TournamentApiResponse>("/tournament", payload);
    return data;
  },

  update: async (id: string, payload: UpdateTournamentRequestDTO): Promise<TournamentApiResponse> => {
    const { data } = await api.patch<TournamentApiResponse>(`/tournament/${id}`, payload);
    return data;
  },

  changeStatus: async (id: string, status: TournamentStatus): Promise<TournamentApiResponse> => {
    const { data } = await api.patch<TournamentApiResponse>(`/tournament/${id}/status`, { status });
    return data;
  },

  registerTeams: async (id: string, payload: RegisterTeamsRequestDTO): Promise<RegisterTeamsApiResponse> => {
    const { data } = await api.post<RegisterTeamsApiResponse>(
      `/tournament/${id}/register-teams`, 
      payload
    );
    return data;
  },

  unregisterTeam: async (tournamentId: string, teamId: string): Promise<ApiResponse<null>> => {
    const { data } = await api.delete<ApiResponse<null>>(
      `/tournament/${tournamentId}/unregister-team/${teamId}`
    );
    return data;
  },

  getRegisteredTeams: async (id: string): Promise<TournamentTeamsApiResponse> => {
    const { data } = await api.get<TournamentTeamsApiResponse>(`/tournament/${id}/teams`);
    return data;
  },

  getAvailableTeams: async (id: string): Promise<TournamentTeamsApiResponse> => {
    const { data } = await api.get<TournamentTeamsApiResponse>(`/tournament/${id}/available-teams`);
    return data;
  }
};