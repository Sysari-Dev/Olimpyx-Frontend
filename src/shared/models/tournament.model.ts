import type { SportEvent } from "./event.model";
import type { Team } from "./organization.model";
import type { Sport } from "./sport.model";


export interface Tournament {
  id: string;
  name: string;
  format: string; 
  event: SportEvent;
  sport: Sport;    
  pointsPerWin: number;
  pointsPerDraw: number;
  pointsPerLoss: number;
  createdAt?: string;
  teamsCount?: number;
}

export interface TournamentTeam {
  id: string;
  tournamentId: Tournament; 
  teamId: Team;
}