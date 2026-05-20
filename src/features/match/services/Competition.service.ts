import { api } from "@api/HttpInterceptor";
import { type DrawApiResponse, type DashboardApiResponse } from "../models/competition-api.model";

export const CompetitionService = {
  getDashboard: async (tournamentId: string): Promise<DashboardApiResponse> => {
    const { data } = await api.get<DashboardApiResponse>(`/tournament/${tournamentId}/dashboard`);
    return data;
  },
  
  generateDraw: async (tournamentId: string): Promise<DrawApiResponse> => {
    const { data } = await api.post<DrawApiResponse>(`/competition/tournament/${tournamentId}/draw`);
    return data;
  },
};