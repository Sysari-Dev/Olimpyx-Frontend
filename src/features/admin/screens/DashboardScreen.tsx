import { 
  Trophy, 
  Swords, 
  Users, 
  TrendingUp, 
  Plus, 
  Calendar, 
  Activity, 
  ChevronRight,
  ArrowUpRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardScreen = () => {
  const navigate=useNavigate();
  const stats = [
    { label: "Eventos activos", value: "3", icon: Trophy, color: "text-accent", bg: "bg-accent/10" },
    { label: "Partidos hoy", value: "12", icon: Swords, color: "text-primary", bg: "bg-primary/10" },
    { label: "Total miembros", value: "124", icon: Users, color: "text-tertiary", bg: "bg-tertiary/10" },
    { label: "Crecimiento", value: "+12%", icon: TrendingUp, color: "text-green-500", bg: "bg-green-500/10" },
  ];

  const shortcuts = [
    { title: "Nuevo partido", desc: "Programa un encuentro", icon: Plus, action: () => {} },
    { title: "Crear evento", desc: "Inicia una festividad", icon: Calendar, action: () => navigate('evento/nuevo')},
    { title: "Ver torneos", desc: "Gestionar categorías", icon: Trophy, action: () => {} },
  ];

  return (
    <div className="h-full flex flex-col gap-8 animate-fade-in pb-10 overflow-y-auto pr-2 custom-scrollbar">
      <div className="shrink-0">
        <h1 className="text-3xl font-black text-dark tracking-tighter">¡Hola, Luis Fernando!</h1>
        <p className="text-dark/40 font-medium">Aquí tienes el resumen de <span className="text-accent font-bold">Olimpyx</span> para hoy.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-light flex items-center gap-4 shadow-sm">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-dark/30 tracking-widest leading-none mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-dark tracking-tight">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <h2 className="text-sm font-black text-dark/40 uppercase tracking-widest px-1">Atajos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {shortcuts.map((short, i) => (
            <button 
              key={i}
              onClick={short.action}
              className="bg-white border border-light p-5 rounded-xl flex items-center justify-between group hover:border-accent hover:shadow-xl hover:shadow-accent/5 transition-all cursor-pointer text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-dark text-white rounded-lg flex items-center justify-center group-hover:bg-accent transition-colors">
                  <short.icon size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-dark leading-none">{short.title}</h4>
                  <p className="text-[11px] text-dark/40 font-bold mt-1 uppercase tracking-tighter">{short.desc}</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-dark/20 group-hover:text-accent group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-black text-dark/40 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-tertiary rounded-full animate-ping" /> En Vivo Ahora
            </h2>
            <button className="text-[10px] font-black text-accent uppercase flex items-center gap-1 hover:underline">
              Ir a la consola <ArrowUpRight size={12} />
            </button>
          </div>          
          <div className="bg-dark rounded-xl p-6 text-white relative overflow-hidden shadow-2xl shadow-dark/20">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Activity size={120} />
            </div>            
            <div className="relative z-10 space-y-6">
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/40">
                <span>Liga Distrital Abancay</span>
                <span className="bg-tertiary text-white px-2 py-0.5 rounded-lg animate-pulse">2do Tiempo</span>
              </div>              
              <div className="flex justify-between items-center text-center">
                <div className="flex-1">
                  <p className="text-xl font-black italic">Miguel Grau</p>
                  <p className="text-[10px] font-bold text-white/30 uppercase">Local</p>
                </div>
                <div className="px-6">
                  <p className="text-4xl font-black tracking-tighter text-tertiary">2 - 1</p>
                </div>
                <div className="flex-1">
                  <p className="text-xl font-black italic">DEA Abancay</p>
                  <p className="text-[10px] font-bold text-white/30 uppercase">Visitante</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-sm font-black text-dark/40 uppercase tracking-widest px-1">Próximos en el Calendario</h2>
          <div className="bg-white border border-light rounded-xl divide-y divide-light overflow-hidden">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-light/30 transition-colors group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-[10px] font-black text-accent uppercase leading-none">Mar</p>
                    <p className="text-lg font-black text-dark tracking-tighter leading-none">{18 + i}</p>
                  </div>
                  <div className="w-px h-8 bg-light" />
                  <div>
                    <h4 className="text-xs font-black text-dark uppercase">Final Vóley Juvenil</h4>
                    <p className="text-[10px] text-dark/40 font-bold">Coliseo Cerrado • 17:00 PM</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-dark/20 group-hover:text-dark transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;