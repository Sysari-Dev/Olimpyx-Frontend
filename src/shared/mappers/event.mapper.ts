import type { EventResponseDTO, EventStatsResponseDTO } from "@features/events/models/event-api.model";
import { type Event, type EventStats } from "@models/event.model";

export const EventMapper = {
  toDomain: (dto: EventResponseDTO): Event => ({
    id: dto.id,
    organizationId: dto.organizationId,
    name: dto.name,
    description: dto.description,
    location: dto.location,
    startDate: dto.start_date,
    endDate: dto.end_date,
    status: dto.status,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  }),

  toDomainList: (dtos: EventResponseDTO[]): Event[] => {
    return dtos.map(dto => EventMapper.toDomain(dto));
  },

  toStatsDomain: (dto: EventStatsResponseDTO): EventStats => ({
    totalTournaments: dto.totalTournaments,
    totalTeams: dto.totalTeams,
    remainingMatches: dto.remainingMatches,
  })
};