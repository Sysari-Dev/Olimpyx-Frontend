import { api } from "@api/HttpInterceptor";
import { type DrawApiResponse, type DashboardApiResponse } from "../models/match-api.model";

export const CompetitionService = {
  
  // Endpoint para realizar el sorteo (generar partidos)
  generateDraw: async (tournamentId: string): Promise<DrawApiResponse> => {
    const { data } = await api.post<DrawApiResponse>(`/competition/tournament/${tournamentId}/draw`);
    return data;
  },

  getDashboard: async (tournamentId: string): Promise<DashboardApiResponse> => {
    const { data } = await api.get<DashboardApiResponse>(`/tournament/${tournamentId}/dashboard`);
    return data;
  }

};