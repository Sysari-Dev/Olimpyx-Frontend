import { usePublic } from "../hooks/usePublic";
import { LoadingState } from "@atoms/LoadingState";
import { EventsSection } from "../components/EventsSection";
import { Trophy } from "lucide-react";

export const EventsPage = () => {
  const { events, isLoading } = usePublic();

  if (isLoading) return <LoadingState variant="tertiary" text="Cargando eventos oficiales..." />;

  return (
    <div className="w-full min-h-screen bg-[#FBFBFB] text-dark font-sans antialiased pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        <header className="bg-white border border-dark/10 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 select-none">
              <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                <Trophy size={14} />
              </div>
              <span className="text-[10px] font-black uppercase text-primary tracking-widest">
                Competiciones Activas
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tighter">
              Explora los <span className="text-primary">Eventos</span>
            </h1>
            <p className="text-xs text-dark/50 font-medium max-w-xl leading-relaxed">
              Descubre y sigue los torneos internos, ligas intercarreras y competencias deportivas más importantes organizadas en la plataforma.
            </p>
          </div>
        </header>

        <main>
          {events && events.length > 0 ? (
            <EventsSection events={events} />
          ) : (
            <div className="py-24 flex flex-col items-center justify-center bg-white rounded-2xl border border-dark/10 max-w-xl mx-auto px-6 text-center shadow-xs animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-4">
                <Trophy size={22} />
              </div>
              <h3 className="text-sm font-black uppercase tracking-wider text-dark mb-1">
                No hay eventos disponibles
              </h3>
              <p className="text-xs text-dark/40 font-medium leading-relaxed">
                Actualmente no se registran encuentros o eventos deportivos globales programados en el sistema.
              </p>
            </div>
          )}
        </main>

      </div>
    </div>
  );
};

export default EventsPage;