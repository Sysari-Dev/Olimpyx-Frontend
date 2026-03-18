export type EventStatus = 'PLANNING' | 'ACTIVE' | 'COMPLETED';

export interface SportEvent {
  id: string;
  title: string;
  location: string;
  dateRange: string;
  status: EventStatus;
  tournamentCount: number;
  image?: string;
}