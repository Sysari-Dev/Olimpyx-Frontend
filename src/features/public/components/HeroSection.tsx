import { ArrowRight, Play, CheckCircle2 } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-light to-white/0 flex items-center min-h-[80vh]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-tertiary/15 rounded-full blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10 w-full">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-primary/10 px-4 py-1.5 rounded-full mb-6 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
            </span>
            <span className="text-xs font-bold text-dark/70 uppercase tracking-wider">
              Disponible para Municipalidades y Gobiernos
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-dark tracking-tighter mb-6 max-w-4xl leading-[0.9]">
            El deporte local, <br />
            <span className="text-accent">ahora en tiempo real.</span>
          </h1>
          <p className="text-lg md:text-xl text-dark/60 max-w-2xl mb-8 leading-relaxed">
            La plataforma integral para gestionar torneos y transmitir
            resultados en vivo. Conecta a tu comunidad con la pasión de cada
            partido.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <button className="bg-accent text-white px-10 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 transition-all shadow-xl shadow-accent/30 group">
              Explorar Partidos
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="flex items-center gap-3 px-8 py-4 text-dark font-bold hover:bg-white/50 rounded-2xl transition-colors border border-transparent hover:border-light">
              <div className="w-10 h-10 bg-white border border-light rounded-full flex items-center justify-center shadow-sm">
                <Play size={16} className="text-accent fill-accent" />
              </div>
              Ver Demo
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 border-t border-dark/5 pt-10 w-full max-w-5xl">
            <BenefitItem
              icon={<CheckCircle2 className="text-tertiary" size={22} />}
              text="Actualización Instantánea"
            />
            <BenefitItem
              icon={<CheckCircle2 className="text-tertiary" size={22} />}
              text="Gestión Multideporte"
            />
            <BenefitItem
              icon={<CheckCircle2 className="text-tertiary" size={22} />}
              text="Acceso Institucional"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const BenefitItem = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => (
  <div className="flex items-center justify-center gap-3 text-dark/80 font-semibold text-sm md:text-base">
    {icon}
    {text}
  </div>
);

export default HeroSection;
