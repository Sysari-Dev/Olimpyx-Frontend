import { type ApiResponse } from "@api/interfaces/api-response.interface";

export interface OrganizationDTO {
  id: string;
  name: string;
}

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  id: string;
  username: string;
  email: string;
  roles: string;
  accessToken: string;
  refreshToken: string;
  organizations: OrganizationDTO[];
}

export type AuthApiResponse = ApiResponse<LoginResponseDTO>;