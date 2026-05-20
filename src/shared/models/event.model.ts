import { type EventStatus } from "@features/events/models/event-api.model";

export interface EventStats {
  totalTournaments: number;
  totalTeams: number;
  remainingMatches: number;
}

export interface Event {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  status: EventStatus;
  createdAt: string;
  updatedAt: string;
  stats?: EventStats;
}