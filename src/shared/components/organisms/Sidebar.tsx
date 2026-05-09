import { useState, useRef } from "react";
import {
  LayoutDashboard,
  Trophy,
  Users,
  Bell,
  LogOut,
  Calendar,
  Sword,
  Building2,
  ChevronDown,
  Loader2,
  Plus,
} from "lucide-react";
import { SidebarItem } from "@atoms/SidebarItem";

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar = ({ onClose, onLogout }: SidebarProps & { onLogout: () => void }) => {
  const [isOrgMenuOpen, setIsOrgMenuOpen] = useState(false);
  const orgMenuRef = useRef<HTMLDivElement>(null);
  const isLoadingOrgs = false;

  const organizations = [
    { id: 1, name: "Liga Distrital Abancay" },
    { id: 2, name: "Club Deportivo Chankas" },
    { id: 3, name: "Federación de Vóley Apurímac" },
  ];

  const [activeOrg, setActiveOrg] = useState(organizations[0]);

  const menuItems = [
    { to: "/admin", icon: LayoutDashboard, label: "Panel de control" },
    { to: "/admin/organizacion", icon: Building2, label: "Organización" },
    { to: "/admin/eventos", icon: Calendar, label: "Gestión de eventos" },
    { to: "/admin/torneos", icon: Trophy, label: "Torneos" },
    { to: "/admin/equipos", icon: Users, label: "Equipos" },
    { to: "/admin/partidos", icon: Sword, label: "Partidos" },
  ];

  const handleSelectOrg = (org: typeof activeOrg) => {
    setActiveOrg(org);
    setIsOrgMenuOpen(false);
  };

  return (
    <div className="flex flex-col h-full bg-background p-4 relative">
      <div className="py-4 px-4 mb-6 flex flex-row items-center gap-3">
        <div className="bg-primary h-10 w-10 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center"></div>
        <h1 className="text-lg font-black tracking-tighter text-light">
          Olimpyx
        </h1>
      </div>
      <div className="px-2 mb-8 relative">
        <p className="text-[10px] font-black text-gray/40 uppercase tracking-[0.2em] px-2 mb-3">
          Organización
        </p>
        <div className="relative" ref={orgMenuRef}>
          <button
            onClick={() => setIsOrgMenuOpen(!isOrgMenuOpen)}
            className="w-full bg-white/5 rounded-2xl p-3 flex items-center justify-between border border-white/5 hover:bg-white/10 transition-all cursor-pointer group z-20"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 bg-secondary rounded-full flex items-center justify-center text-dark-black font-black shrink-0 shadow-sm text-sm">
                {isLoadingOrgs ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  activeOrg.name.charAt(0).toUpperCase()
                )}
              </div>
              <div className="text-left min-w-0">
                <p className="text-xs font-bold text-light truncate">
                  {isLoadingOrgs ? "Cargando..." : activeOrg.name}
                </p>
              </div>
            </div>
            <ChevronDown
              size={14}
              className={`text-gray transition-transform duration-300 ${isOrgMenuOpen ? "rotate-180" : ""}`}
            />
          </button>
          {isOrgMenuOpen && (
            <div className="absolute top-full left-0 w-full mt-2 bg-dark border border-white/5 rounded-2xl p-2 shadow-2xl z-100 animate-in fade-in zoom-in-95 duration-200">
              <div className="max-h-48 overflow-y-auto custom-scrollbar space-y-1">
                {organizations.map((org) => (
                  <button
                    key={org.id}
                    onClick={() => handleSelectOrg(org)}
                    className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer text-left"
                  >
                    <div className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center text-[10px] font-black text-light shrink-0">
                      {org.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-xs font-medium text-gray hover:text-light truncate">
                      {org.name}
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-2 pt-2 border-t border-white/5">
                <button className="w-full flex items-center gap-3 p-2 rounded-xl text-secondary hover:bg-secondary/10 transition-colors cursor-pointer">
                  <div className="w-7 h-7 bg-secondary/20 rounded-full flex items-center justify-center shrink-0">
                    <Plus size={14} />
                  </div>
                  <span className="text-xs font-bold">Nueva entidad</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <nav className="flex-1 space-y-1">
        <p className="text-[10px] font-black text-gray/40 uppercase tracking-[0.2em] px-4 mb-4">
          Menú principal
        </p>
        {menuItems.map((item) => (
          <SidebarItem key={item.to} {...item} onClose={onClose} />
        ))}
      </nav>
      <div className="mt-auto pt-6 border-t border-white/5 space-y-2">
        <SidebarItem 
          to="/admin/notificaciones" 
          icon={Bell} 
          label="Notificaciones" 
          onClose={onClose} 
        />
        <button 
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-gray hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all cursor-pointer group font-sans"
        >
          <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
          <span className="text-sm font-bold">Cerrar sesión</span>
        </button>
      </div>      
    </div>
  );
};

export default Sidebar;
