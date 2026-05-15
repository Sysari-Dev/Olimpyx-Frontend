import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Trophy, Calendar, MapPin, Pencil, Power, 
  ArrowLeft, Layout, Users, Swords, Info, AlertTriangle, CheckCircle2, Clock
} from "lucide-react";
import { useEvent } from "../hooks/useEvent";
import { LoadingState } from "@atoms/LoadingState";
import { Button } from "@atoms/Button";
import BaseModal from "@atoms/BaseModal";
import { type Event } from "@models/event.model";
import { getEventStatusAnalysis } from "@utils/event-status.util";
import { DateParser } from "@utils/date-text";

const EventDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEventDetail, fetchEventStats, updateStatus, isLoading } = useEvent();
  
  const [event, setEvent] = useState<Event | null>(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const loadData = async () => {
        const detail = await getEventDetail(id);
        if (detail) setEvent(detail);
        await fetchEventStats(id);
      };
      loadData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
 
  const handleToggleStatus = async () => {
    if (!event) return;
    const newStatus = event.status === 'PLANNING' ? 'ACTIVE' : 'PLANNING';
    const success = await updateStatus(event.id, newStatus);
    if (success) {
      setEvent({ ...event, status: newStatus });
      setIsStatusModalOpen(false);
    }
  };

  if (isLoading && !event) return <LoadingState text="Cargando detalles" />;
  if (!event) return <div className="text-center p-20 text-gray">Evento no encontrado</div>;

  const analysis = getEventStatusAnalysis(event.startDate, event.endDate, event.status);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-4">
          <button 
            onClick={() => navigate("/admin/eventos")}
            className="flex items-center gap-2 text-gray/40 hover:text-primary transition-colors text-[10px] font-black uppercase tracking-widest cursor-pointer"
          >
            <ArrowLeft size={14} /> Volver a eventos
          </button>
          <div className="flex items-center gap-4">
            <h2 className="text-3xl md:text-4xl font-bold text-light tracking-tighter leading-none">
              {event.name}
            </h2>
            <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border
              ${event.status === 'ACTIVE' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-amber-500/10 border-amber-500/20 text-amber-500'}`}
            >
              {event.status === 'PLANNING' ? 'Planeación' : 'Activo'}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" icon={Pencil} onClick={() => navigate("editar")} className="flex-1 lg:flex-none">
            Editar
          </Button>
          <Button icon={Power} onClick={() => setIsStatusModalOpen(true)} className="flex-1 lg:flex-none">
            {event.status === 'PLANNING' ? 'Activar' : 'Pausar'}
          </Button>
        </div>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-500/5 border border-blue-500/10 p-6 rounded-lg flex items-center justify-between group hover:border-blue-500/30 transition-all">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-blue-500/60 uppercase tracking-widest">Torneos</p>
            <p className="text-3xl font-bold text-light">{event.stats?.totalTournaments || 0}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
            <Layout size={24} />
          </div>
        </div>
        <div className="bg-purple-500/5 border border-purple-500/10 p-6 rounded-lg flex items-center justify-between group hover:border-purple-500/30 transition-all">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-purple-500/60 uppercase tracking-widest">Equipos</p>
            <p className="text-3xl font-bold text-light">{event.stats?.totalTeams || 0}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
            <Users size={24} />
          </div>
        </div>
        <div className="bg-amber-500/5 border border-amber-500/10 p-6 rounded-lg flex items-center justify-between group hover:border-amber-500/30 transition-all sm:col-span-2 lg:col-span-1">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-amber-500/60 uppercase tracking-widest">Partidos</p>
            <p className="text-3xl font-bold text-light">{event.stats?.remainingMatches || 0}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
            <Swords size={24} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-[#1A1A1A] border border-white/5 p-8 rounded-lg space-y-8 shadow-2xl">
            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Descripción</h3>
              <p className="text-light leading-relaxed text-lg font-medium">
                {event.description}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-primary shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray/40 uppercase tracking-widest mb-1">Sede Principal</p>
                  <p className="text-light font-medium">{event.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-primary shrink-0">
                    <Calendar size={20} />
                </div>
                <div>
                    <p className="text-[10px] font-black text-gray/40 uppercase tracking-widest mb-1">Cronograma</p>
                    <p className="text-light font-medium">
                    {DateParser.toLongDate(event.startDate)} — {DateParser.toLongDate(event.endDate)}
                    </p>
                </div>
                </div>
            </div>
          </section>
        </div>
        <div className="space-y-6">
          <div className="bg-white/2 border border-white/5 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Info size={16} className="text-primary" />
              <h4 className="text-xs font-black uppercase text-light tracking-widest">Información del Sistema</h4>
            </div>
            <p className="text-xs text-gray/40 leading-relaxed">
              Este evento se encuentra bajo la gestión de <strong>Olimpyx</strong>. 
              {event.status === 'PLANNING' 
                ? ' Actualmente en fase de planeación, permitiendo ajustes estructurales en torneos y equipos.' 
                : ' El evento está en curso; la modificación de ciertos parámetros puede estar restringida.'}
            </p>
          </div>
          <div className={`p-6 rounded-lg border ${analysis.bg} ${analysis.border} space-y-4`}>
            <div className="flex items-center gap-3">
              <div className={analysis.color}>
                {analysis.type === 'error' && <AlertTriangle size={18} />}
                {analysis.type === 'warning' && <Clock size={18} />}
                {analysis.type === 'success' && <CheckCircle2 size={18} />}
                {analysis.type === 'neutral' && <Trophy size={18} />}
              </div>
              <h5 className={`text-[11px] font-black uppercase tracking-widest ${analysis.color}`}>
                {analysis.title}
              </h5>
            </div>
            <p className="text-xs text-light font-medium leading-relaxed">
              {analysis.message}
            </p>
          </div>
        </div>
      </div>
      <BaseModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        onConfirm={handleToggleStatus}
        title={event.status === 'PLANNING' ? 'Activar Evento' : 'Volver a Planeación'}
        description={
          event.status === 'PLANNING' 
            ? '¿Deseas activar el evento? Esto permitirá que los torneos sean visibles para el público.' 
            : '¿Deseas poner el evento en planeación? Esto pausará la actualización de resultados públicos.'
        }
        confirmText={event.status === 'PLANNING' ? 'Activar Ahora' : 'Pausar Evento'}
        variant={event.status === 'PLANNING' ? 'primary' : 'danger'}
      />
    </div>
  );
};

export default EventDetailPage;