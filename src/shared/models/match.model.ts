export type MatchStatus = 'LIVE' | 'FINISHED' | 'UPCOMING';

export interface Match {
  id: string;
  tournamentId?: string | number;
  tournament: string;
  sport: string;
  team1: string;
  team2: string;
  score: string;
  time: string;
  date: string;
  status: MatchStatus;
  location?: string;
  currentPeriod?: string;
} 

export type CreateMatchDTO = Omit<Match, 'id' | 'score'>;