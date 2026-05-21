import { type ApiResponse } from "@api/interfaces/api-response.interface";

export interface PublicTournamentBasic {
  id: string;
  name: string;
  format: 'ROUND_ROBIN' | 'ELIMINATION' | 'GROUP_STAGE' | string;
  status: 'PLANNING' | 'ACTIVE' | 'COMPLETED' | 'INACTIVE' | string;
}

export interface PublicEvent {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  location: string;
  start_date: string;
  end_date: string;
  status: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  tournaments: PublicTournamentBasic[];
}

export interface PublicOrganizationDTO {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  totalTeams: number;
  totalEvents: number;
}

export interface PublicOrganizationsResponse {
  success: boolean;
  message: {
    type: string;
    content: string;
  };
  data: PublicOrganizationDTO[];
}

export interface PublicMatchDetailResponse {
  id: string;
  tournamentId: string | null;
  stageId: string | null;
  groupId: string | null;
  team1Id: string | null;
  team2Id: string | null;
  scoreTeam1: number;
  scoreTeam2: number;
  winnerId: string | null;
  parentMatch1: string | null;
  parentMatch2: string | null;
  roundName: string | null;
  matchDate: string | null;
  status: 'PENDING' | 'IN_PROGRESS' | 'SUSPENDED' | 'FINISHED';
  team1: { id: string; organizationId: string; name: string; status: string } | null;
  team2: { id: string; organizationId: string; name: string; status: string } | null;
  sets: Array<{
    id: string;
    matchId: string;
    setNumber: number;
    pointsTeam1: number | null;
    pointsTeam2: number | null;
  }>;
  stage: { id: string; name: string | null; stageType: string | null } | null;
  group: { id: string; name: string | null } | null;
  tournament: {
    id: string;
    eventId: string;
    sportId: string;
    name: string;
    format: string | null;
    pointsPerWin: number;
    pointsPerDraw: number;
    pointsPerLoss: number;
    status: string;
    createdAt: string;
    sport: { id: string; name: string; description: string | null };
    event: {
      id: string;
      name: string;
      description: string | null;
      location: string | null;
      start_date: string;
      end_date: string;
    };
  } | null;
}

export interface PublicMatchDetailApiResponse {
  success: boolean;
  message: {
    type: string;
    content: string;
  };
  data: PublicMatchDetailResponse;
}

export type PublicEventsResponse = ApiResponse<PublicEvent[]>;
