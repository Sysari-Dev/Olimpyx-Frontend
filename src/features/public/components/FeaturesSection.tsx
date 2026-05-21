import { Award, Activity, BarChart3 } from "lucide-react";

export const FeaturesSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-primary text-[10px] font-black uppercase tracking-[0.25em]">
          ¿Qué es Olimpyx?
        </span>
        <h2 className="text-2xl sm:text-4xl font-black tracking-tighter text-dark">
          La central de datos de tu torneo
        </h2>
        <p className="text-xs sm:text-sm text-dark/50 font-medium leading-relaxed">
          Diseñado para digitalizar las competencias locales e institucionales, eliminando las planillas de papel por un ecosistema limpio y moderno.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div className="bg-white border border-dark/10 rounded-2xl p-6 shadow-xs space-y-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-2xs">
              <Activity size={18} />
            </div>
            <h3 className="text-base font-black tracking-tight text-dark">
              Transmisión en tiempo real
            </h3>
            <p className="text-xs text-dark/50 font-medium leading-relaxed">
              Los cambios realizados en la mesa de control se reflejan inmediatamente en la interfaz pública de los espectadores.
            </p>
          </div>
          <div className="bg-dark/2 border border-dark/5 rounded-xl p-3 flex items-center justify-between select-none">
            <span className="text-[10px] font-bold text-dark/40 uppercase">Sistemas</span>
            <div className="flex items-center gap-2 font-black text-sm text-primary italic">
              <span>25</span>
              <span className="text-dark/20 not-italic">-</span>
              <span className="text-dark/40">21</span>
            </div>
            <span className="text-[9px] font-black bg-red-500 text-white px-2 py-0.5 rounded-md uppercase tracking-wider animate-pulse">
              Set 1
            </span>
          </div>
        </div>

        <div className="bg-white border border-dark/10 rounded-2xl p-6 shadow-xs space-y-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary shadow-2xs">
              <BarChart3 size={18} />
            </div>
            <h3 className="text-base font-black tracking-tight text-dark">
              Tablas automatizadas
            </h3>
            <p className="text-xs text-dark/50 font-medium leading-relaxed">
              Los puntos, goles a favor, diferencias y partidos jugados se calculan al instante en cuanto se congela un marcador finalizado.
            </p>
          </div>
          <div className="bg-dark/2 border border-dark/5 rounded-xl p-2.5 space-y-1.5 select-none">
            <div className="flex justify-between text-[9px] font-black text-dark/30 uppercase border-b border-dark/5 pb-1">
              <span>Equipo</span>
              <div className="flex gap-4">
                <span>PJ</span>
                <span>PTS</span>
              </div>
            </div>
            <div className="flex justify-between text-[11px] font-bold text-dark/70">
              <span className="truncate max-w-30">FC Guadalupe</span>
              <div className="flex gap-5 font-black">
                <span>3</span>
                <span className="text-primary">9</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-dark/10 rounded-2xl p-6 shadow-xs space-y-5 flex flex-col justify-between md:col-span-2 lg:col-span-1">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shadow-2xs">
              <Award size={18} />
            </div>
            <h3 className="text-base font-black tracking-tight text-dark">
              Estructura polimórfica
            </h3>
            <p className="text-xs text-dark/50 font-medium leading-relaxed">
              Soporte nativo inteligente para formatos de liga de puntos generales, divisiones en fases de grupos y llaves de eliminación directa.
            </p>
          </div>
          <div className="flex gap-1.5 justify-center flex-wrap select-none">
            <span className="text-[9px] font-black uppercase px-2.5 py-1 bg-dark/5 border border-dark/5 text-dark/60 rounded-lg">
              Liga
            </span>
            <span className="text-[9px] font-black uppercase px-2.5 py-1 bg-dark/5 border border-dark/5 text-dark/60 rounded-lg">
              Grupos
            </span>
            <span className="text-[9px] font-black uppercase px-2.5 py-1 bg-dark/5 border border-dark/5 text-dark/60 rounded-lg">
              Playoffs
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};