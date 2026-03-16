import {
  LayoutDashboard,
  Building2,
  CalendarDays,
  Trophy,
  Swords,
  LogOut,
  Users,
  ChevronDown,
  Bell,
} from "lucide-react";
import NavItem from "@molecules/NavItem";

const Sidebar = () => {
  return (
    <aside className="w-64 h-[95vh] m-4 bg-dark text-white rounded-3xl flex flex-col p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center"></div>
        <h1 className="text-xl font-semibold tracking-wide">OLIMPYX</h1>
      </div>
      <div className="bg-white/10 rounded-2xl p-4 flex items-center justify-between mb-8 cursor-pointer hover:bg-white/20 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-dark">
            <Users size={20} />
          </div>
          <div>
            <p className="text-sm font-medium">Organizacion</p>
            <p className="text-xs text-white/60">Administrador</p>
          </div>
        </div>
        <ChevronDown size={16} className="text-white/60" />
      </div>
      <nav className="grow space-y-2">
        <NavItem
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
          to="/admin"
          end
        />
        <NavItem
          icon={<Building2 size={20} />}
          label="Organización"
          to="/admin/organizacion"
        />
        <NavItem
          icon={<CalendarDays size={20} />}
          label="Eventos"
          to="/admin/eventos"
        />
        <NavItem
          icon={<Trophy size={20} />}
          label="Torneos"
          to="/admin/torneos"
        />
        <NavItem
          icon={<Swords size={20} />}
          label="Partidos"
          to="/admin/partidos"
        />
        <div className="pt-6 pb-2">
          <p className="text-[10px] uppercase tracking-widest text-white/50 font-bold px-4">
            Acciones
          </p>
        </div>
        <NavItem
          icon={<Bell size={20} />}
          label="Notificaciones"
          to="/admin/notificaciones"
          badge={5}
        />
        <NavItem
          icon={<LogOut size={20} />}
          label="Cerrar sesión"
          to="/login"
        />
      </nav>
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <img
            src="https://via.placeholder.com/40"
            alt="User"
            className="w-10 h-10 rounded-full border-2 border-white/20"
          />
          <span className="text-sm font-medium">Luis Fernando </span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
