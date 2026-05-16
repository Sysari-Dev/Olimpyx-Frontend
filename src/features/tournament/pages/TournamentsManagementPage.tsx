import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Plus, LayoutGrid, Info, Swords, Trophy, Users, Target, ArrowRight } from "lucide-react";
import { useAppSelector } from "@store/hooks";
import { useEvent } from "@features/events/hooks/useEvent";
import { useTournament } from "../hooks/useTournament";
import { EventSwitcher } from "../components/EventSwitcher";
import { LoadingState } from "@atoms/LoadingState";
import { Button } from "@atoms/Button";

const TournamentsManagementPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");

  const { activeOrg } = useAppSelector((state) => state.auth);
  const { events, fetchEvents, isLoading: isLoadingEvents } = useEvent();
  const { tournaments, fetchTournamentsByEvent, isLoading: isLoadingTournaments } = useTournament();

  useEffect(() => {
    if (activeOrg?.id) fetchEvents(activeOrg.id);
  }, [activeOrg?.id, fetchEvents]);

  useEffect(() => {
    if (eventId) fetchTournamentsByEvent(eventId);
  }, [eventId, fetchTournamentsByEvent]);

  useEffect(() => {
    if (events.length > 0 && !eventId) {
      setSearchParams({ eventId: events[0].id });
    }
  }, [events, eventId, setSearchParams]);

  const handleEventChange = (newId: string) => {
    setSearchParams({ eventId: newId });
  };

  if (isLoadingEvents) return <LoadingState text="Cargando entorno..." />;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary">
            <LayoutGrid size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Workspace</span>
          </div>
          <h2 className="text-3xl font-bold text-light tracking-tighter">Gestión de Torneos</h2>
        </div>

        {events.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <EventSwitcher 
              events={events} 
              selectedId={eventId} 
              onSelect={handleEventChange} 
            />
            <Button icon={Plus} showShadow onClick={() => navigate(`crear?eventId=${eventId}`)}>
              Nuevo Torneo
            </Button>
          </div>
        )}
      </header>
      {!activeOrg ? (
        <div className="p-20 text-center border-2 border-dashed border-white/5 rounded-lg bg-white/1">
           <p className="text-gray/40 text-xs font-black uppercase tracking-widest">Selecciona una organización</p>
        </div>
      ) : events.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white/2 border-2 border-dashed border-white/5 rounded-lg">
          <Info size={40} className="text-primary/20 mb-4" />
          <h3 className="text-light font-bold">No tienes eventos creados</h3>
          <p className="text-gray/40 text-sm mb-8 text-center max-w-xs leading-relaxed">
            Los torneos deben pertenecer a un contenedor. Crea tu primer evento para comenzar la planificación.
          </p>
          <Button onClick={() => navigate("/admin/eventos/crear")}>Ir a Eventos</Button>
        </div>
      ) : (
        <main className="min-h-[50vh]">
          {isLoadingTournaments ? (
            <div className="py-20 flex justify-center">
              <LoadingState text="Sincronizando competiciones..." variant="secondary" />
            </div>
          ) : tournaments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-white/5 rounded-lg bg-[#1A1A1A] group">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                <Swords size={32} className="text-gray/20" />
              </div>
              <p className="text-gray/40 text-sm font-medium mb-8">Este evento aún no tiene torneos configurados.</p>
              <Button variant="outline" icon={Plus} onClick={() => navigate(`crear?eventId=${eventId}`)}>
                Configurar Torneo
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {tournaments.map((t) => (
                <div 
                  key={t.id} 
                  onClick={() => navigate(`${t.id}`)}
                  className="group relative bg-[#1A1A1A] border border-white/5 p-6 rounded-lg hover:border-secondary/40 transition-all duration-300 cursor-pointer overflow-hidden shadow-2xl shadow-black/40 flex flex-col justify-between min-h-45"
                >
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-tighter border
                        ${t.status === 'ACTIVE' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 
                          t.status === 'PLANNING' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 
                          t.status === 'INACTIVE' ? 'bg-red-500/10 border-red-500/20 text-red-500' :
                          'bg-white/5 border-white/10 text-gray/40'}`}
                      >
                        {t.status}
                      </div>
                      <ArrowRight size={16} className="text-gray/20 group-hover:text-secondary group-hover:translate-x-1 transition-all" />
                    </div>
                    <h4 className="text-light font-bold text-lg group-hover:text-secondary transition-colors leading-tight line-clamp-2">
                      {t.name}
                    </h4>
                  </div>
                  <div className="relative z-10 mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray/40 uppercase tracking-widest">
                      <Target size={14} className="text-secondary/60" />
                      <span>{t.sportName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-light/40 uppercase tracking-tighter bg-white/5 px-2 py-1 rounded">
                      <Users size={12} className="text-secondary/60" />
                      <span>{t.teamCount} Equipos</span>
                    </div>
                  </div>
                  <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.07] group-hover:scale-110 transition-all duration-500 pointer-events-none">
                    <Trophy size={120} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      )}
    </div>
  );
};

export default TournamentsManagementPage;