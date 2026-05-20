import type { TeamResponseDTO } from "@features/teams/models/team-api.model";
import type { Team } from "@models/team.model";

export const TeamMapper = {
  toDomain: (dto: TeamResponseDTO): Team => ({
    id: dto.id,
    organizationId: dto.organizationId,
    name: dto.name,
    status: dto.status,
    tournamentCount: dto._count?.tournamentTeams ?? 0,
  }),

  toDomainList: (dtos: TeamResponseDTO[]): Team[] => {
    return dtos.map(dto => TeamMapper.toDomain(dto));
  }
};