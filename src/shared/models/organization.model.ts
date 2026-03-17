export interface Organization {
  id: string | number;
  name: string;
  slug: string;
  logo?: string;
  memberCount: number;
  createdAt: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'EDITOR' | 'VIEWER';
  avatar?: string;
}