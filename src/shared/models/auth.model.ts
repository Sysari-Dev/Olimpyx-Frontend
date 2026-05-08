  import type { Organization } from "./organization.model";

  export type UserRole = 'SUPER_ADMIN' | 'admin';

  export interface UserAccount {
    id: string;
    email: string;
    username?: string;
    role: UserRole; 
    organization?: Organization
    status?: string;
    createdAt?: string;
  }