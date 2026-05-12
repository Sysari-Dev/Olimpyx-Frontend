import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Calendar, Users, ShieldCheck, Clock, Pencil } from "lucide-react";
import { useAppSelector } from "@store/hooks";
import { useOrganization } from "../hooks/useOrganization";
import { LoadingState } from "@atoms/LoadingState";

const OrganizationManagementPage = () => {
  const navigate = useNavigate();
  const { activeOrg } = useAppSelector((state) => state.auth);
  const { fetchOrganization, isLoading } = useOrganization();

  useEffect(() => {
    if (activeOrg?.id) {
      fetchOrganization(activeOrg.id);
    }
  }, [activeOrg?.id, fetchOrganization]);

  if (isLoading) {
    return <LoadingState text="Cargando organización" variant="primary" />;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary">
            <Building2 size={16} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Configuración General</span>
          </div>
          <h2 className="text-3xl font-bold text-light tracking-tighter">Mi Organización</h2>
        </div>        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate("editar")}
            className="flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-light hover:bg-white/10 hover:border-primary/50 transition-all cursor-pointer group"
          >
            <Pencil size={12} className="text-primary group-hover:scale-110 transition-transform" />
            Editar
          </button>
          <div className={`px-4 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-widest flex items-center gap-2
            ${activeOrg?.status === 'ACTIVE' ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500' : 'bg-red-500/5 border-red-500/20 text-red-500'}`}>
            <ShieldCheck size={12} />
            {activeOrg?.status === 'ACTIVE' ? 'Operativa' : 'Inactiva'}
          </div>
        </div>
      </header>      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-[#1A1A1A] border border-white/5 rounded-lg p-8 space-y-6 shadow-2xl shadow-black/20">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-light tracking-tight">{activeOrg?.name}</h3>
              <p className="text-sm text-gray leading-relaxed max-w-2xl">{activeOrg?.description}</p>
            </div>            
            <div className="pt-6 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <p className="text-[10px] font-black text-gray/40 uppercase tracking-widest mb-2">Última actualización</p>
                <p className="text-sm font-medium text-light flex items-center gap-2">
                   <Clock size={14} className="text-primary/60" />
                   {activeOrg?.lastUpdate}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray/40 uppercase tracking-widest mb-2">Fecha de creación</p>
                <p className="text-sm font-medium text-light flex items-center gap-2">
                  <Calendar size={14} className="text-primary/60" />
                  {activeOrg?.createdAt ? new Date(activeOrg.createdAt).toLocaleDateString() : '---'}
                </p>
              </div>
            </div>
          </section>
        </div>        
        <div className="space-y-4">
          <div className="bg-[#1A1A1A] border border-white/5 rounded-lg p-6 flex items-center justify-between group hover:border-primary/30 transition-all duration-300">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-gray/40 uppercase tracking-widest">Torneos Activos</p>
              <p className="text-2xl font-bold text-light tracking-tighter">{activeOrg?.stats.eventsCount}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/10 group-hover:scale-110 transition-transform">
              <Calendar size={20} />
            </div>
          </div>
          
          <div className="bg-[#1A1A1A] border border-white/5 rounded-lg p-6 flex items-center justify-between group hover:border-secondary/30 transition-all duration-300">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-gray/40 uppercase tracking-widest">Clubes Afiliados</p>
              <p className="text-2xl font-bold text-light tracking-tighter">{activeOrg?.stats.teamsCount}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/10 group-hover:scale-110 transition-transform">
              <Users size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationManagementPage;