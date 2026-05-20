export interface Team {
  id: string;
  organizationId: string;
  name: string;
  status: 'ACTIVE' | 'INACTIVE';
  tournamentCount: number;
}

export interface TeamState {
  teams: Team[];
  isLoading: boolean;
}