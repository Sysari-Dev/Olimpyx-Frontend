import type { Match } from "src/shared/models/match.model";
import { Calendar } from "lucide-react";
import { AdminMatchCard } from "./AdminMatchCard";

interface MatchListProps {
  matches: Match[];
}

const MatchList = ({ matches }: MatchListProps) => {
  return (
    <div className="h-full flex flex-col space-y-2">
      <div className="flex items-center justify-between px-2 shrink-0 mb-4">
        <h2 className="text-sm font-black text-dark/40 uppercase tracking-widest">
          Encuentros Programados
        </h2>
        <span className="text-[10px] font-bold text-accent/60 bg-accent/5 px-3 py-1 rounded-full border border-accent/10">
          {matches.length} encuentros
        </span>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3 pb-4">
        {matches.length > 0 ? (
          matches.map((match) => (
            // 2. USAMOS EL NUEVO COMPONENTE Y LE PASAMOS EL MATCH COMPLETO
            <AdminMatchCard key={match.id} match={match} />
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center bg-white rounded-xl border border-dashed border-light">
             <Calendar size={48} className="text-light mb-4" />
             <p className="text-dark/40 font-bold">Sin resultados</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchList;