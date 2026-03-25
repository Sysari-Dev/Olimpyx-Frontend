import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import TournamentCard from "src/shared/components/molecules/TournamentCard";
import type { SportEvent } from "src/shared/models/event.model";
import type { Tournament } from "src/shared/models/tournament.model";

interface EventDetailSectionProps {
  event?: SportEvent; 
  tournaments: Tournament[];
}

export const EventDetailSection = ({ event, tournaments }: EventDetailSectionProps) => {
  const navigate = useNavigate();

  if (!event) {
    return (
      <div className="p-20 text-center">
        <h1 className="text-2xl font-bold text-dark">Evento no encontrado</h1>
        <button onClick={() => navigate('/explorar')} className="mt-4 text-accent font-bold underline">Volver a eventos</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 pt-8">
      <div className="mb-6 flex">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-dark/60 hover:text-accent transition-colors font-bold text-sm">
          <ArrowLeft size={18} /> Volver a eventos
        </button>
      </div>
      
      <div className="bg-dark rounded-3xl p-8 md:p-10 text-white shadow-2xl mb-10 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full mb-6">
            <Calendar size={14} className="text-accent" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/80">
              {event.startDate} - {event.endDate}
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
                tournament={tournament} 
                onClick={(tId) => navigate(`/torneo/${tId}`)} 
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-light rounded-2xl p-10 text-center">
            <p className="text-dark/40 font-bold">Aún no hay torneos registrados para este evento.</p>
          </div>
        )}
      </div>
    </div>
  );
};