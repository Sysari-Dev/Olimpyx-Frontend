import type { MatchResponseDTO } from "@features/match/models/competition-api.model";
import type { Match, MatchStatus } from "@models/match.model";
import type { Tournament } from "@models/tournament.model";
import type { Team } from "@models/organization.model";
import type { Stage, GroupStage } from "@models/competition.model"; 

export const CompetitionMapper = {
  toDomain: (dto: MatchResponseDTO): Match => ({
    id: dto.id,
    
    tournament: { id: dto.tournamentId } as Tournament,
    stage: dto.stageId ? ({ id: dto.stageId } as unknown as Stage) : undefined,
    group: dto.groupId ? ({ id: dto.groupId } as unknown as GroupStage) : undefined,
    
    team1: dto.team1 
      ? ({ id: dto.team1.id, name: dto.team1.name } as Team) 
      : ({ id: "bye", name: "Pase Directo / TBD" } as Team),
      
    team2: dto.team2 
      ? ({ id: dto.team2.id, name: dto.team2.name } as Team) 
      : ({ id: "bye", name: "Pase Directo / TBD" } as Team),
      
    scoreTeam1: dto.scoreTeam1,
    scoreTeam2: dto.scoreTeam2,
    
    winnerId: dto.winnerId ? ({ id: dto.winnerId } as Team) : undefined,
    
    parentMatch1: dto.parentMatch1 ? ({ id: dto.parentMatch1 } as unknown as Match) : undefined,
    parentMatch2: dto.parentMatch2 ? ({ id: dto.parentMatch2 } as unknown as Match) : undefined,
    
    roundName: dto.roundName,
    
    matchDate: dto.matchDate ?? undefined,
    status: dto.status as MatchStatus,
  }),

  toDomainList: (dtos: MatchResponseDTO[]): Match[] => {
    return dtos.map(dto => CompetitionMapper.toDomain(dto));
  }
};