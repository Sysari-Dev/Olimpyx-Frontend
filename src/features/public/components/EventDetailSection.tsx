import { useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";
import TournamentCard from "src/shared/components/molecules/TournamentCard";
import type { PublicEvent, PublicTournamentBasic} from "../models/public-api.model";

interface EventDetailSectionProps {
  event?: PublicEvent; 
  tournaments: PublicTournamentBasic[];
}

export const EventDetailSection = ({ event, tournaments }: EventDetailSectionProps) => {
  const navigate = useNavigate();

  if (!event) return null;

  return (
    <div className="max-w-4xl mx-auto px-6 pt-8">
      {/* ... botón de volver ... */}
      
      <div className="bg-dark rounded-3xl p-8 md:p-10 text-white shadow-2xl mb-10 relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full mb-6">
            <Calendar size={14} className="text-accent" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/80">
              {new Date(event.start_date).toLocaleDateString()} - {new Date(event.end_date).toLocaleDateString()}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 leading-tight">
            {event.name}
          </h1>
          <p className="text-white/60 font-medium max-w-2xl text-sm md:text-base">
            {event.description}
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-black text-dark mb-6 tracking-tight">
          Torneos del Evento <span className="text-dark/40 font-medium text-lg ml-2">({tournaments.length})</span>
        </h3>
        
        {tournaments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {tournaments.map((tournament) => (
              <TournamentCard 
                key={tournament.id} 
                // Asegúrate de que tu TournamentCard acepte este formato simplificado
                tournament={tournament} 
                onClick={(tId) => navigate(`/torneo/${tId}`)} 
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-light rounded-2xl p-10 text-center">
            <p className="text-dark/40 font-bold">Aún no hay torneos registrados.</p>
          </div>
        )}
      </div>
    </div>
  );
};