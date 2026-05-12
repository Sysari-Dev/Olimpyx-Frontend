import { type ApiResponse } from "@api/interfaces/api-response.interface";

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
}

export type AuthApiResponse = ApiResponse<LoginResponseDTO>;