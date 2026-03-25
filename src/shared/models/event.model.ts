import type { Organization } from "./organization.model";


export type EventStatus = 'PLANNED' | 'ACTIVE' | 'FINISHED';

export interface SportEvent {
  id: string;
  name: string;
  description?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  status: EventStatus;
  organization?: Organization;
  tournamentCount?: number;
}