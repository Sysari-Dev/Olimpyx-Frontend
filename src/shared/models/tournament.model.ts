import { type TournamentStatus, type TournamentFormat } from "@features/tournament/models/tournament-api.model";

export interface Tournament {
  id: string;
  eventId: string;
  sportId: string;
  name: string;
  format: TournamentFormat;
  status: TournamentStatus;
  pointsPerWin: number;
  pointsPerDraw: number;
  pointsPerLoss: number;
  createdAt: string;
  sportName: string;
  eventName?: string;
  teamCount: number;
  matchCount: number;
  stageCount: number;
}