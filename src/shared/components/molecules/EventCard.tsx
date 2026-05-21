import { Calendar, Trophy, ChevronRight } from "lucide-react";

interface EventCardProps {
  id: string;
  name: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
  tournamentCount: number;
  onClick?: (id: string) => void;
}

const statusStyles: Record<string, string> = {
  ACTIVE: "bg-primary/10 text-primary border-primary/20",
  PLANNED: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  FINISHED: "bg-dark/5 text-dark/40 border-dark/10",
};

const statusLabels: Record<string, string> = {
  ACTIVE: "En Curso",
  PLANNED: "Próximamente",
  FINISHED: "Finalizado",
};

export const EventCard = ({
  id,
  name,
  description,
  status,
  startDate,
  endDate,
  tournamentCount,
  onClick,
}: EventCardProps) => {
  const currentStyle = statusStyles[status] || statusStyles.ACTIVE;
  const currentLabel = statusLabels[status] || "En Curso";

  return (
    <div 
      onClick={() => onClick && onClick(id)}
      className="block bg-white border border-dark/10 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-primary/30 transition-all duration-300 group text-dark relative overflow-hidden cursor-pointer active:scale-98"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-primary/5 group-hover:bg-primary/20 transition-colors" />
      
      <div className="flex justify-between items-start mb-4 gap-4">
        <span className={`px-2.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider border ${currentStyle}`}>
          {currentLabel}
        </span>
        <div className="w-9 h-9 bg-dark/5 border border-dark/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-xs shrink-0">
          <Trophy size={16} />
        </div>
      </div>

      <h3 className="text-lg font-black tracking-tight mb-1.5 group-hover:text-primary transition-colors line-clamp-1">
        {name}
      </h3>
      
      <p className="text-xs text-dark/50 font-medium line-clamp-2 mb-6 min-h-8 leading-relaxed">
        {description || "Sin descripción detallada disponible para este evento deportivo."}
      </p>

      <div className="pt-4 border-t border-dark/5 flex justify-between items-center select-none">
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-1.5 text-[9px] font-black text-dark/30 uppercase tracking-wider">
            <Calendar size={12} className="shrink-0" />
            <span className="truncate">{startDate} - {endDate}</span>
          </div>
          <span className="text-xs font-black text-dark/70 tracking-tight">
            {tournamentCount} {tournamentCount === 1 ? "Torneo" : "Torneos"}
          </span>
        </div>
        <div className="w-8 h-8 rounded-full bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
          <ChevronRight size={14} strokeWidth={3} />
        </div>
      </div>
    </div>
  );
};

export default EventCard;