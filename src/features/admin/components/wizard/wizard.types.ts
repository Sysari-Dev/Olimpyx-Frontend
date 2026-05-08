export interface WizardFormData {
  name: string;
  sport: string;
  format: string;
  isHomeAway: boolean;
  groupsCount: number;
  advancingPerGroup: number;
  selectedTeams: string[];
}

export interface PreviewTeam {
  id: string;
  name: string;
}

export interface PreviewGroup {
  name: string;
  teams: PreviewTeam[];
  fixtures: PreviewTeam[][];
}

export type GeneratedPreview = 
  | { type: "groups"; data: PreviewGroup[] }
  | { type: "league"; data: PreviewTeam[]; fixtures: PreviewTeam[][] }
  | { type: "knockout"; data: PreviewTeam[][] };