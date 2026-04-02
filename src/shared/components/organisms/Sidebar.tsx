import { useState } from "react";
import {
  LayoutDashboard,
  Building2,
  CalendarDays,
  Trophy,
  Swords,
  LogOut,
  ChevronDown,
  Bell,
  X // <--- Nuestra nueva importación para el botón cerrar
} from "lucide-react";
import NavItem from "@molecules/NavItem";
import NavAction from "@molecules/NavAction";
import BaseModal from "@atoms/BaseModal";
import { useNavigate } from "react-router-dom";
import PopoverMenu from "@atoms/PopoverMenu";

// Importamos nuestra memoria global
import { useAuthStore } from "src/core/store/slices/auth.slice"; 

// Agregamos Props por si necesitamos cerrar el menú desde aquí (Ej. en móviles)
interface SidebarProps {
  onClose?: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const navigate = useNavigate();

  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout(); 
    navigate("/login"); 
  };

  const handleNotificationClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorRect(e.currentTarget.getBoundingClientRect());
    setPopoverOpen(true);
  };

  const notificationItems = [
    {
      label: "Nuevo equipo inscrito",
      icon: <Trophy size={16} />,
      description: "Los Chankas Jr. se unieron a la Copa Abancay.",
      onClick: () => console.log("Notif 1"),
    },
    {
      label: "Partido demorado",
      icon: <Bell size={16} />,
      description: "Miguel Grau vs DEA tiene un retraso de 15 min.",
      onClick: () => console.log("Notif 2"),
    },
    {
      label: "Sistema actualizado",
      icon: <Building2 size={16} />,
      description: "Olimpyx se actualizó a la versión 2.0.",
      onClick: () => console.log("Notif 3"),
    },
  ];

  return (
    <>
      <aside className="w-64 h-full md:h-[95vh] md:m-4 bg-dark text-white md:rounded-3xl flex flex-col p-6 shadow-2xl md:shadow-xl shrink-0">
        
        {/* ENCABEZADO Y BOTÓN CERRAR (MÓVIL) */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <Trophy size={18} className="text-white" />
            </div>
            <h1 className="text-xl font-black tracking-tighter italic">OLIMPYX</h1>
          </div>
          
          {/* Este botón usa tu onClose y solo se ve en celulares (md:hidden) */}
          {onClose && (
            <button 
              onClick={onClose} 
              className="md:hidden p-1 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            >
              <X size={24} />
            </button>
          )}
        </div>

        {/* PERFIL SUPERIOR */}
        <div className="bg-white/10 rounded-2xl p-4 flex items-center justify-between mb-8 border border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-dark font-black">
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold truncate">{user?.username || 'Usuario'}</p>
              <p className="text-[10px] text-white/40 font-black uppercase tracking-tighter">
                {user?.role || 'Admin'}
              </p>
            </div>
          </div>
          <ChevronDown size={14} className="text-white/40" />
        </div>

        {/* NAVEGACIÓN */}
        <nav className="grow space-y-1 overflow-y-auto custom-scrollbar-dark">
          {/* Si quieres que se cierre al navegar en celular, podrías envolver los NavItem, 
              pero por ahora lo mantendremos exacto a tu diseño base */}
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" to="/admin" end />
          <NavItem icon={<Building2 size={20} />} label="Organización" to="/admin/organizacion" />
          <NavItem icon={<CalendarDays size={20} />} label="Eventos" to="/admin/eventos" />
          <NavItem icon={<Trophy size={20} />} label="Torneos" to="/admin/torneos" />
          <NavItem icon={<Swords size={20} />} label="Partidos" to="/admin/partidos" />
          
          <div className="pt-6 pb-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-black px-4">Acciones</p>
          </div>
          
          <NavAction
            icon={<Bell size={20} />}
            label="Notificaciones"
            badge={3}
            onClick={handleNotificationClick} 
          />
          <NavAction
            icon={<LogOut size={20} />}
            label="Cerrar sesión"
            onClick={() => setIsLogoutOpen(true)}
            variant="danger"
          />
        </nav>

        {/* PERFIL INFERIOR */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/10">
          <img
            src={`https://ui-avatars.com/api/?name=${user?.username || 'Admin'}&background=random&color=fff`}
            alt="User Avatar"
            className="w-10 h-10 rounded-full border-2 border-accent/40"
          />
          <div className="min-w-0">
            <p className="text-xs font-black truncate">{user?.username || 'Usuario'}</p>
            <p className="text-[9px] text-white/40 uppercase font-bold tracking-widest truncate">
              {user?.email || 'admin@olimpyx.com'}
            </p>
          </div>
        </div>
      </aside>

      {/* MODALES */}
      <PopoverMenu
        isOpen={popoverOpen}
        onClose={() => setPopoverOpen(false)}
        anchorRect={anchorRect}
        title="Centro de Notificaciones"
        items={notificationItems}
      />
      <BaseModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        onConfirm={handleLogout} 
        title="¿Cerrar sesión?"
        description="Estás a punto de salir del panel de administración de Olimpyx."
        confirmText="Sí, salir"
        cancelText="Cancelar"
      />
    </>
  );
};

export default Sidebar;