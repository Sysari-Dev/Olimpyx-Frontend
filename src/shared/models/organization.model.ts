import type { UserAccount } from "./auth.model";

export interface Organization {
  id: string;
  name: string;
  description: string;
  status: 'ACTIVE' | 'INACTIVE';
  stats: {
    eventsCount: number;
    teamsCount: number;
  };
  lastUpdate: string;
  createdAt: string;
}

export interface UserOrganization {
  id: string;
  organization?: Organization; 
  user?: UserAccount;          
  roleInOrg?: string;
  joinedAt: string;
}

export interface Team {
  id: string;
  organization?: Organization; 
  name: string;
}