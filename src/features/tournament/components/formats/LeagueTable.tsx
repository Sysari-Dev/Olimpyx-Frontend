import { Trophy } from "lucide-react";

export const LeagueTable = ({ tournamentId }: { tournamentId: string }) => {
  console.log("Montando llaves para el torneo:", tournamentId);
  const standings = [
    { pos: 1, name: "Chankas", pj: 5, pg: 4, pe: 1, pp: 0, gf: 12, gc: 3, pts: 13 },
    { pos: 2, name: "COD 22-1", pj: 5, pg: 3, pe: 1, pp: 1, gf: 8, gc: 5, pts: 10 },
  ];

  return (
    <div className="bg-[#1A1A1A] border border-white/5 rounded-xl overflow-hidden">
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