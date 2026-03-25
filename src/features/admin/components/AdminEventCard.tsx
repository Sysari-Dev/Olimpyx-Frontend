import { Calendar, Trophy, Edit2, Trash2, ArrowRight } from "lucide-react";
import type { EventStatus } from "src/shared/models/event.model";

interface AdminEventCardProps {
  id: string;
  name: string;
  description: string;
  status: EventStatus;
  startDate: string;
  endDate: string;
  tournamentCount: number;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onClick: (id: string) => void; 
}

const statusStyles: Record<EventStatus, string> = {
  ACTIVE: "bg-tertiary/10 text-tertiary border-tertiary/20",
  PLANNED: "bg-accent/10 text-accent border-accent/20",
  FINISHED: "bg-dark/5 text-dark/40 border-dark/10",
};

const statusLabels: Record<EventStatus, string> = {
  ACTIVE: "En Curso",
  PLANNED: "Próximamente",
  FINISHED: "Finalizado",
};

export const AdminEventCard = ({ id, name, description, status, startDate, endDate, tournamentCount, onEdit, onDelete, onClick }: AdminEventCardProps) => {
  return (
    <div 
      onClick={() => onClick(id)}
      className="block bg-white border border-light rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 relative cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusStyles[status]}`}>
          {statusLabels[status]}
        </span>
        <div className="w-10 h-10 bg-light/30 rounded-xl flex items-center justify-center text-accent">
          <Trophy size={20} />
        </div>
      </div>
      <h3 className="text-xl font-black text-dark tracking-tight mb-2 flex items-center gap-2 group-hover:text-accent transition-colors">
        {name}
        <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
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

        <div className="flex gap-2">
          <button 
            onClick={(e) => { e.stopPropagation(); onEdit(id); }}
            className="w-10 h-10 rounded-xl bg-light/50 text-dark/60 flex items-center justify-center hover:bg-accent hover:text-white transition-colors"
            title="Editar evento"
          >
            <Edit2 size={16} strokeWidth={2.5} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete(id); }}
            className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
            title="Eliminar evento"
          >
            <Trash2 size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};