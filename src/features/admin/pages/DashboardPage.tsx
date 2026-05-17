import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Trophy,
  Swords,
  Users,
  TrendingUp,
  Plus,
  Calendar,
  Activity,
  ChevronRight,
  ArrowUpRight,
  UserPlus,
  BarChart3,
  ShieldAlert,
} from "lucide-react";
import { useAppSelector } from "@store/hooks";

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const isSuperAdmin = user?.role === "SUPER_ADMIN";

  const stats = [
    {
      label: "Eventos activos",
      value: "3",
      icon: Trophy,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Partidos hoy",
      value: "12",
      icon: Swords,
      color: "text-secondary",
      bg: "bg-secondary/10",
    },
    {
      label: "Total miembros",
      value: "124",
      icon: Users,
      color: "text-tertiary",
      bg: "bg-tertiary/10",
    },
    {
      label: "Rendimiento global",
      value: "+12%",
      icon: TrendingUp,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
  ];

  const chartData = [
    { label: "Lun", value: 40, color: "bg-primary" },
    { label: "Mar", value: 65, color: "bg-secondary" },
    { label: "Mié", value: 85, color: "bg-tertiary" },
    { label: "Jue", value: 50, color: "bg-primary" },
    { label: "Vie", value: 95, color: "bg-secondary" },
    { label: "Sáb", value: 110, color: "bg-tertiary" },
    { label: "Dom", value: 75, color: "bg-emerald-500" },
  ];

  const shortcuts = useMemo(() => {
    const base = [
      {
        title: "Nuevo partido",
        desc: "Programa un encuentro",
        icon: Plus,
        action: () => navigate("/admin/partidos"),
      },
      {
        title: "Crear evento",
        desc: "Inicia una festividad",
        icon: Calendar,
        action: () => navigate("/admin/eventos/crear"),
      },
      {
        title: "Ver torneos",
        desc: "Gestionar categorías",
        icon: Trophy,
        action: () => navigate("/admin/torneos"),
      },
    ];

    if (isSuperAdmin) {
      base.push({
        title: "Crear usuario",
        desc: "Asignar nuevos roles",
        icon: UserPlus,
        action: () => navigate("/admin/usuarios/crear"),
      });
    }

    return base;
  }, [isSuperAdmin, navigate]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-bold text-light tracking-tighter">
            ¡Hola, {user?.username}!
          </h1>
          <p className="text-gray/40 text-sm font-medium">
            Aquí tienes el resumen operativo de{" "}
            <span className="text-secondary font-bold">Olimpyx</span> para hoy.
          </p>
        </div>
        {isSuperAdmin && (
          <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg text-amber-500 text-[10px] font-black uppercase tracking-widest h-fit w-fit">
            <ShieldAlert size={14} />
            <span>Modo SuperAdmin</span>
          </div>
        )}
      </header>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-[#1A1A1A] p-5 rounded-lg border border-white/5 flex items-center gap-4 shadow-2xl"
          >
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bg} ${stat.color} shrink-0`}
            >
              <stat.icon size={22} />
            </div>
            <div className="min-w-0">
              <p className="text-[9px] font-black uppercase text-gray/40 tracking-[0.15em] truncate mb-0.5">
                {stat.label}
              </p>
              <p className="text-2xl font-black text-light tracking-tight">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#1A1A1A] border border-white/5 p-6 rounded-lg shadow-2xl flex flex-col justify-between min-h-80">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <BarChart3 size={18} className="text-primary" />
              <h3 className="text-xs font-black uppercase tracking-widest text-light">
                Afluencia de Espectadores (K)
              </h3>
            </div>
            <span className="text-[10px] font-black text-gray/40 uppercase tracking-wider bg-white/5 px-2 py-1 rounded">
              Semana Actual
            </span>
          </div>

          <div className="flex items-end justify-between h-44 pt-4 px-2 relative border-b border-white/5">
            {chartData.map((bar, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 group grow max-w-11.25"
              >
                <div
                  className="w-full relative rounded-t-sm transition-all duration-500 group-hover:brightness-125"
                  style={{ height: `${(bar.value / 120) * 100}%` }}
                >
                  <div
                    className={`absolute inset-0 ${bar.color} rounded-t-md shadow-[0_0_15px_rgba(0,0,0,0.2)]`}
                  />
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-dark border border-white/10 text-light text-[9px] font-black py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    {bar.value}K
                  </div>
                </div>
                <span className="text-[10px] font-bold text-gray/40 uppercase tracking-tighter mt-1">
                  {bar.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-gray/40 uppercase tracking-[0.2em] px-1">
              Acciones Rápidas
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {shortcuts.map((short, i) => (
                <button
                  key={i}
                  onClick={short.action}
                  className="bg-[#1A1A1A] border border-white/5 p-4 rounded-lg flex items-center justify-between group hover:border-secondary/40 transition-all cursor-pointer text-left shadow-xl"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 bg-white/5 text-gray rounded-lg flex items-center justify-center group-hover:bg-secondary group-hover:text-dark-black transition-all shrink-0">
                      <short.icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-light truncate group-hover:text-secondary transition-colors">
                        {short.title}
                      </h4>
                      <p className="text-[10px] text-gray/40 font-black uppercase tracking-widest mt-0.5">
                        {short.desc}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    size={16}
                    className="text-gray/20 group-hover:text-secondary group-hover:translate-x-1 transition-all shrink-0"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[10px] font-black text-gray/40 uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-2 h-2 bg-tertiary rounded-full animate-pulse" />{" "}
              Transmisión En Vivo
            </h3>
            <button
              onClick={() => navigate("/admin/en-vivo")}
              className="text-[10px] font-black text-secondary uppercase flex items-center gap-1 hover:text-light transition-colors"
            >
              Consola de Arbitraje <ArrowUpRight size={12} />
            </button>
          </div>
          <div className="bg-[#1A1A1A] rounded-lg p-6 border border-white/5 relative overflow-hidden shadow-2xl flex flex-col justify-between min-h-35">
            <div className="absolute -right-4 -bottom-4 opacity-[0.02] pointer-events-none">
              <Activity size={140} />
            </div>
            <div className="relative z-10 space-y-6 w-full">
              <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-gray/40">
                <span>Liga Distrital Abancay</span>
                <span className="bg-tertiary/10 border border-tertiary/20 text-tertiary px-2 py-0.5 rounded animate-pulse font-black">
                  2T • 72'
                </span>
              </div>
              <div className="flex justify-between items-center text-center gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-base font-black tracking-tight text-light truncate">
                    Miguel Grau
                  </p>
                  <p className="text-[9px] font-black text-gray/40 uppercase tracking-widest mt-0.5">
                    Local
                  </p>
                </div>
                <div className="px-4 py-1.5 bg-white/5 border border-white/5 rounded-lg shrink-0">
                  <p className="text-3xl font-black tracking-tighter text-secondary">
                    2 - 1
                  </p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-black tracking-tight text-light truncate">
                    DEA Abancay
                  </p>
                  <p className="text-[9px] font-black text-gray/40 uppercase tracking-widest mt-0.5">
                    Visitante
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-gray/40 uppercase tracking-[0.2em] px-1">
            Próximos Encuentros
          </h3>
          <div className="bg-[#1A1A1A] border border-white/5 rounded-lg divide-y divide-white/3 overflow-hidden shadow-2xl">
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="p-4 flex items-center justify-between hover:bg-white/1 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="text-center shrink-0 w-8">
                    <p className="text-[9px] font-black text-secondary uppercase tracking-widest leading-none">
                      May
                    </p>
                    <p className="text-base font-black text-light tracking-tighter mt-0.5">
                      {18 + i}
                    </p>
                  </div>
                  <div className="w-px h-8 bg-white/5 shrink-0" />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-light uppercase truncate">
                      Final Vóley Juvenil
                    </h4>
                    <p className="text-[10px] text-gray/40 font-medium tracking-tight mt-0.5 truncate">
                      Coliseo Cerrado Abancay • 17:00 PM
                    </p>
                  </div>
                </div>
                <ChevronRight
                  size={14}
                  className="text-gray/20 group-hover:text-light group-hover:translate-x-0.5 transition-all shrink-0"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
