import { Trophy } from "lucide-react";

interface Matchup {
  id: string;
  team1: string;
  team2: string;
  score1?: number;
  score2?: number;
  status: "PENDING" | "FINISHED";
}

interface KnockoutStageProps {
  stageName: string;
  matchups: Matchup[];
}

export const KnockoutSummary = ({ stageName, matchups }: KnockoutStageProps) => {
  return (
    <div className="bg-white border border-light rounded-2xl overflow-hidden shadow-sm mb-4 last:mb-0">
      <div className="bg-dark/5 px-4 py-2 border-b border-light flex items-center justify-between">
        <h4 className="text-dark font-black uppercase tracking-widest text-[10px] flex items-center gap-2">
          {stageName === "Final" && <Trophy size={12} className="text-accent" />}
          {stageName}
        </h4>
      </div>
      <div className="p-3 space-y-3">
        {matchups.map((match) => (
          <div key={match.id} className="flex items-center justify-between text-xs font-bold bg-light/30 rounded-lg p-2">
            <span className={`flex-1 truncate ${match.score1 && match.score1 > (match.score2 || 0) ? 'text-accent' : 'text-dark/70'}`}>
              {match.team1}
            </span>
            
            {match.status === "FINISHED" ? (
              <div className="px-3 font-black text-dark flex gap-1 bg-white rounded-md py-0.5 shadow-sm">
                <span>{match.score1}</span>
                <span className="text-dark/20">-</span>
                <span>{match.score2}</span>
              </div>
            ) : (
              <span className="px-3 text-[9px] uppercase tracking-wider text-dark/30">Vs</span>
            )}

            <span className={`flex-1 text-right truncate ${match.score2 && match.score2 > (match.score1 || 0) ? 'text-accent' : 'text-dark/70'}`}>
              {match.team2}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};