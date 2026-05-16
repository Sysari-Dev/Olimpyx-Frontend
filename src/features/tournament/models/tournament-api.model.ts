import { type ApiResponse } from "@api/interfaces/api-response.interface";

export type TournamentStatus = 'PLANNING' | 'ACTIVE' | 'COMPLETED' | 'INACTIVE';
export type TournamentFormat = 'ROUND_ROBIN' | 'ELIMINATION' | 'GROUP_STAGE';

export interface TournamentResponseDTO {
  id: string;
  eventId: string;
  sportId: string;
  name: string;
  format: TournamentFormat;
  pointsPerWin: number;
  pointsPerDraw: number;
  pointsPerLoss: number;
  status: TournamentStatus;
  createdAt: string;
  sport?: {
    id: string;
    name: string;
    description: string;
  };
  event?: {
    name: string;
    organizationId: string;
  };
  _count?: {
    teams: number;
    stages: number;
    matches: number;
  };
}

export interface CreateTournamentRequestDTO {
  eventId: string;
  sportId: string;
  name: string;
  format: TournamentFormat | string;
  isHomeAndAway: boolean;
  groupsCount: number;
  qualifiersPerGroup: number;
  pointsPerWin: number;
  pointsPerDraw: number;
  pointsPerLoss: number;
  teamIds: string[];
}

export interface UpdateTournamentRequestDTO {
  name?: string;
  format?: string;
  pointsPerWin?: number;
  pointsPerDraw?: number;
  pointsPerLoss?: number;
}

export interface RegisterTeamsRequestDTO {
  teamIds: string[];
}

export interface TeamInTournamentDTO {
  id: string;
  name: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface TournamentTeamRegistrationDTO {
  id: string;
  tournamentId: string;
  teamId: string;
}

export type TournamentApiResponse = ApiResponse<TournamentResponseDTO>;
export type TournamentListApiResponse = ApiResponse<TournamentResponseDTO[]>;
export type TournamentTeamsApiResponse = ApiResponse<TeamInTournamentDTO[]>;
export type RegisterTeamsApiResponse = ApiResponse<TournamentTeamRegistrationDTO[]>;