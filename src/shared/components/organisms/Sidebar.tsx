import { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard, Building2, CalendarDays, Trophy, Swords, 
  LogOut, ChevronDown, Bell, X, Loader2, Check, Users
} from "lucide-react";
import NavItem from "@molecules/NavItem";
import NavAction from "@molecules/NavAction";
import BaseModal from "@atoms/BaseModal";
import PopoverMenu from "@atoms/PopoverMenu";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "src/core/store/slices/auth.slice"; 
import { OrganizationService } from "src/core/services/organization.service";

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  
  // Estado para el menú desplegable de organizaciones
  const [isOrgMenuOpen, setIsOrgMenuOpen] = useState(false);
  const [isLoadingOrgs, setIsLoadingOrgs] = useState(false);
  const orgMenuRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  // Traemos TODO de nuestro estado global
  const { user, logout, organizations, activeOrg, setOrganizations, setActiveOrg } = useAuthStore();

  // Cargar organizaciones al montar el Sidebar
  useEffect(() => {
    const fetchOrgs = async () => {
      if (organizations.length > 0) return; // Si ya las tenemos, no volvemos a pedir
      try {
        setIsLoadingOrgs(true);
        const response = await OrganizationService.getAll();
        const orgsArray = response.data?.data?.data;
        
        if (Array.isArray(orgsArray)) {
          setOrganizations(orgsArray);
          if (orgsArray.length > 0 && !activeOrg) {
            setActiveOrg(orgsArray[0]); // Seleccionamos la primera por defecto
          }
        }
      } catch (error) {
        console.error("Error al cargar orgs en Sidebar", error);
      } finally {
        setIsLoadingOrgs(false);
      }
    };
    fetchOrgs();
  }, [organizations, activeOrg, setOrganizations, setActiveOrg]);

  // Cerrar el menú si hacemos clic afuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (orgMenuRef.current && !orgMenuRef.current.contains(event.target as Node)) {
        setIsOrgMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout(); 
    navigate("/login"); 
  };

  const handleNotificationClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorRect(e.currentTarget.getBoundingClientRect());
    setPopoverOpen(true);
  };

  return (
    <>
      <aside className="w-64 h-full md:h-[95vh] md:m-4 bg-dark text-white md:rounded-3xl flex flex-col p-6 shadow-2xl md:shadow-xl shrink-0">
        
        {/* ENCABEZADO */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <Trophy size={18} className="text-white" />
            </div>
            <h1 className="text-xl font-black tracking-tighter italic">OLIMPYX</h1>
          </div>
          {onClose && (
            <button onClick={onClose} className="md:hidden p-1 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer">
              <X size={24} />
            </button>
          )}
        </div>

        {/* SELECTOR DE ORGANIZACIÓN GLOBAL */}
        <div className="relative mb-8" ref={orgMenuRef}>
          <button 
            onClick={() => setIsOrgMenuOpen(!isOrgMenuOpen)}
            className="w-full bg-white/10 rounded-2xl p-4 flex items-center justify-between border border-white/5 hover:bg-white/20 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-dark font-black shrink-0">
                {isLoadingOrgs ? <Loader2 size={16} className="animate-spin" /> : (activeOrg?.name.charAt(0).toUpperCase() || 'O')}
              </div>
              <div className="text-left min-w-0">
                <p className="text-sm font-bold truncate">
                  {isLoadingOrgs ? "Cargando..." : (activeOrg?.name || "Sin Organización")}
                </p>
                <p className="text-[10px] text-white/40 font-black uppercase tracking-tighter truncate">
                  {user?.username || 'Usuario'}
                </p>
              </div>
            </div>
            <ChevronDown size={14} className={`text-white/40 transition-transform ${isOrgMenuOpen ? "rotate-180" : ""}`} />
          </button>

          {/* MENÚ DESPLEGABLE */}
          {isOrgMenuOpen && (
            <div className="absolute top-[105%] left-0 w-full bg-[#1a1f2e] border border-white/10 rounded-xl overflow-hidden z-50 shadow-2xl animate-fade-in py-2">
              <p className="text-[9px] uppercase tracking-widest text-white/40 font-bold px-4 pb-2 pt-1">Mis Organizaciones</p>
              <div className="max-h-48 overflow-y-auto custom-scrollbar-dark">
                {organizations.map(org => (
                  <button 
                    key={org.id} 
                    onClick={() => { setActiveOrg(org); setIsOrgMenuOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span className="truncate pr-2 font-medium">{org.name}</span>
                    {activeOrg?.id === org.id && <Check size={14} className="text-accent shrink-0" />}
                  </button>
                ))}
                {organizations.length === 0 && !isLoadingOrgs && (
                  <div className="px-4 py-2 text-xs text-white/40 italic">No hay organizaciones.</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* NAVEGACIÓN */}
        <nav className="grow space-y-1 overflow-y-auto custom-scrollbar-dark">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" to="/admin" end />
          <NavItem icon={<Building2 size={20} />} label="Organización" to="/admin/organizacion" />
          <NavItem icon={<Users size={20} />} label="Equipos" to="/admin/equipos" />
          <NavItem icon={<CalendarDays size={20} />} label="Eventos" to="/admin/eventos" />
          <NavItem icon={<Trophy size={20} />} label="Torneos" to="/admin/torneos" />
          <NavItem icon={<Swords size={20} />} label="Partidos" to="/admin/partidos" />
          
          <div className="pt-6 pb-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-black px-4">Acciones</p>
          </div>
          
          <NavAction icon={<Bell size={20} />} label="Notificaciones" badge={3} onClick={handleNotificationClick} />
          <NavAction icon={<LogOut size={20} />} label="Cerrar sesión" onClick={() => setIsLogoutOpen(true)} variant="danger" />
        </nav>

        {/* PERFIL INFERIOR */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/10 mt-4">
          <img
            src={`https://ui-avatars.com/api/?name=${user?.username || 'Admin'}&background=random&color=fff`}
            alt="User Avatar"
            className="w-10 h-10 rounded-full border-2 border-accent/40"
          />
          <div className="min-w-0">
            <p className="text-xs font-black truncate">{user?.username || 'Usuario'}</p>
            <p className="text-[9px] text-white/40 uppercase font-bold tracking-widest truncate">
              {user?.role || 'SUPER_ADMIN'}
            </p>
          </div>
        </div>
      </aside>

      {/* MODALES */}
      <PopoverMenu isOpen={popoverOpen} onClose={() => setPopoverOpen(false)} anchorRect={anchorRect} title="Notificaciones" items={[]} />
      <BaseModal isOpen={isLogoutOpen} onClose={() => setIsLogoutOpen(false)} onConfirm={handleLogout} title="¿Cerrar sesión?" description="Estás a punto de salir del panel." confirmText="Sí, salir" cancelText="Cancelar" />
    </>
  );
};

export default Sidebar;