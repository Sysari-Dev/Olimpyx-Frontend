
import type { LoginResponseDTO } from "@features/auth/models/auth-api.model";
import { type AuthSession, type UserRole } from "@models/auth.model";

export const AuthMapper = {
  toDomain: (dto: LoginResponseDTO): AuthSession => {
    return {
      user: {
        id: dto.id,
        username: dto.username,
        email: dto.email,
        role: dto.roles as UserRole, 
      },
      accessToken: dto.accessToken,
      refreshToken: dto.refreshToken,
    };
  }
};