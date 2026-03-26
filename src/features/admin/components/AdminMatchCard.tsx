import { Link } from "react-router-dom";
import { Play, CheckCircle2, Clock } from "lucide-react";
import type { Match } from "src/shared/models/match.model";

interface AdminMatchCardProps {
  match: Match;
}

export const AdminMatchCard = ({ match }: AdminMatchCardProps) => {
  const t1Name = (match.team1 as unknown as { name: string })?.name || "Equipo 1";
  const t2Name = (match.team2 as unknown as { name: string })?.name || "Equipo 2";

  return (
    <div className="bg-white border border-light rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 hover:shadow-md transition-shadow">
      
      <div className="flex items-center gap-4 w-full md:w-1/3">
        <div className="flex flex-col gap-1">
          {match.status === "LIVE" && <span className="text-[10px] font-black text-tertiary bg-tertiary/10 px-2 py-0.5 rounded-md uppercase tracking-widest w-fit animate-pulse">En Vivo</span>}
          {match.status === "PENDING" && <span className="text-[10px] font-black text-accent bg-accent/10 px-2 py-0.5 rounded-md uppercase tracking-widest w-fit flex items-center gap-1"><Clock size={10} /> Programado</span>}
          {match.status === "FINISHED" && <span className="text-[10px] font-black text-dark/40 bg-dark/5 px-2 py-0.5 rounded-md uppercase tracking-widest w-fit flex items-center gap-1"><CheckCircle2 size={10} /> Finalizado</span>}
          <span className="text-xs font-bold text-dark/40">{match.matchDate}</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 w-full md:w-1/3">
        <div className="text-right w-24 truncate font-bold text-sm text-dark">{t1Name}</div>
        
        <div className="bg-light/30 px-4 py-2 rounded-xl flex items-center gap-2 border border-light/50">
          <span className={`text-lg font-black ${match.scoreTeam1 > match.scoreTeam2 ? 'text-accent' : 'text-dark'}`}>{match.scoreTeam1}</span>
          <span className="text-dark/20 text-xs font-black">-</span>
          <span className={`text-lg font-black ${match.scoreTeam2 > match.scoreTeam1 ? 'text-accent' : 'text-dark'}`}>{match.scoreTeam2}</span>
        </div>

        <div className="text-left w-24 truncate font-bold text-sm text-dark">{t2Name}</div>
      </div>

      <div className="flex justify-end w-full md:w-1/3">
        {match.status === "PENDING" && (
          <Link 
            to={`/admin/partido/${match.id}/mesa`}
            className="bg-dark text-white text-xs font-black px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-accent transition-colors shadow-sm"
          >
            <Play size={14} /> Iniciar Partido
          </Link>
        )}
        
        {match.status === "LIVE" && (
          <Link 
            to={`/admin/partido/${match.id}/mesa`}
            className="bg-tertiary text-white text-xs font-black px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-tertiary/80 transition-colors shadow-sm animate-pulse"
          >
            <Play size={14} fill="currentColor" /> Retomar Mesa
          </Link>
        )}

        {match.status === "FINISHED" && (
          <button 
            disabled
            className="bg-light text-dark/40 text-xs font-bold px-4 py-2 rounded-xl cursor-not-allowed"
          >
            Cerrado
          </button>
        )}
      </div>

    </div>
  );
};