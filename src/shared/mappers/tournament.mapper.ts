import type { TournamentResponseDTO } from "@features/tournament/models/tournament-api.model";
import { type Tournament } from "@models/tournament.model";

export const TournamentMapper = {
  toDomain: (dto: TournamentResponseDTO): Tournament => ({
    id: dto.id,
    eventId: dto.eventId,
    sportId: dto.sportId,
    name: dto.name,
    format: dto.format,
    status: dto.status,
    pointsPerWin: dto.pointsPerWin,
    pointsPerDraw: dto.pointsPerDraw,
    pointsPerLoss: dto.pointsPerLoss,
    createdAt: dto.createdAt,
    sportName: dto.sport?.name ?? "Deporte no definido",
    eventName: dto.event?.name,
    teamCount: dto._count?.teams ?? 0,
    matchCount: dto._count?.matches ?? 0,
    stageCount: dto._count?.stages ?? 0,
  }),

  toDomainList: (dtos: TournamentResponseDTO[]): Tournament[] => {
    return dtos.map(dto => TournamentMapper.toDomain(dto));
  }
};