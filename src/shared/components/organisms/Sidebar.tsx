import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Trophy,
  Users,
  LogOut,
  Calendar,
  Sword,
  Building2,
  ChevronDown,
  Loader2,
  Plus,
  Mail,
} from "lucide-react";
import { SidebarItem } from "@atoms/SidebarItem";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { setActiveOrg } from "@store/slices/auth.slice";
import { type Organization } from "@models/organization.model";
import { SidebarNotificationPopover } from "@atoms/SidebarNotificationPopover";
import { APP_CONFIG } from "@constants/app-config.constant";

interface SidebarProps {
  onClose?: () => void;
  onLogout: () => void;
}

const Sidebar = ({ onClose, onLogout }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const orgMenuRef = useRef<HTMLDivElement>(null);

  const { user, organizations, activeOrg } = useAppSelector(
    (state) => state.auth,
  );
  const [isOrgMenuOpen, setIsOrgMenuOpen] = useState(false);

  const isSuperAdmin = user?.role === "SUPER_ADMIN";

  const menuItems = [
    { to: "/admin", icon: LayoutDashboard, label: "Panel de control" },
    { to: "/admin/organizacion", icon: Building2, label: "Organización" },
    { to: "/admin/eventos", icon: Calendar, label: "Gestión de eventos" },
    { to: "/admin/torneos", icon: Trophy, label: "Torneos" },
    { to: "/admin/equipos", icon: Users, label: "Equipos" },
    { to: "/admin/partidos", icon: Sword, label: "Partidos" },
  ];

  const handleSelectOrg = (org: Organization) => {
    if (org.id === activeOrg?.id) {
      setIsOrgMenuOpen(false);
      return;
    }

    dispatch(setActiveOrg(org));
    setIsOrgMenuOpen(false);
    if (onClose) onClose();
    navigate("/admin");
  };

  const handleCreateOrg = () => {
    setIsOrgMenuOpen(false);
    if (onClose) onClose();
    navigate("/admin/organizacion/crear");
  };

  return (
    <div className="flex flex-col h-full bg-background p-4 relative">
      <div className="py-4 px-4 mb-6 flex flex-row items-center gap-3">
        <div className="bg-primary h-10 w-10 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center" />
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
            disabled={!isSuperAdmin}
            onClick={() => setIsOrgMenuOpen(!isOrgMenuOpen)}
            className={`w-full bg-white/5 rounded-2xl p-3 flex items-center justify-between border border-white/5 transition-all z-20 
              ${isSuperAdmin ? "hover:bg-white/10 cursor-pointer group" : "cursor-default"}`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 bg-secondary rounded-full flex items-center justify-center text-dark-black font-black shrink-0 shadow-sm text-sm">
                {!activeOrg ? (
                  <Loader2 size={14} className="animate-spin text-dark-black" />
                ) : (
                  activeOrg.name.charAt(0).toUpperCase()
                )}
              </div>
              <div className="text-left min-w-0">
                <p className="text-xs font-bold text-light truncate">
                  {!activeOrg ? "Cargando..." : activeOrg.name}
                </p>
              </div>
            </div>
            {isSuperAdmin && (
              <ChevronDown
                size={14}
                className={`text-gray transition-transform duration-300 ${isOrgMenuOpen ? "rotate-180" : ""}`}
              />
            )}
          </button>
          {isOrgMenuOpen && isSuperAdmin && (
            <div className="absolute top-full left-0 w-full mt-2 bg-dark border border-white/5 rounded-2xl p-2 shadow-2xl z-100 animate-in fade-in zoom-in-95 duration-200">
              <div className="max-h-48 overflow-y-auto custom-scrollbar space-y-1">
                {organizations.map((org) => (
                  <button
                    key={org.id}
                    onClick={() => handleSelectOrg(org)}
                    className={`w-full flex items-center gap-3 p-2 rounded-xl transition-colors cursor-pointer text-left
                      ${activeOrg?.id === org.id ? "bg-primary/10" : "hover:bg-white/5"}`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black shrink-0
                      ${activeOrg?.id === org.id ? "bg-primary text-white" : "bg-white/10 text-light"}`}
                    >
                      {org.name.charAt(0).toUpperCase()}
                    </div>
                    <span
                      className={`text-xs font-medium truncate ${activeOrg?.id === org.id ? "text-primary" : "text-gray hover:text-light"}`}
                    >
                      {org.name}
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-2 pt-2 border-t border-white/5">
                <button
                  onClick={handleCreateOrg}
                  className="w-full flex items-center gap-3 p-2 rounded-xl text-secondary hover:bg-secondary/10 transition-colors cursor-pointer"
                >
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
        {menuItems.map((item) => {
          const isActive =
            item.to === "/admin"
              ? location.pathname === "/admin"
              : location.pathname.startsWith(item.to);

          return (
            <SidebarItem
              key={item.to}
              {...item}
              isActive={isActive}
              onClose={onClose}
            />
          );
        })}
      </nav>
      <div className="mt-auto pt-6 border-t border-white/5 space-y-2">
        <SidebarNotificationPopover onCloseSidebar={onClose} />
        <a
          href={`mailto:${APP_CONFIG.SUPPORT_EMAIL}`}
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-3 w-full text-gray hover:bg-white/5 hover:text-light rounded-xl transition-all cursor-pointer group font-sans"
        >
          <Mail
            size={20}
            className="group-hover:scale-105 transition-transform"
          />
          <span className="text-sm">Buzón de Soporte</span>
        </a>
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-gray hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all cursor-pointer group font-sans"
        >
          <LogOut
            size={20}
            className="group-hover:rotate-12 transition-transform"
          />
          <span className="text-sm font-bold">Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
