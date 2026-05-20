import { api } from "@api/HttpInterceptor";
import { type ApiResponse } from "@api/interfaces/api-response.interface";
import { type PublicEventsResponse } from "../models/public-api.model";

// Estas interfaces reflejan exactamente tu JSON de resultados
export interface TeamResult {
  teamId: string;
  teamName: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  goalDifference: number;
}

export interface GroupData {
  id: string;
  name: string;
  leaderboard: TeamResult[];
}

export interface MatchData {
  id: string;
  roundName: string;
  status: 'PENDING' | 'FINISHED' | 'LIVE' | 'IN_PROGRESS';
  team1: { name: string } | null;
  team2: { name: string } | null;
  scoreTeam1: number; // Agregado
  scoreTeam2: number; // Agregado
  sets: { pointsTeam1: number; pointsTeam2: number }[];
}

export interface TournamentResultsData {
  format: 'GROUP_STAGE' | 'ELIMINATION' | 'ROUND_ROBIN';
  groups?: GroupData[];
  matches?: MatchData[];
  leaderboard?: TeamResult[];
}

export interface LiveMatch {
  id: string;
  roundName: string;
  scoreTeam1: number;
  scoreTeam2: number;
  team1: { name: string };
  team2: { name: string };
  tournament: { name: string; sport: { name: string } };
  sets: { pointsTeam1: number; pointsTeam2: number }[];
}
export const PublicService = {
  // ... getEvents igual ...
    getEvents: async (): Promise<PublicEventsResponse> => {
    const { data } = await api.get<PublicEventsResponse>('/public/events');
    return data;
  },
  getResults: async (tournamentId: string): Promise<ApiResponse<TournamentResultsData>> => {
    const { data } = await api.get<ApiResponse<TournamentResultsData>>(`/public/tournament/${tournamentId}/results`);
    return data;
  },
  getLiveMatches: async (): Promise<ApiResponse<LiveMatch[]>> => {
    const { data } = await api.get<ApiResponse<LiveMatch[]>>('/public/matches/live');
    return data;
  }
};

