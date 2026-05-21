import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Trophy } from "lucide-react";
import type { PublicEvent, PublicTournamentBasic } from "../models/public-api.model";
import TournamentCard from "@molecules/TournamentCard";

interface EventDetailSectionProps {
  event: PublicEvent; 
  tournaments: PublicTournamentBasic[];
}

export const EventDetailSection = ({ event, tournaments }: EventDetailSectionProps) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      <div className="bg-dark-black rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col justify-center gap-6 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-tertiary/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap gap-2">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded-xl">
              <Calendar size={12} className="text-secondary" />
              <span className="text-[10px] font-black uppercase tracking-wider text-white/80">
                {new Date(event.start_date).toLocaleDateString()} - {new Date(event.end_date).toLocaleDateString()}
              </span>
            </div>
            
            {event.location && (
              <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-xl">
                <MapPin size={12} className="text-secondary" />
                <span className="text-[10px] font-black uppercase tracking-wider text-white/80">
                  {event.location}
                </span>
              </div>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight max-w-4xl">
            {event.name}
          </h1>
          
          {event.description && (
            <p className="text-white/60 font-medium max-w-3xl text-xs sm:text-sm leading-relaxed">
              {event.description}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-2 px-1">
          <Trophy size={16} className="text-primary" />
          <h3 className="text-xs font-black uppercase tracking-wider text-dark/60">
            Torneos activos
            <span className="bg-primary/10 text-primary text-[10px] font-black px-2 py-0.5 rounded-md ml-2">
              {tournaments.length}
            </span>
          </h3>
        </div>
        
        {tournaments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {tournaments.map((tournament) => (
              <TournamentCard 
                key={tournament.id} 
                tournament={tournament} 
                onClick={(tId) => navigate(`/torneo/${tId}`)} 
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-dark/10 rounded-2xl p-12 text-center max-w-md mx-auto shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-dark/5 flex items-center justify-center text-dark/40 mx-auto mb-3">
              <Trophy size={18} />
            </div>
            <p className="text-xs text-dark/40 font-black uppercase tracking-wider">Aún no hay torneos creados</p>
            <p className="text-[11px] text-dark/30 font-medium mt-0.5">Las llaves y fases de este evento se configurarán próximamente.</p>
          </div>
        )}
      </div>

    </div>
  );
};