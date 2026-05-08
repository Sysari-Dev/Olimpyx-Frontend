import { Users, Calendar, Activity, Swords, ArrowRight } from "lucide-react";
import type { Tournament } from "src/shared/models/tournament.model";

interface TournamentCardProps {
  tournament: Tournament;
  onClick?: (id: string) => void; 
}

const TournamentCard = ({ tournament, onClick }: TournamentCardProps) => {
  const isVoley = tournament.sport?.name === "Vóley";
  const currentStatus = tournament.event?.status || "PLANNED";
  const startDate = tournament.event?.startDate || "Por definir";
  
  const statusStyles: Record<string, string> = {
    PLANNED: "bg-blue-500/10 text-blue-600",
    ACTIVE: "bg-tertiary/10 text-tertiary animate-pulse",
    FINISHED: "bg-dark/5 text-dark/40",
  };

  return (
    <div
      onClick={() => onClick && onClick(tournament.id)}
      className="bg-white border border-light rounded-xl p-5 flex flex-col justify-between aspect-square hover:shadow-xl hover:border-accent/20 transition-all cursor-pointer group active:scale-95"
    >
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-xl ${isVoley ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`}>
          {isVoley ? <Activity size={24} /> : <Swords size={24} />}
        </div>
        <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-lg tracking-widest ${statusStyles[currentStatus]}`}>
          {currentStatus === "PLANNED" ? "Inscripciones" : currentStatus === "ACTIVE" ? "En Curso" : "Finalizado"}
        </span>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-black text-dark leading-tight group-hover:text-accent transition-colors">
          {tournament.name}
        </h3>
        <p className="text-xs font-bold text-dark/40 uppercase tracking-tighter">
          Formato: {tournament.format}
        </p>
      </div>

      <div className="mt-auto pt-4 border-t border-light/50 flex flex-col gap-2">
        <div className="flex items-center justify-between text-[11px] font-bold text-dark/60">
          <div className="flex items-center gap-1.5">
            <Users size={14} className="text-dark/30" />
            <span>{tournament.teamsCount || 0} Equipos</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-dark/30" />
            <span>{startDate}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[10px] font-black text-accent uppercase opacity-0 group-hover:opacity-100 transition-opacity">
          Ver Torneo <ArrowRight size={12} />
        </div>
      </div>
    </div>
  );
};

export default TournamentCard;