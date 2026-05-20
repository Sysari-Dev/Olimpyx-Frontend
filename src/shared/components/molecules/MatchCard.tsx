import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import LiveBadge from "@atoms/LiveBadge"; 

interface MatchCardProps {
  id: string;
  event: string;
  sport: string;
  team1: string;
  team2: string;
  score1: number;
  score2: number;
  currentPeriod: string; 
}

const MatchCard = ({ id, event, sport, team1, team2, score1, score2, currentPeriod }: MatchCardProps) => {
  return (
    <Link 
      to={`/partido/${id}`}
      className="block bg-white border border-light rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-accent/20 transition-all group relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-accent/10 group-hover:bg-accent/30 transition-colors" />
      <div className="mb-1">
        <span className="text-[9px] font-bold text-accent/60 uppercase tracking-[0.2em] leading-none">
          {event}
        </span>
      </div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className="w-1 h-3 bg-tertiary rounded-full" />
          <span className="text-[11px] font-black text-dark/80 uppercase tracking-wider">
            {sport}
          </span>
        </div>
        <LiveBadge />
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 text-center">
          <div className="w-12 h-12 bg-light/50 border border-light rounded-full mx-auto mb-2 flex items-center justify-center font-black text-dark/20 text-xl group-hover:text-accent/30 transition-colors">
            {team1[0]}
          </div>
          <p className="text-xs font-bold text-dark truncate px-1">{team1}</p>
        </div>
        <div className="flex flex-col items-center px-2">
          <div className="text-3xl font-black text-dark flex gap-3 italic tracking-tighter">
            <span className={score1 > score2 ? "text-dark" : "text-dark/40"}>{score1}</span>
            <span className="text-dark/10">-</span>
            <span className={score2 > score1 ? "text-dark" : "text-dark/40"}>{score2}</span>
          </div>
          <div className="mt-2">
            <span className="text-[9px] font-black text-white bg-dark px-2 py-0.5 rounded-md uppercase tracking-tighter">
              {currentPeriod}
            </span>
          </div>
        </div>
        <div className="flex-1 text-center">
          <div className="w-12 h-12 bg-light/50 border border-light rounded-full mx-auto mb-2 flex items-center justify-center font-black text-dark/20 text-xl group-hover:text-accent/30 transition-colors">
            {team2[0]}
          </div>
          <p className="text-xs font-bold text-dark truncate px-1">{team2}</p>
        </div>
      </div>
      <div className="mt-5 pt-4 border-t border-light/60 flex justify-between items-center">
        <span className="text-[10px] font-bold text-dark/30 uppercase italic">Olimpix Live Report</span>
        <div className="flex items-center gap-1 text-accent font-black text-[10px] uppercase group-hover:gap-2 transition-all">
          Detalles
          <ChevronRight size={12} strokeWidth={3} />
        </div>
      </div>
    </Link>
  );
};
export default MatchCard;