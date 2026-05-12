import type { ApiResponse } from '@api/interfaces/api-response.interface';

export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'USER';

export const ROLE_LABELS: Record<UserRole, string> = {
  SUPER_ADMIN: 'Super Administrador',
  ADMIN: 'Administrador',
  USER: 'Usuario Estándar',
};

export interface UserAccount {
  id: string;
  username: string;
  email: string;
  role: UserRole;
}

export interface AuthSession {
  user: UserAccount;
  accessToken: string;
  refreshToken: string;
}

export type AuthResponse = ApiResponse<UserAccount>;