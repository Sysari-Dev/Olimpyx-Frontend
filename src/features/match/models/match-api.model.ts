import { type MatchStatus } from "@models/match.model";
// 1. Agregamos esta importación arriba
import { type ApiResponse } from "@api/interfaces/api-response.interface";

export interface MatchTeamDTO {
  id: string;
  organizationId: string;
  name: string;
  status: string;
}

export interface MatchResponseDTO {
  id: string;
  tournamentId: string;
  stageId: string | null;
  groupId: string | null;
  roundName: string;
  
  team1Id: string | null;
  team2Id: string | null;
  
  team1: MatchTeamDTO | null;
  team2: MatchTeamDTO | null;
  
  scoreTeam1: number;
  scoreTeam2: number;
  winnerId: string | null;
  
  status: MatchStatus | string;
  matchDate: string | null;
  
  parentMatch1: string | null;
  parentMatch2: string | null;
}

// 2. AGREGAMOS ESTO AL FINAL:
// Esto es lo que usa el Service para saber qué le responde el backend
export type DrawApiResponse = ApiResponse<MatchResponseDTO[]>;

export interface LeaderboardEntryDTO {
  id: string;
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

export interface GroupLeaderboardEntryDTO {
  id: string;
  groupId: string;
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
  team?: {           // 👈 aquí está la diferencia — objeto anidado
    id: string;
    organizationId: string;
    name: string;
    status: string;
  };
}

export interface GroupDTO {
  id: string;
  name: string;
  qualifiedCount: number;
  leaderboard: GroupLeaderboardEntryDTO[];
  matches: MatchResponseDTO[];
}


export interface DashboardApiResponse {
  success: boolean;
  data: {
    format: "ELIMINATION" | "ROUND_ROBIN" | "GROUP_STAGE";
    matches?: MatchResponseDTO[];       // ELIMINATION y GROUP_STAGE
    leaderboard?: LeaderboardEntryDTO[]; // ROUND_ROBIN
    groups?: GroupDTO[];                 // GROUP_STAGE
  };
}