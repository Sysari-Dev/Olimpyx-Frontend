import { useMemo } from "react";
import { type Match } from "@models/match.model";

interface BracketMatch {
  id: string;
  team1: string | null;
  team2: string | null;
  score1?: number;
  score2?: number;
}

interface Round {
  name: string;
  matches: BracketMatch[];
}

interface KnockoutBracketProps {
  tournamentId: string;
  matches: Match[];
}

export const KnockoutBracket = ({ tournamentId, matches }: KnockoutBracketProps) => {
  console.log("Montando llaves para el torneo:", tournamentId);

  // Procesamos los datos directamente sin estados de arrastre innecesarios
  const bracketData = useMemo<Round[]>(() => {
    if (matches.length === 0) return [];

    const roundsMap: { [key: string]: BracketMatch[] } = {};

    matches.forEach((m) => {
      const roundKey = m.roundName || "Ronda Inicial";
      if (!roundsMap[roundKey]) {
        roundsMap[roundKey] = [];
      }
      roundsMap[roundKey].push({
        id: m.id,
        team1: m.team1?.name || null,
        team2: m.team2?.name || null,
        score1: m.scoreTeam1,
        score2: m.scoreTeam2,
      });
    });

    return Object.keys(roundsMap).map((key) => ({
      name: key,
      matches: roundsMap[key],
    }));
  }, [matches]);

  if (matches.length === 0) {
    return (
      <div className="py-16 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-xl bg-white/1 text-center">
        <p className="text-gray/40 text-sm font-medium max-w-sm leading-relaxed">
          El fixture de eliminatorias aún no ha sido generado.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto custom-scrollbar pb-8">
      <div className="flex gap-12 min-w-max p-4">
        {bracketData.map((round, rIndex) => (
          <div key={rIndex} className="flex flex-col gap-6 justify-around">
            <div className="flex flex-col justify-around h-full gap-4">
              {round.matches.map((match) => (
                <div
                  key={match.id}
                  className="bg-[#1A1A1A] border border-white/10 rounded-lg w-64 shadow-xl flex flex-col overflow-hidden"
                >
                  {/* Team 1 - Interacción eliminada */}
                  <div className="flex justify-between items-center p-3 border-b border-white/5 bg-white/5 transition-colors">
                    <span className="text-sm font-bold text-light truncate pr-2">
                      {match.team1 || <span className="text-gray/40 italic">Pase Directo / TBD</span>}
                    </span>
                    <span className="text-sm font-black text-primary">{match.score1 ?? "-"}</span>
                  </div>

                  {/* Team 2 - Interacción eliminada */}
                  <div className="flex justify-between items-center p-3 transition-colors">
                    <span className="text-sm font-bold text-light truncate pr-2">
                      {match.team2 || <span className="text-gray/40 italic">Pase Directo / TBD</span>}
                    </span>
                    <span className="text-sm font-black text-primary">{match.score2 ?? "-"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};