import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Calendar, MapPin, Search, Trophy, ArrowRight, Info } from "lucide-react";
import { useAppSelector } from "@store/hooks";
import { LoadingState } from "@atoms/LoadingState";
import { Button } from "@atoms/Button";
import { InputText } from "@atoms/InputText";
import { useEvent } from "../hooks/useEvent";
import { useSearchEvents } from "../hooks/useSearchEvents";
import { DateParser } from "@utils/date-text";

const EventsManagementPage = () => {
  const navigate = useNavigate();
  const { activeOrg } = useAppSelector((state) => state.auth);
  const { events, isLoading, fetchEvents } = useEvent();
  const { searchQuery, setSearchQuery, filteredEvents } = useSearchEvents(events);

  useEffect(() => {
    if (activeOrg?.id) {
      fetchEvents(activeOrg.id);
    }
  }, [activeOrg?.id, fetchEvents]);

  if (isLoading && events.length === 0) {
    return <LoadingState text="Sincronizando eventos" variant="primary" />;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary">
            <Trophy size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Competencias</span>
          </div>
          <h2 className="text-3xl font-bold text-light tracking-tighter">Gestión de Eventos</h2>
          <p className="text-sm text-gray/60">
            {activeOrg ? `Planificación para ${activeOrg.name}` : "Selecciona una organización"}
          </p>
        </div>
        <Button 
          icon={Plus} 
          showShadow 
          onClick={() => navigate("crear")}
          className="w-full lg:w-auto"
        >
          Nuevo Evento
        </Button>
      </header>
      {activeOrg && (
        <div className="relative w-full md:max-w-md">
          <InputText
            placeholder="Buscar por nombre o lugar..."
            icon={Search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={isLoading}
          />
        </div>
      )}
      {!activeOrg ? (
        <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-white/5 rounded-3xl bg-white/2 text-center px-6">
          <Trophy size={40} className="text-primary/20 mb-6" />
          <p className="text-sm font-bold text-gray/40 uppercase tracking-widest">Sin organización activa</p>
        </div>
      ) : (
        <div className="min-h-[40vh]">
          {filteredEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-white/5 rounded-3xl bg-white/2">
              <Calendar size={48} className="text-gray/10 mb-4" />
              <h3 className="text-light font-bold">No hay resultados</h3>
              <Button variant="outline" icon={Plus} onClick={() => navigate("crear")} className="mt-6">
                Crear Evento
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => navigate(`${event.id}`)}
                  className="group bg-[#1A1A1A] border border-white/5 rounded-xl p-6 flex flex-col gap-6 hover:border-secondary hover:bg-[#1E1E1E] transition-all duration-300 cursor-pointer relative overflow-hidden shadow-2xl shadow-black/40"
                >
                  <div className="flex justify-between items-start relative z-10">
                    <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter border
                      ${event.status === 'ACTIVE' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 
                        event.status === 'PLANNING' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 
                        'bg-white/5 border-white/10 text-gray/60'}`}
                    >
                      {event.status === 'PLANNING' ? 'Planeación' : event.status === 'ACTIVE' ? 'En Curso' : 'Finalizado'}
                    </div>
                    <ArrowRight size={18} className="text-gray/20 group-hover:text-secondary group-hover:translate-x-1 transition-all" />
                  </div>
                  <div className="space-y-2 relative z-10">
                    <h4 className="text-xl font-bold text-light group-hover:text-secondary transition-colors truncate">
                      {event.name}
                    </h4>
                    <p className="text-xs text-gray/40 line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                  <div className="pt-6 border-t border-white/5 flex flex-col gap-3 relative z-10 text-xs text-gray/60 font-medium">
                    <div className="flex items-center gap-3">
                      <MapPin size={14} className="text-primary group-hover:text-secondary transition-colors" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar size={14} className="text-primary group-hover:text-secondary transition-colors" />
                      <span>{DateParser.toNumericDate(event.startDate)} - {DateParser.toNumericDate(event.endDate)}</span>
                    </div>
                  </div>
                  <div className="absolute -right-4 -bottom-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                    <Trophy size={120} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <footer className="pt-0">
        <div className="bg-white/2 border border-white/5 p-4 rounded-2xl flex items-center gap-4">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
            <Info size={18} />
          </div>
          <p className="text-[10px] text-gray/40 leading-tight">
            <span className="font-black text-light uppercase tracking-widest block mb-1">Estructura Olimpyx</span>
            Los eventos centralizan torneos y equipos. Define el nombre, sede y fechas para comenzar.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default EventsManagementPage;