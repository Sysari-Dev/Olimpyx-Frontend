import { type PublicTournamentBasic } from "@features/public/models/public-api.model";
import { Users, Calendar, Activity} from "lucide-react";

interface TournamentCardProps {
  tournament: PublicTournamentBasic;
  onClick?: (id: string) => void; 
}

const TournamentCard = ({ tournament, onClick }: TournamentCardProps) => {
  // Ahora usamos solo lo que el JSON nos da
  const { name, format, status } = tournament;
  
  const statusStyles: Record<string, string> = {
    ACTIVE: "bg-tertiary/10 text-tertiary animate-pulse",
    FINISHED: "bg-dark/5 text-dark/40",
    PLANNING: "bg-blue-500/10 text-blue-600"
  };
  const FORMAT_TRANSLATION: Record<string, string> = {
  ROUND_ROBIN: "Todos contra Todos",
  GROUP_STAGE: "Fase de Grupos",
  ELIMINATION: "Eliminación Directa",
  };
  return (
    <div
      onClick={() => onClick && onClick(tournament.id)}
      className="bg-white border border-light rounded-xl p-5 flex flex-col justify-between aspect-square hover:shadow-xl hover:border-accent/20 transition-all cursor-pointer group active:scale-95"
    >
      <div className="flex justify-between items-start">
        <div className="p-3 rounded-xl bg-accent/10 text-accent">
          <Activity size={24} />
        </div>
        <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-lg tracking-widest ${statusStyles[status] || "bg-gray-100 text-gray-500"}`}>
          {status === "ACTIVE" ? "En Curso" : status === "FINISHED" ? "Finalizado" : "Próximamente"}
        </span>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-black text-dark leading-tight group-hover:text-accent transition-colors">
          {name}
        </h3>
        <p className="text-xs font-bold text-dark/40 uppercase tracking-tighter">
          Formato: {FORMAT_TRANSLATION[format] || format}
        </p>
      </div>

      <div className="mt-auto pt-4 border-t border-light/50 flex items-center justify-between text-[11px] font-bold text-dark/60">
        <div className="flex items-center gap-1.5">
          <Users size={14} className="text-dark/30" />
          <span>N/A</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar size={14} className="text-dark/30" />
          <span>Sin fecha</span>
        </div>
      </div>
    </div>
  );
};

export default TournamentCard;