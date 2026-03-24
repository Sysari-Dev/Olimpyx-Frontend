import type { Organization } from "./organization.model";

export type UserRole = 'superadmin' | 'admin';

export interface UserAccount {
  id: string;
  email: string;
  username?: string;
  role: UserRole; 
  organization?: Organization
  status: string;
  createdAt: string;
}