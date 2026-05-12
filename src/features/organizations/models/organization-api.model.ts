import { type ApiResponse } from "@api/interfaces/api-response.interface";

export interface OrganizationResponseDTO {
  id: string;
  parentId: string | null;
  name: string;
  description: string;
  status: 'ACTIVE' | 'INACTIVE';
  updatedAt: string;
  createdAt: string;
  _count?: {
    events: number;
    teams: number;
  };
}

export interface CreateOrganizationRequestDTO {
  name: string;
  description: string;
  parentId: string | null;
}

export interface UpdateOrganizationRequestDTO {
  name: string;
  description: string;
}

export type OrganizationApiResponse = ApiResponse<OrganizationResponseDTO>;