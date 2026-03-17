import { Activity, Swords, Clock, MoreVertical, CheckCircle2 } from "lucide-react";
import type { Match } from "src/shared/models/match.model"; 

interface MatchCardProps {
  match: Match;
}

const MatchCard = ({ match }: MatchCardProps) => {
  const statusMap = {
    LIVE: {
      color: "text-tertiary",
      bg: "bg-tertiary/10",
      badge: "bg-tertiary text-white animate-pulse",
      scoreText: "text-white",
      border: "border-tertiary/30 shadow-lg shadow-tertiary/5",
      label: "En Vivo"
    },
    FINISHED: {
      color: "text-dark/40",
      bg: "bg-dark/5",
      badge: "bg-dark/10 text-dark/60",
      scoreText: "text-dark/60",
      border: "border-light opacity-75",
      label: "Finalizado"
    },
    UPCOMING: {
      color: "text-primary",
      bg: "bg-primary/5",
      badge: "bg-light text-dark/40",
      scoreText: "text-dark/40",
      border: "border-light hover:border-primary/20",
      label: match.sport
    }
  };

  const statusConfig = statusMap[match.status];

  return (
    <div className={`bg-white p-5 rounded-xl border transition-all flex flex-col md:flex-row items-center justify-between gap-6 group ${statusConfig.border}`}>
      
      <div className="flex items-center gap-4 w-full md:w-1/4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${statusConfig.bg} ${statusConfig.color}`}>
          {match.status === "FINISHED" ? <CheckCircle2 size={24} /> : 
           match.sport === "Vóley" ? <Activity size={24} /> : <Swords size={24} />}
        </div>
        <div className="min-w-0">
          <p className={`text-[10px] font-black uppercase tracking-tighter ${statusConfig.color}`}>
            {statusConfig.label}
          </p>
          <p className="text-sm font-bold text-dark truncate">{match.tournament}</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 md:gap-8 grow">
        <div className="text-right w-28 md:w-36">
          <p className="text-base md:text-lg font-black text-dark tracking-tighter truncate">{match.team1}</p>
          <p className="text-[10px] text-dark/30 font-bold uppercase tracking-widest">Local</p>
        </div>
        <div className="flex flex-col items-center">
          <div className={`px-5 py-2 rounded-xl font-black text-2xl tabular-nums shadow-sm transition-colors ${statusConfig.badge}`}>
            {match.status === "UPCOMING" ? "VS" : match.score}
          </div>
        </div>
        <div className="text-left w-28 md:w-36">
          <p className="text-base md:text-lg font-black text-dark tracking-tighter truncate">{match.team2}</p>
          <p className="text-[10px] text-dark/30 font-bold uppercase tracking-widest">Visitante</p>
        </div>
      </div>
      <div className="flex items-center justify-end gap-6 w-full md:w-1/4 border-t md:border-t-0 pt-4 md:pt-0">
        <div className="flex flex-col items-end">
          <div className={`flex items-center gap-2 font-bold text-sm whitespace-nowrap ${match.status === 'LIVE' ? 'text-tertiary' : 'text-dark/60'}`}>
            <Clock size={16} />
            {match.status === "LIVE" ? "Jugándose" : match.time}
          </div>
          <p className="text-[10px] text-dark/30 font-bold uppercase">{match.date}</p>
        </div>

        <button className="p-2 hover:bg-light rounded-xl transition-colors cursor-pointer text-dark/40 hover:text-accent">
          <MoreVertical size={20} />
        </button>
      </div>
    </div>
  );
};

export default MatchCard;