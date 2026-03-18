import { Link } from "react-router-dom";
import { Calendar, Trophy, ChevronRight } from "lucide-react";

interface EventCardProps {
  id: string;
  name: string;
  description: string;
  status: "ACTIVE" | "UPCOMING" | "FINISHED";
  startDate: string;
  endDate: string;
  tournamentCount: number;
}

const statusStyles = {
  ACTIVE: "bg-tertiary/10 text-tertiary border-tertiary/20",
  UPCOMING: "bg-accent/10 text-accent border-accent/20",
  FINISHED: "bg-dark/5 text-dark/40 border-dark/10",
};

const statusLabels = {
  ACTIVE: "En Curso",
  UPCOMING: "Próximamente",
  FINISHED: "Finalizado",
};

export const EventCard = ({ id, name, description, status, startDate, endDate, tournamentCount }: EventCardProps) => {
  return (
    <Link 
      to={`/evento/${id}`}
      className="block bg-white border border-light rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-accent/30 transition-all duration-300 group"
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusStyles[status]}`}>
          {statusLabels[status]}
        </span>
        <div className="w-10 h-10 bg-light/30 rounded-xl flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
          <Trophy size={20} />
        </div>
      </div>
      <h3 className="text-xl font-black text-dark tracking-tight mb-2 group-hover:text-accent transition-colors">
        {name}
      </h3>
      <p className="text-sm text-dark/60 line-clamp-2 mb-6 min-h-[40px]">
        {description}
      </p>
      <div className="pt-5 border-t border-light flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-dark/40 uppercase tracking-wider">
            <Calendar size={12} />
            <span>{startDate} - {endDate}</span>
          </div>
          <span className="text-xs font-black text-dark/80">
            {tournamentCount} Torneos
          </span>
        </div>
        <div className="w-8 h-8 rounded-full bg-accent/5 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
          <ChevronRight size={16} strokeWidth={3} />
        </div>
      </div>
    </Link>
  );
};