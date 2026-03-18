import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import { TournamentCard } from "@molecules/TournamentCard";

const EVENTS_MOCK = [
  { id: "evt-1", name: "Intercarreras UNAMBA", description: "Olimpiadas generales de la Universidad. Todas las facultades compiten por la copa general.", startDate: "15 Mar", endDate: "30 Mar", status: "ACTIVE" },
  { id: "evt-2", name: "Intercódigos Ing Sistemas 26-1", description: "Campeonato interno de confraternidad.", startDate: "10 Abr", endDate: "15 Abr", status: "UPCOMING" }
];

const TOURNAMENTS_MOCK = [
  { id: "t1", idEvent: "evt-1", sport: "Vóley", name: "Vóley Femenino", format: "Fase de Grupos", teamsCount: 8 },
  { id: "t2", idEvent: "evt-1", sport: "Futsal", name: "Futsal Varones", format: "Eliminación Directa", teamsCount: 16 },
  { id: "t3", idEvent: "evt-1", sport: "Básquet", name: "Básquet Mixto", format: "Todos contra Todos", teamsCount: 6 },
  { id: "t4", idEvent: "evt-2", sport: "Futsal", name: "Futsal Libre", format: "Fase de Grupos", teamsCount: 12 },
];

export const EventDetailSection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const event = EVENTS_MOCK.find(e => e.id === id);
  const tournaments = TOURNAMENTS_MOCK.filter(t => t.idEvent === id);

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
          <div className="flex flex-col gap-4">
            {tournaments.map((tournament) => (
              <TournamentCard key={tournament.id} {...tournament} />
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