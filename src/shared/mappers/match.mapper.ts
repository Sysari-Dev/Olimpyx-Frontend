/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Match } from "@models/match.model";
import { type Team } from "@models/organization.model";
import { type Tournament } from "@models/tournament.model";
import { type Stage, type GroupStage } from "@models/competition.model";
import type { MatchDTO } from "@features/match/models/match-api.model";

export const MatchMapper = {
  toDomain: (dto: MatchDTO): Match => {
    const team1: Team = dto.team1 
      ? ({
          id: dto.team1.id,
          name: dto.team1.name,
          status: dto.team1.status as 'ACTIVE' | 'INACTIVE'
        } as Team)
      : ({
          id: `tbd-t1-${dto.id}`,
          name: "Por definir",
          status: "INACTIVE"
        } as Team);

    const team2: Team = dto.team2
      ? ({
          id: dto.team2.id,
          name: dto.team2.name,
          status: dto.team2.status as 'ACTIVE' | 'INACTIVE'
        } as Team)
      : ({
          id: `tbd-t2-${dto.id}`,
          name: "Por definir",
          status: "INACTIVE"
        } as Team);

    const tournament = {
      id: dto.tournamentId,
      name: dto.tournament?.name || "", 
      eventId: dto.tournament?.eventId || "",
      sportId: dto.tournament?.sportId || dto.tournament?.sport?.id || "",
      sportName: dto.tournament?.sport?.name || "",
      format: dto.stage?.stageType || (dto.tournament?.format as any) || "ROUND_ROBIN",
      status: (dto.tournament?.status as any) || "PLANNING",
      pointsPerWin: dto.tournament?.pointsPerWin ?? 3,
      pointsPerDraw: dto.tournament?.pointsPerDraw ?? 1,
      pointsPerLoss: dto.tournament?.pointsPerLoss ?? 0,
      teamCount: 0
    } as Tournament;

    const stage: Stage | undefined = dto.stage ? ({
      id: dto.stage.id,
      tournament,
      name: dto.stage.name,
      stageType: dto.stage.stageType
    } as Stage) : undefined;

    const group: GroupStage | undefined = dto.group ? ({
      id: dto.group.id,
      name: dto.group.name,
      qualifiedCount: dto.group.qualifiedCount
    } as GroupStage) : undefined;

    let winnerId: Team | undefined = undefined;
    if (dto.winnerId === team1.id) winnerId = team1;
    if (dto.winnerId === team2.id) winnerId = team2;

    return {
      id: dto.id,
      tournament,
      stage,
      group,
      team1,
      team2,
      scoreTeam1: dto.scoreTeam1,
      scoreTeam2: dto.scoreTeam2,
      winnerId,
      roundName: dto.roundName,
      matchDate: dto.matchDate ?? undefined,
      status: dto.status
    };
  },

  toDomainList: (dtos: MatchDTO[]): Match[] => {
    if (!dtos || !Array.isArray(dtos)) return [];
    return dtos.map(MatchMapper.toDomain);
  }
};