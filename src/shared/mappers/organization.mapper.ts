
import type { OrganizationResponseDTO } from "@features/organizations/models/organization-api.model";
import { type Organization } from "@models/organization.model";

export const OrganizationMapper = {
  toDomain: (dto: OrganizationResponseDTO): Organization => ({
    id: dto.id,
    name: dto.name,
    description: dto.description,
    status: dto.status,
    stats: {
      eventsCount: dto._count?.events ?? 0,
      teamsCount: dto._count?.teams ?? 0
    },
    lastUpdate: new Date(dto.updatedAt).toLocaleDateString(),
    createdAt: dto.createdAt
  })
};