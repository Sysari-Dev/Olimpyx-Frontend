import { MapPin, Calendar, Trophy, ChevronRight } from "lucide-react";
import type { SportEvent } from "src/shared/models/event.model";

interface EventCardProps {
  event: SportEvent;
  onClick: (id: string) => void;
}

const EventCard = ({ event, onClick }: EventCardProps) => {
  const statusConfig = {
    PLANNING: "bg-blue-500/10 text-blue-600 border-blue-200",
    ACTIVE: "bg-tertiary/10 text-tertiary border-tertiary/20 animate-pulse",
    COMPLETED: "bg-dark/5 text-dark/40 border-light",
  }[event.status];

  return (
    <div 
      onClick={() => onClick(event.id)}
      className="bg-white border border-light rounded-xl p-4 flex flex-col md:flex-row items-center gap-6 hover:shadow-xl hover:border-accent/20 transition-all cursor-pointer group active:scale-[0.99]"
    >
      <div className="shrink-0 w-full md:w-24 h-24 bg-light/30 rounded-xl flex flex-col items-center justify-center border border-light group-hover:bg-accent group-hover:border-accent transition-colors">
        <Calendar size={24} className="text-dark/20 group-hover:text-white/40" />
        <span className="text-[10px] font-black uppercase text-dark/40 group-hover:text-white/60 tracking-widest mt-1">Evento</span>
      </div>
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-center gap-3">
          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${statusConfig}`}>
            {event.status === 'PLANNING' ? 'Planeación' : event.status === 'ACTIVE' ? 'En Vivo' : 'Finalizado'}
          </span>
        </div>
        
        <h3 className="text-xl font-black text-dark tracking-tighter group-hover:text-accent transition-colors truncate">
          {event.title}
        </h3>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-bold text-dark/40">
          <div className="flex items-center gap-1.5">
            <MapPin size={14} className="text-accent" />
            {event.location}
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={14} />
            {event.dateRange}
          </div>
        </div>
      </div>
      <div className="shrink-0 flex items-center gap-6 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
        <div className="flex flex-col items-center md:items-end">
          <div className="flex items-center gap-2 text-primary font-black text-lg italic">
            <Trophy size={18} />
            {event.tournamentCount}
          </div>
          <p className="text-[10px] font-black text-dark/30 uppercase tracking-widest">Torneos</p>
        </div>

        <div className="h-10 w-10 rounded-xl bg-light/50 flex items-center justify-center text-dark/20 group-hover:bg-accent group-hover:text-white transition-all">
          <ChevronRight size={20} />
        </div>
      </div>
    </div>
  );
};

export default EventCard;