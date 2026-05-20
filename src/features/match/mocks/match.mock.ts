export interface MatchMock {
  id: string;
  tournamentName: string;
  team1Name: string;
  team2Name: string;
  matchDate: string;
  status: 'PENDING' | 'LIVE' | 'FINISHED';
  scoreTeam1: number;
  scoreTeam2: number;
}

export const MOCK_MATCHES: MatchMock[] = [
  {
    id: "1",
    tournamentName: "Liga Distrital Abancay",
    team1Name: "Miguel Grau",
    team2Name: "DEA Abancay",
    matchDate: "17 Mar, 2026",
    status: "LIVE",
    scoreTeam1: 1,
    scoreTeam2: 1,
  },
  {
    id: "2",
    tournamentName: "Copa Inter-Comunidades",
    team1Name: "Santos FC",
    team2Name: "Curibamba City",
    matchDate: "17 Mar, 2026",
    status: "FINISHED",
    scoreTeam1: 3,
    scoreTeam2: 0,
  },
  {
    id: "3",
    tournamentName: "Torneo Femenino Vóley",
    team1Name: "Las Poderosas",
    team2Name: "Sport Girls Abancay",
    matchDate: "16 Mar, 2026",
    status: "FINISHED",
    scoreTeam1: 3,
    scoreTeam2: 1,
  },
  {
    id: "4",
    tournamentName: "Liga Distrital Abancay",
    team1Name: "Social Olivo",
    team2Name: "CD Educación",
    matchDate: "15 Mar, 2026",
    status: "FINISHED",
    scoreTeam1: 2,
    scoreTeam2: 2,
  },
  {
    id: "5",
    tournamentName: "Liga Distrital Abancay",
    team1Name: "Imperial Abancay",
    team2Name: "Apurímac United",
    matchDate: "17 Mar, 2026",
    status: "LIVE",
    scoreTeam1: 0,
    scoreTeam2: 0,
  },
  {
    id: "6",
    tournamentName: "Torneo Femenino Vóley",
    team1Name: "Club Victoria",
    team2Name: "Amazonas Vóley",
    matchDate: "17 Mar, 2026",
    status: "PENDING",
    scoreTeam1: 0,
    scoreTeam2: 0,
  }
];