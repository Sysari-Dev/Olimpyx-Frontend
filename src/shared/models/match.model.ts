// src/shared/models/match.model.ts

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

/**
 * Usamos 'type' en lugar de 'interface' para evitar el aviso de ESLint
 * cuando solo estamos extendiendo/omitiendo sin agregar miembros nuevos.
 */
export type CreateMatchDTO = Omit<Match, 'id' | 'score'>;