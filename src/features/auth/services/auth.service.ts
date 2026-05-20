import { api } from "@api/HttpInterceptor";
import { type ApiResponse } from "@api/interfaces/api-response.interface";
import { type LoginResponseDTO } from "../models/auth-api.model";
import { type LoginRequestDTO } from "../models/auth-api.model";

export const AuthService = {
  login: async (credentials: LoginRequestDTO): Promise<ApiResponse<LoginResponseDTO>> => {
    const { data } = await api.post<ApiResponse<LoginResponseDTO>>('/auth/login', credentials);
    return data;
  }
};