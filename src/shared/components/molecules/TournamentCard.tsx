import { type PublicTournamentBasic } from "@features/public/models/public-api.model";
import { Calendar, Activity, ChevronRight, Award } from "lucide-react";

interface TournamentCardProps {
  tournament: PublicTournamentBasic;
  onClick?: (id: string) => void; 
}

const statusStyles: Record<string, string> = {
  ACTIVE: "bg-primary/10 text-primary border-primary/20",
  FINISHED: "bg-dark/5 text-dark/40 border-dark/10",
  PLANNING: "bg-blue-500/10 text-blue-600 border-blue-500/20",
};

const statusLabels: Record<string, string> = {
  ACTIVE: "En Curso",
  FINISHED: "Finalizado",
  PLANNING: "Fase de Cierre",
};

const FORMAT_TRANSLATION: Record<string, string> = {
  ROUND_ROBIN: "Liga de puntos",
  GROUP_STAGE: "Fase de Grupos",
  ELIMINATION: "Eliminatoria Directa",
};

export const TournamentCard = ({ tournament, onClick }: TournamentCardProps) => {
  const { name, format, status } = tournament;

  return (
    <div
      onClick={() => onClick && onClick(tournament.id)}
      className="bg-white border border-dark/10 rounded-2xl p-5 flex flex-col justify-between h-auto sm:aspect-square hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group active:scale-98 text-dark relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-primary/5 group-hover:bg-primary/20 transition-colors" />

      <div className="flex justify-between items-center gap-4 mb-4 sm:mb-0">
        <div className="w-9 h-9 rounded-xl bg-dark/5 border border-dark/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-xs shrink-0">
          <Activity size={16} />
        </div>
        <span className={`text-[9px] font-black uppercase px-2.5 py-0.5 rounded-md tracking-wider border shrink-0 ${statusStyles[status] || "bg-dark/5 text-dark/40"}`}>
          {statusLabels[status] || "Programado"}
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-center min-w-0 my-3 sm:my-0">
        <h3 className="text-base font-black tracking-tight leading-tight mb-1.5 group-hover:text-primary transition-colors line-clamp-2">
          {name}
        </h3>
        <div className="flex items-center gap-1.5 text-dark/40">
          <Award size={12} className="shrink-0 text-primary" />
          <p className="text-[10px] font-black uppercase tracking-wider truncate">
            {FORMAT_TRANSLATION[format] || format}
          </p>
        </div>
      </div>

      <div className="mt-auto pt-3.5 border-t border-dark/5 flex items-center justify-between select-none">
        <div className="flex items-center gap-1.5 text-[9px] font-black text-dark/30 uppercase tracking-wider">
          <Calendar size={12} className="shrink-0" />
          <span>Fase Regular</span>
        </div>
        
        <div className="w-7 h-7 rounded-full bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
          <ChevronRight size={14} strokeWidth={3} />
        </div>
      </div>
    </div>
  );
};

export default TournamentCard;