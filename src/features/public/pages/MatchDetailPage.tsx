import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Shield, Clock, Award } from "lucide-react";
import { usePublicMatchDetail } from "../hooks/usePublicMatchDetail";
import { LoadingState } from "@atoms/LoadingState";

export const MatchDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { match, isLoading } = usePublicMatchDetail(id || "");

  if (isLoading) {
    return <LoadingState text="Sincronizando mesa de control" variant="tertiary" />;
  }

  if (!match) {
    return (
      <div className="min-h-[70vh] bg-[#FBFBFB] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-4">
          <Shield size={28} />
        </div>
        <h1 className="text-2xl font-black text-dark tracking-tight">Encuentro no disponible</h1>
        <p className="text-xs text-dark/50 font-medium max-w-sm mt-1 leading-relaxed">
          El partido solicitado no se encuentra registrado en el sistema, fue cancelado o aún no ha sido programado.
        </p>
        <button 
          onClick={() => navigate("/en-vivo")} 
          className="mt-6 bg-primary text-white font-black text-xs uppercase tracking-wider px-5 h-11 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 active:scale-95 transition-all cursor-pointer"
        >
          Ver partidos en vivo
        </button>
      </div>
    );
  }

  const team1Name = match.team1?.name || "Por definir";
  const team2Name = match.team2?.name || "Por definir";

  const statusConfig = {
    PENDING: { label: "Programado", styles: "bg-white/20 text-white border-white/30" },
    IN_PROGRESS: { label: "En vivo", styles: "bg-secondary text-dark-black border-transparent font-black animate-pulse" },
    SUSPENDED: { label: "Suspendido", styles: "bg-amber-500 text-white border-transparent" },
    FINISHED: { label: "Finalizado", styles: "bg-black/20 text-white/60 border-white/10" },
  };

  const currentStatus = statusConfig[match.status] || statusConfig.PENDING;

  return (
    <div className="w-full min-h-screen bg-[#FBFBFB] text-dark font-sans antialiased pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        
        <header className="flex items-center justify-between gap-4">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-dark/50 hover:text-primary transition-colors font-black text-xs uppercase tracking-wider cursor-pointer"
          >
            <ArrowLeft size={16} /> 
            <span>Volver</span>
          </button>
        </header>
        <section className="bg-linear-to-br from-primary via-accent to-tertiary text-white rounded-[2.5rem] p-6 sm:p-10 shadow-xl shadow-primary/20 flex flex-col justify-center items-center gap-6 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-secondary/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex flex-col items-center text-center space-y-2 relative z-10">
            <span className="text-secondary text-[10px] font-black uppercase tracking-[0.25em]">
              {match.tournament?.event.name || "Evento Corporativo"}
            </span>
            <h2 className="text-white/70 text-xs font-black uppercase tracking-wider">
              {match.tournament?.sport.name || "Competencia"}
            </h2>
            <div className={`px-3 py-0.5 border rounded-full text-[9px] font-black uppercase tracking-widest mt-2 ${currentStatus.styles}`}>
              {currentStatus.label}
            </div>
          </div>

          <div className="w-full flex items-center justify-between gap-4 max-w-2xl mx-auto py-4 relative z-10">
            <div className="flex-1 flex flex-col items-center text-center min-w-0">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white border border-white/10 mb-3 shadow-inner">
                <Shield size={24} className="fill-white/5" />
              </div>
              <h3 className="text-sm sm:text-xl font-black tracking-tight text-white leading-tight line-clamp-2">
                {team1Name}
              </h3>
            </div>

            <div className="flex items-center gap-4 sm:gap-8 shrink-0 select-none">
              <span className="text-5xl sm:text-7xl font-black tracking-tighter tabular-nums drop-shadow-md">
                {match.scoreTeam1}
              </span>
              <span className="text-white/20 font-black text-xl sm:text-3xl italic tracking-widest">
                VS
              </span>
              <span className="text-5xl sm:text-7xl font-black tracking-tighter tabular-nums drop-shadow-md">
                {match.scoreTeam2}
              </span>
            </div>

            <div className="flex-1 flex flex-col items-center text-center min-w-0">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white border border-white/10 mb-3 shadow-inner">
                <Shield size={24} className="fill-white/5" />
              </div>
              <h3 className="text-sm sm:text-xl font-black tracking-tight text-white leading-tight line-clamp-2">
                {team2Name}
              </h3>
            </div>
          </div>

          {match.roundName && (
            <div className="bg-white/10 border border-white/10 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/70 backdrop-blur-xs relative z-10">
              {match.roundName}
            </div>
          )}
        </section>

        <div className="bg-linear-to-br from-white to-dark/1 border border-primary rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs relative">
          <div className="absolute right-6 top-6 w-24 h-24 bg-tertiary/5 rounded-full blur-xl pointer-events-none" />
          
          <h4 className="font-black text-xs uppercase tracking-wider text-dark/60 border-b border-dark/5 pb-3">
            Detalles del Partido
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-4 bg-dark/2 border border-dark/5 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <MapPin size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-black uppercase text-dark/40 tracking-wider leading-none mb-1">Ubicación</p>
                <p className="text-sm font-bold text-dark truncate">{match.tournament?.event.location || "Por definir"}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-dark/2 border border-dark/5 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary shrink-0">
                <Award size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-black uppercase text-dark/40 tracking-wider leading-none mb-1">Fase / Etapa</p>
                <p className="text-sm font-bold text-dark truncate">{match.stage?.name || "Etapa General"}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-dark/2 border border-dark/5 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                <Clock size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-black uppercase text-dark/40 tracking-wider leading-none mb-1">Formato</p>
                <p className="text-sm font-bold text-dark truncate">{match.tournament?.format === "ROUND_ROBIN" ? "Liga de puntos" : "Eliminatoria Directa"}</p>
              </div>
            </div>

            {match.matchDate && (
              <div className="flex items-start gap-4 p-4 bg-dark/2 border border-dark/5 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center text-primary shrink-0">
                  <Calendar size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-black uppercase text-dark/40 tracking-wider leading-none mb-1">Programación</p>
                  <p className="text-sm font-bold text-dark truncate">
                    {new Date(match.matchDate).toLocaleDateString()} - {new Date(match.matchDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default MatchDetailPage;