import { type ApiResponse } from "@api/interfaces/api-response.interface";

export type EventStatus = 'PLANNING' | 'ACTIVE' | 'COMPLETED';

export interface EventResponseDTO {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  location: string;
  start_date: string;
  end_date: string;
  status: EventStatus;
  createdAt: string;
  updatedAt: string;
  tournaments?: TournamentInEventDTO[];
}

interface TournamentInEventDTO {
    id: string;
    eventId: string;
    sportId: string;
    name: string;
    format: string;
    pointsPerWin: number;
    pointsPerDraw: number;
    pointsPerLoss: number;
    status: string;
    createdAt: string;
    sport: {
        id: string;
        name: string,
        description: string
    }
}

export interface EventStatsResponseDTO {
  totalTournaments: number;
  totalTeams: number;
  remainingMatches: number;
}

export interface CreateEventRequestDTO {
  organizationId: string;
  name: string;
  description: string;
  location: string;
  start_date: string;
  end_date: string;
}

export interface UpdateEventRequestDTO {
  name?: string;
  description?: string;
  location?: string;
  start_date?: string;
  end_date?: string;
}

export interface ChangeEventStatusRequestDTO {
  status: EventStatus;
}

export type EventApiResponse = ApiResponse<EventResponseDTO>;
export type EventListApiResponse = ApiResponse<EventResponseDTO[]>;
export type EventStatsApiResponse = ApiResponse<EventStatsResponseDTO>;