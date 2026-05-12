import { type ApiResponse } from "@api/interfaces/api-response.interface";

export interface TeamResponseDTO {
  id: string;
  organizationId: string;
  name: string;
  status: 'ACTIVE' | 'INACTIVE';
  _count?: {
    tournamentTeams: number;
  };
}

export interface PaginatedMeta {
  total: number;
  page: number;
  limit: number;
  lastPage: number;
}

export interface TeamListResponse {
  items: TeamResponseDTO[];
  meta: PaginatedMeta;
}

export interface CreateTeamRequestDTO {
  organizationId: string;
  name: string;
}

export interface UpdateTeamRequestDTO {
  name: string;
}

export interface ChangeTeamStatusRequestDTO {
  status: 'ACTIVE' | 'INACTIVE';
}

export type TeamApiResponse = ApiResponse<TeamResponseDTO>;
export type TeamListApiResponse = ApiResponse<TeamListResponse>;