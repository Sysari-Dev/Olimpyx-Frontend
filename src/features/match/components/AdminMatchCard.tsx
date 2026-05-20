import { Calendar, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { type Match } from "@models/match.model";

interface Props {
  match: Match;
}

export const AdminMatchCard = ({ match }: Props) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/admin/partidos/${match.id}`)}
      className="bg-[#1A1A1A] border border-white/5 p-5 rounded-lg flex flex-col md:flex-row items-center justify-between gap-6 hover:border-secondary/30 transition-all cursor-pointer group"
    >
      <div className="space-y-2 w-full md:w-auto">
        <span className="text-[9px] font-black uppercase text-secondary/60 tracking-widest bg-secondary/5 px-2 py-0.5 rounded border border-secondary/10">
          {match.roundName || "Encuentro"}
        </span>
        <div className="flex items-center gap-2 text-gray/40 text-xs">
          <Calendar size={12} />
          <span className="font-medium">
            {match.matchDate ? new Date(match.matchDate).toLocaleDateString() : "Por programar"}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-8 grow w-full md:w-auto">
        <div className="flex items-center gap-3 w-1/3 justify-end text-right">
          <span className="text-sm font-bold text-light truncate">{match.team1.name}</span>
          <div className="w-7 h-7 bg-white/5 rounded flex items-center justify-center font-black text-[10px] text-gray/40 shrink-0">
            {match.team1.name.substring(0, 2).toUpperCase()}
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white/2 border border-white/5 px-4 py-2 rounded-lg min-w-25 justify-center group-hover:border-white/10 transition-colors">
          <span className={`text-lg font-black ${match.status === 'IN_PROGRESS' ? 'text-secondary' : 'text-light'}`}>
            {match.scoreTeam1}
          </span>
          <span className="text-gray/20 font-black text-xs">X</span>
          <span className={`text-lg font-black ${match.status === 'IN_PROGRESS' ? 'text-secondary' : 'text-light'}`}>
            {match.scoreTeam2}
          </span>
        </div>
        <div className="flex items-center gap-3 w-1/3 justify-start text-left">
          <div className="w-7 h-7 bg-white/5 rounded flex items-center justify-center font-black text-[10px] text-gray/40 shrink-0">
            {match.team2.name.substring(0, 2).toUpperCase()}
          </div>
          <span className="text-sm font-bold text-light truncate">{match.team2.name}</span>
        </div>
      </div>
      <div className="flex items-center gap-4 w-full md:w-auto justify-end shrink-0">
        <div className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest border
          ${match.status === 'IN_PROGRESS' ? 'bg-red-500/10 border-red-500/20 text-red-500 animate-pulse' : 
            match.status === 'FINISHED' ? 'bg-white/5 border-white/10 text-gray/40' : 
            match.status === 'SUSPENDED' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' :
            'bg-blue-500/10 border-blue-500/20 text-blue-400'}`}
        >
          {match.status === 'IN_PROGRESS' ? 'En Vivo' : 
           match.status === 'FINISHED' ? 'Finalizado' : 
           match.status === 'SUSPENDED' ? 'Suspendido' : 'Pendiente'}
        </div>
        <ArrowRight size={14} className="text-gray/20 group-hover:text-secondary group-hover:translate-x-1 transition-all hidden md:block" />
      </div>
    </div>
  );
};