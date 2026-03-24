import type { GroupStage, Stage } from "./competition.model";
import type { Team } from "./organization.model";
import type { Tournament } from "./tournament.model";

export type MatchStatus = 'PENDING' | 'LIVE' | 'FINISHED';

export interface Match {
  id: string;
  tournament: Tournament;
  stage?: Stage;            
  group?: GroupStage;   
  team1: Team;
  team2: Team;
  scoreTeam1: number;
  scoreTeam2: number;
  winnerId?: Team;    
  parentMatch1?: Match; 
  parentMatch2?: Match;   
  roundName?: string;
  matchDate?: string;
  status: MatchStatus;
}

export interface MatchSet {
  id:string;
  match?: Match;
  setNumber: number;
  pointsTeam1: number;
  pointsTeam2: number;
}