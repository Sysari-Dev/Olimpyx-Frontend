import { api } from "@api/HttpInterceptor";
import { type ApiResponse } from "@api/interfaces/api-response.interface";
import { type LiveMatch, type PublicEventsResponse, type PublicMatchDetailApiResponse, type PublicOrganizationsResponse, type TournamentResultsData } from "../models/public-api.model";

export const PublicService = {
  getEvents: async (): Promise<PublicEventsResponse> => {
    const { data } = await api.get<PublicEventsResponse>("/public/events");
    return data;
  },
  getResults: async (
    tournamentId: string,
  ): Promise<ApiResponse<TournamentResultsData>> => {
    const { data } = await api.get<ApiResponse<TournamentResultsData>>(
      `/public/tournament/${tournamentId}/results`,
    );
    return data;
  },
  getLiveMatches: async (): Promise<ApiResponse<LiveMatch[]>> => {
    const { data } = await api.get<ApiResponse<LiveMatch[]>>(
      "/public/matches/live",
    );
    return data;
  },

  getOrganizations: async (): Promise<PublicOrganizationsResponse> => {
    const { data } = await api.get<PublicOrganizationsResponse>('/public/organizations');
    return data;
  },

  getMatchDetail: async (matchId: string): Promise<PublicMatchDetailApiResponse> => {
    const { data } = await api.get<PublicMatchDetailApiResponse>(`/public/match/${matchId}`);
    return data;
  }
};
