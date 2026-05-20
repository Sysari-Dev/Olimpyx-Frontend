import { api } from "@api/HttpInterceptor";
import { 
  type MatchListApiResponse, 
  type SingleMatchApiResponse,
  type FinalizeMatchApiResponse,
  type UpdateMatchMetadataRequestDTO,
  type UpdateMatchScoreRequestDTO,
  type FinalizeMatchRequestDTO
} from "../models/match-api.model";

export const MatchService = {
  getByTournament: async (tournamentId: string): Promise<MatchListApiResponse> => {
    const { data } = await api.get<MatchListApiResponse>(`/competition/matches?tournamentId=${tournamentId}`);
    return data;
  },

  getById: async (matchId: string): Promise<SingleMatchApiResponse> => {
    const { data } = await api.get<SingleMatchApiResponse>(`/competition/match/${matchId}`);
    return data;
  },

  updateMetadata: async (matchId: string, payload: UpdateMatchMetadataRequestDTO): Promise<SingleMatchApiResponse> => {
    const { data } = await api.patch<SingleMatchApiResponse>(`/competition/match/${matchId}/metadata`, payload);
    return data;
  },

  updateScore: async (payload: UpdateMatchScoreRequestDTO): Promise<SingleMatchApiResponse> => {
    const { data } = await api.post<SingleMatchApiResponse>('/competition/match/score', payload);
    return data;
  },

  finalize: async (payload: FinalizeMatchRequestDTO): Promise<FinalizeMatchApiResponse> => {
    const { data } = await api.post<FinalizeMatchApiResponse>('/competition/match/finalize', payload);
    return data;
  }
};