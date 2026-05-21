import { useParams, useNavigate } from "react-router-dom";
import { EventDetailSection } from "../components/EventDetailSection";
import { usePublic } from "../hooks/usePublic";
import { LoadingState } from "@atoms/LoadingState";
import { ArrowLeft, ShieldAlert } from "lucide-react";

export const EventDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { events, isLoading } = usePublic();

  if (isLoading) return <LoadingState text="Cargando información del evento..." variant="tertiary" />;

  const currentEvent = events.find((e) => e.id === id);

  if (!currentEvent) {
    return (
      <div className="min-h-[70vh] bg-[#FBFBFB] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-4">
          <ShieldAlert size={22} />
        </div>
        <h1 className="text-xl font-black text-dark tracking-tight">Evento no disponible</h1>
        <p className="text-xs text-dark/40 font-medium max-w-sm mt-1 leading-relaxed">
          El evento solicitado no se encuentra registrado en el sistema, fue archivado o el enlace es incorrecto.
        </p>
        <button 
          onClick={() => navigate("/explorar")} 
          className="mt-6 bg-primary text-white font-black text-xs uppercase tracking-wider px-5 h-10 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 active:scale-95 transition-all cursor-pointer"
        >
          Volver a explorar
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#FBFBFB] text-dark font-sans antialiased pb-16 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-dark/50 hover:text-primary transition-colors font-black text-xs uppercase tracking-wider mb-4 cursor-pointer"
        >
          <ArrowLeft size={14} /> 
          <span>Volver</span>
        </button>
      </div>
      <EventDetailSection
        event={currentEvent} 
        tournaments={currentEvent.tournaments || []}
      />
    </div>
  );
};

export default EventDetailPage;