import { useState, useMemo, useEffect } from "react";
import { Plus, Building2, Users, Settings, Mail, ShieldCheck, Globe, Loader2 } from "lucide-react";
import Select from "@atoms/Select";
import type { UserOrganization, Organization } from "src/shared/models/organization.model";
import PageHeader from "../components/PageHeader";
import { useNavigate } from "react-router-dom";
import { OrganizationService } from "src/core/services/organization.service";

// 1. SOLUCIÓN TYPESCRIPT: Mocks ajustados exactamente a tu modelo
const MEMBERS_MOCK = [
  { 
    id: "m1", 
    roleInOrg: "ADMIN", 
    joinedAt: new Date().toISOString(),
    user: { id: "u1", username: "Luis Fernando", email: "luis@sysari.com", role: "SUPER_ADMIN", status: "ACTIVE", createdAt: "" } 
  },
  { 
    id: "m2", 
    roleInOrg: "ADMIN", 
    joinedAt: new Date().toISOString(),
    user: { id: "u2", username: "Cristopher", email: "Cristopher@olimpyx.com", role: "admin", status: "ACTIVE", createdAt: "" } 
  },
  { 
    id: "m3", 
    roleInOrg: "VIEWER", 
    joinedAt: new Date().toISOString(),
    user: { id: "u3", username: "Kaled", email: "kaled@institucion.gob.pe", role: "admin", status: "ACTIVE", createdAt: "" } 
  },
] as UserOrganization[]; // Forzamos el tipado para que TypeScript esté 100% feliz

const OrganizationManagementScreen = () => {
  const navigate = useNavigate();
  
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrgId, setSelectedOrgId] = useState<string | number>("");

useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        setIsLoading(true);
        const response = await OrganizationService.getAll();
        
        // ¡LA SOLUCIÓN! 
        // Navegamos por los 3 niveles de 'data' que vimos en Postman
        const orgsArray = response.data?.data?.data;
        
        // Mantenemos nuestro escudo protector
        const orgsData: Organization[] = Array.isArray(orgsArray) ? orgsArray : [];
        
        setOrganizations(orgsData);
        
        // Si hay datos, autoseleccionamos el primero
        if (orgsData.length > 0) {
          setSelectedOrgId(orgsData[0].id);
        }
      } catch (error) {
        console.error("Error al cargar organizaciones:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  const selectOptions = useMemo(() => {
    return organizations.map(org => ({
      id: org.id,
      label: org.name
    }));
  }, [organizations]);

  const currentOrg = useMemo(() => 
    organizations.find(org => org.id === selectedOrgId), 
  [selectedOrgId, organizations]);

  return (
    <div className="h-full flex flex-col gap-8 animate-fade-in">
      <div className="shrink-0 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <PageHeader
          title="Mi organización"
          subtitle="Configura los detalles de la institución y gestiona los accesos."
          buttonLabel="Crear"
          buttonIcon={<Plus size={20} />}
          onButtonClick={() => navigate("/admin/organizacion/crear")} 
        />
        <div className="w-full md:w-auto">
          {isLoading ? (
            <div className="flex items-center gap-2 text-dark/40 px-4 py-2 bg-white border border-light rounded-xl h-[42px]">
              <Loader2 size={16} className="animate-spin" />
              <span className="text-sm font-medium">Cargando...</span>
            </div>
          ) : (
            <Select
              icon={Globe}
              title="Vista Superadmin"
              value={currentOrg?.name || "Sin organizaciones"} 
              options={selectOptions} 
              onChange={(id) => setSelectedOrgId(id)}
            />
          )}
        </div>
      </div>
      
      <div className="flex-1 min-h-0 overflow-y-auto pr-2 custom-scrollbar space-y-8 pb-10">
        
        <section className="space-y-4">
          <h2 className="text-sm font-black text-dark/40 uppercase tracking-widest px-1">Detalles de la Institución</h2>
          <div className="bg-white border border-light rounded-xl p-6 flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20 shrink-0">
              <Building2 size={48} />
            </div>
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div>
                <h3 className="text-2xl font-black text-dark tracking-tighter">
                  {currentOrg?.name || "Selecciona una organización"}
                </h3>
                <p className="text-sm text-dark/40 font-medium">
                  {currentOrg?.description || "Organización verificada en OLIMPYX"}
                </p>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="bg-light/50 px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-bold text-dark/60">
                  <Users size={14} className="text-accent" /> {MEMBERS_MOCK.length} Integrantes
                </div>
                <div className="bg-light/50 px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-bold text-dark/60">
                  <ShieldCheck size={14} className="text-tertiary" /> Plan Premium
                </div>
              </div>
            </div>
            <button 
              disabled={!currentOrg}
              className="shrink-0 flex items-center gap-2 bg-dark text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-accent transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <Settings size={18} /> Editar Perfil
            </button>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-black text-dark/40 uppercase tracking-widest">Equipo de Trabajo</h2>
            <span className="text-[10px] font-bold bg-accent/10 text-accent px-2 py-1 rounded-md tracking-wider">GESTIÓN DE ACCESOS</span>
          </div>          
          <div className="grid grid-cols-1 gap-3">
            {MEMBERS_MOCK.map((member) => (
              <div key={member.id} className="bg-white border border-light p-4 rounded-xl flex items-center justify-between group hover:border-accent/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-light rounded-full flex items-center justify-center font-black text-dark/30 group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                    {/* Leemos la inicial del username */}
                    {member.user?.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    {/* Leemos el username y el email desde la propiedad user */}
                    <h4 className="text-sm font-bold text-dark leading-none">{member.user?.username || 'Usuario Desconocido'}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Mail size={12} className="text-dark/20" />
                      <span className="text-xs text-dark/40 font-medium">{member.user?.email}</span>
                    </div>
                  </div>
                </div>                
                <div className="flex items-center gap-4">
                  <span className={`text-[10px] font-black px-2 py-1 rounded-lg tracking-widest ${
                    // Leemos el rol desde roleInOrg
                    member.roleInOrg === 'ADMIN' ? 'bg-primary/10 text-primary' : 'bg-light text-dark/40'
                  }`}>
                    {member.roleInOrg}
                  </span>
                  <button className="p-2 text-dark/20 hover:text-red-500 transition-colors cursor-pointer">
                    <Plus className="rotate-45" size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="shrink-0 bg-white border border-light p-3 rounded-xl flex items-center gap-3">
        <div className="w-8 h-8 bg-tertiary/10 rounded-lg flex items-center justify-center text-tertiary">
          <ShieldCheck size={16} />
        </div>
        <p className="text-[11px] text-dark/60 font-medium leading-tight">
          <span className="font-bold text-dark block text-xs">Seguridad de Acceso:</span>
          Solo los administradores pueden invitar nuevos miembros y cambiar los roles de edición en la plataforma.
        </p>
      </div>
    </div>
  );
};

export default OrganizationManagementScreen;