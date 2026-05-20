import { Swords } from "lucide-react";
import { type Match } from "@models/match.model";
import { AdminMatchCard } from "./AdminMatchCard";

interface MatchListProps {
  matches: Match[];
}

export const MatchList = ({ matches }: MatchListProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-[10px] font-black text-gray/40 uppercase tracking-[0.2em]">
          Encuentros Encontrados
        </h3>
        <span className="text-[9px] font-black text-secondary bg-secondary/10 border border-secondary/20 px-2 py-0.5 rounded">
          {matches.length} Partidos
        </span>
      </div>
      <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar pb-6">
        {matches.length > 0 ? (
          matches.map((match) => (
            <AdminMatchCard key={match.id} match={match} />
          ))
        ) : (
          <div className="py-20 flex flex-col items-center justify-center bg-[#1A1A1A] rounded-lg border border-dashed border-white/5">
            <Swords size={36} className="text-gray/10 mb-3" />
            <p className="text-gray/40 text-xs font-black uppercase tracking-widest">Sin partidos bajo este filtro</p>
          </div>
        )}
      </div>
    </div>
  );
};