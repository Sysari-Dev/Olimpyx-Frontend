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

export type PublicEventsResponse = ApiResponse<PublicEvent[]>;