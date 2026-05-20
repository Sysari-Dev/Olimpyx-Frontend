export interface Tournament {
  name: string;
  sport: string;
  system: 'groups' | 'league' | 'knockout' | '';
  isDoubleMatch: boolean;
  groupCount?: number;
  qualifiersPerGroup?: number;
  teams: string[];
}