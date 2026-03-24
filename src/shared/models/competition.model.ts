import type { Team } from "./organization.model";
import type { Tournament } from "./tournament.model";


export interface Stage {
  id: string;
  tournament?: Tournament;
  name?: string;
  stageType?: string;
}

export interface GroupStage {
  id: string;
  stage?: Stage;
  name?: string; 
  qualifiedCount: number;
}

export interface GroupTeamStats {
  id: string;
  group?: GroupStage;
  team?: Team;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}