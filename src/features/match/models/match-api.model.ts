export type MatchStatus = 'PENDING' | 'IN_PROGRESS' | 'SUSPENDED' | 'FINISHED';
export type StageType = 'ROUND_ROBIN' | 'ELIMINATION' | 'GROUP_STAGE';
export type ScoreOperation = 'INCREMENT' | 'DECREMENT';

export interface SportInMatchDTO {
  id: string;
  name: string;
  description: string | null;
}

export interface TournamentInMatchDTO {
  id: string;
  eventId: string;
  sportId: string;
  name: string;
  format: string | null;
  pointsPerWin: number;
  pointsPerDraw: number;
  pointsPerLoss: number;
  status: string;
  sport?: SportInMatchDTO;
}

export interface TeamInMatchDTO {
  id: string;
  organizationId: string;
  name: string;
  status: string;
}

export interface StageInMatchDTO {
  id: string;
  tournamentId: string;
  name: string;
  stageType: StageType;
  isHomeAndAway: boolean;
}

export interface GroupInMatchDTO {
  id: string;
  stageId: string;
  name: string;
  qualifiedCount: number;
}

export interface SetDTO {
  id: string;
  setNumber: number;
  pointsTeam1: number;
  pointsTeam2: number;
}

export interface MatchDTO {
  id: string;
  tournamentId: string;
  stageId: string;
  groupId: string | null;
  team1Id: string;
  team2Id: string;
  scoreTeam1: number;
  scoreTeam2: number;
  winnerId: string | null;
  parentMatch1: string | null;
  parentMatch2: string | null;
  roundName: string;
  matchDate: string | null;
  status: MatchStatus;
  team1: TeamInMatchDTO | null;
  team2: TeamInMatchDTO | null;
  sets: SetDTO[]; 
  stage: StageInMatchDTO;
  group: GroupInMatchDTO | null;
  tournament?: TournamentInMatchDTO;
}

export interface UpdateMatchMetadataRequestDTO {
  matchDate: string | null;
  status: MatchStatus;
}

export interface UpdateMatchScoreRequestDTO {
  tournamentId: string;
  matchId: string;
  teamId: string;
  points: number;
  operation: ScoreOperation;
  setNumber?: number;
}

export interface FinalizeMatchRequestDTO {
  tournamentId: string;
  matchId: string;
}

export interface MatchListApiResponse {
  success: boolean;
  message: {
    type: string;
    content: string;
  };
  data: MatchDTO[];
}

export interface SingleMatchApiResponse {
  success: boolean;
  message: {
    type: string;
    content: string;
  };
  data: MatchDTO;
}

export interface FinalizeMatchApiResponse {
  success: boolean;
  message: {
    type: string;
    content: string;
  };
  data: {
    message: string;
    playoffsTournamentId: string | null;
  };
}