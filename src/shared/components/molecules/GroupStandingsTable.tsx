import { Trophy } from "lucide-react";

interface TeamStanding {
  id: string;
  name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

interface GroupStandingsProps {
  groupName: string;
  teams: TeamStanding[];
  qualifiedCount?: number;
}

export const GroupStandingsTable = ({ groupName, teams, qualifiedCount = 2 }: GroupStandingsProps) => {
  const sortedTeams = [...teams].sort((a, b) => b.points - a.points);

  return (
    <div className="rounded-2xl shadow-sm border border-light overflow-x-auto"
      style={{ touchAction: "pan-x" }}
    >
      <div className="min-w-[560px]">
        {/* Header */}
        <div className="bg-dark px-4 py-3 flex items-center justify-between rounded-t-2xl">
          <h4 className="text-white font-black uppercase tracking-widest text-sm flex items-center gap-2">
            <Trophy size={14} className="text-secondary" /> {groupName}
          </h4>
        </div>

        {/* Tabla */}
        <div className="bg-white">
          <table className="w-full text-sm text-left">
            <thead className="bg-light/30 border-b border-light text-[10px] font-black text-dark/40 uppercase">
              <tr>
                <th className="px-4 py-3 w-8">#</th>
                <th className="px-4 py-3">Equipo</th>
                <th className="px-2 py-3 text-center" title="Partidos Jugados">PJ</th>
                <th className="px-2 py-3 text-center" title="Partidos Ganados">PG</th>
                <th className="px-2 py-3 text-center" title="Partidos Empatados">PE</th>
                <th className="px-2 py-3 text-center" title="Partidos Perdidos">PP</th>
                <th className="px-2 py-3 text-center" title="Goles a favor">GF</th>
                <th className="px-2 py-3 text-center" title="Goles en contra">GC</th>
                <th className="px-2 py-3 text-center" title="Diferencia de goles">GD</th>
                <th className="px-4 py-3 text-center text-accent">PTS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light/50">
              {sortedTeams.map((team, index) => {
                const isQualified = index < qualifiedCount;
                return (
                  <tr
                    key={team.id}
                    className={`hover:bg-light/10 transition-colors ${
                      isQualified ? "border-l-4 border-l-tertiary" : "border-l-4 border-l-transparent"
                    }`}
                  >
                    <td className="px-4 py-3 font-black text-dark/40">{index + 1}</td>
                    <td className="px-4 py-3 font-bold text-dark truncate max-w-[120px]">{team.name}</td>
                    <td className="px-2 py-3 text-center font-medium text-dark/60">{team.played}</td>
                    <td className="px-2 py-3 text-center font-medium text-dark/60">{team.won}</td>
                    <td className="px-2 py-3 text-center font-medium text-dark/60">{team.drawn}</td>
                    <td className="px-2 py-3 text-center font-medium text-dark/60">{team.lost}</td>
                    <td className="px-2 py-3 text-center font-medium text-dark/60">{team.goalsFor}</td>
                    <td className="px-2 py-3 text-center font-medium text-dark/60">{team.goalsAgainst}</td>
                    <td className="px-2 py-3 text-center font-medium text-dark/60">{team.goalDifference}</td>
                    <td className="px-4 py-3 text-center font-black text-accent text-base">{team.points}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-light/20 text-[9px] font-bold text-dark/40 uppercase border-t border-light rounded-b-2xl bg-white">
          <span className="inline-block w-2 h-2 bg-tertiary rounded-full mr-1"></span>
          Clasifican los {qualifiedCount} primeros
        </div>
      </div>
    </div>
  );
};