import { Trophy } from "lucide-react";

interface TeamInTournament {
  id: string;
  name: string;
}

interface LeaderboardEntry {
  teamName: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

interface LeagueTableProps {
  tournamentId: string;
  teams?: TeamInTournament[];       // 👈 ahora es opcional
  leaderboard?: LeaderboardEntry[];
}

export const LeagueTable = ({ tournamentId, teams, leaderboard }: LeagueTableProps) => {
  console.log("Cargando tabla de posiciones para el torneo:", tournamentId);

  const standings = leaderboard && leaderboard.length > 0
    ? leaderboard.map((entry, index) => ({
        pos: index + 1,
        name: entry.teamName,
        pj: entry.played,
        pg: entry.wins,
        pe: entry.draws,
        pp: entry.losses,
        gf: entry.goalsFor,
        gc: entry.goalsAgainst,
        pts: entry.points,
      }))
    : (teams ?? []).map((team, index) => ({
        pos: index + 1,
        name: team.name,
        pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, pts: 0,
      }));

  if (standings.length === 0) {
    return (
      <div className="py-12 flex flex-col items-center justify-center border border-dashed border-white/5 rounded-xl bg-white/1 text-center">
        <p className="text-gray/40 text-sm font-medium">
          Inscribe equipos para poder visualizar la tabla de posiciones.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#1A1A1A] border border-white/5 rounded-xl overflow-hidden animate-in fade-in duration-300">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-white/5 text-[10px] uppercase font-black tracking-widest text-gray/40 border-b border-white/5">
            <tr>
              <th className="px-6 py-4">Pos</th>
              <th className="px-6 py-4 w-full">Equipo</th>
              <th className="px-4 py-4 text-center">PJ</th>
              <th className="px-4 py-4 text-center">G</th>
              <th className="px-4 py-4 text-center">E</th>
              <th className="px-4 py-4 text-center">P</th>
              <th className="px-4 py-4 text-center">GF</th>
              <th className="px-4 py-4 text-center">GC</th>
              <th className="px-4 py-4 text-center">DG</th>
              <th className="px-6 py-4 text-center text-primary">Pts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-light/80 font-medium">
            {standings.map((row, index) => (
              <tr key={index} className="hover:bg-white/2 transition-colors">
                <td className="px-6 py-4">
                  {row.pos === 1 ? <Trophy size={16} className="text-amber-400" /> : row.pos}
                </td>
                <td className="px-6 py-4 font-bold text-light">{row.name}</td>
                <td className="px-4 py-4 text-center">{row.pj}</td>
                <td className="px-4 py-4 text-center">{row.pg}</td>
                <td className="px-4 py-4 text-center">{row.pe}</td>
                <td className="px-4 py-4 text-center">{row.pp}</td>
                <td className="px-4 py-4 text-center text-gray/60">{row.gf}</td>
                <td className="px-4 py-4 text-center text-gray/60">{row.gc}</td>
                <td className="px-4 py-4 text-center">{row.gf - row.gc}</td>
                <td className="px-6 py-4 text-center font-black text-primary">{row.pts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};