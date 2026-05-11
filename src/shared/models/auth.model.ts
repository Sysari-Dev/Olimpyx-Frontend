import type { ApiResponse } from '@api/interfaces/api-response.interface';

export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'USER';

export interface UserAccount {
  id: string;
  username: string;
  email: string;
  roles: UserRole;
  accessToken: string;
  refreshToken: string;
}

export type AuthResponse = ApiResponse<UserAccount>;