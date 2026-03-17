import { Link } from "react-router-dom";
import { Users, ChevronRight, LayoutGrid } from "lucide-react";

interface TournamentCardProps {
  id: string;
  name: string;      
  sport: string;     
  format: string;    
  teamsCount: number;
}

export const TournamentCard = ({ id, name, sport, format, teamsCount }: TournamentCardProps) => {
  return (
    <Link 
      to={`/torneo/${id}`}
      className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border border-light rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-accent/40 transition-all duration-300 group gap-4"
    >
      <div className="flex gap-4 items-center">
        <div className="w-12 h-12 bg-light/40 rounded-full flex items-center justify-center text-dark/40 group-hover:bg-accent/10 group-hover:text-accent transition-colors">
          <span className="font-black text-xl">{name[0]}</span>
        </div>
        <div>
          <span className="text-[10px] font-black text-dark/40 uppercase tracking-widest block mb-0.5">
            {sport}
          </span>
          <h4 className="text-lg font-black text-dark group-hover:text-accent transition-colors">
            {name}
          </h4>
        </div>
      </div>
      <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-light pt-4 sm:pt-0">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-dark/60">
            <LayoutGrid size={14} className="text-tertiary" />
            {format}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-dark/60">
            <Users size={14} className="text-tertiary" />
            {teamsCount} Equipos
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-light flex items-center justify-center text-dark/40 group-hover:bg-accent group-hover:text-white transition-colors shrink-0">
          <ChevronRight size={16} strokeWidth={3} />
        </div>
      </div>
    </Link>
  );
};