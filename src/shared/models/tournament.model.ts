export type TournamentStatus = 'REGISTRATION' | 'IN_PROGRESS' | 'FINISHED';

export interface Tournament {
  id: string;
  name: string;        
  eventId: string | number;
  sport: string;    
  category: string;   
  teamsCount: number; 
  status: TournamentStatus;
  startDate: string;
}