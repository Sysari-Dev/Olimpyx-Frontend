import { useEffect, useState, useMemo } from "react";
import { Search, ShieldAlert, Star } from "lucide-react";
import { usePublicOrganizations } from "../hooks/usePublicOrganizations";
import { PublicOrganizationCard } from "../components/PublicOrganizationCard";
import { InputText } from "@atoms/InputText";
import { LoadingState } from "@atoms/LoadingState";

export const OrganizationListPage = () => {
  const { organizations, isLoading, fetchOrganizations } = usePublicOrganizations();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchOrganizations();
  }, [fetchOrganizations]);

  const filteredOrganizations = useMemo(() => {
    return organizations.filter((org) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        org.name.toLowerCase().includes(searchLower) ||
        org.description.toLowerCase().includes(searchLower)
      );
    });
  }, [searchTerm, organizations]);

  if (isLoading && organizations.length === 0) {
    return <LoadingState variant="tertiary" text="Buscando organizaciones..." />;
  }

  return (
    <div className="w-full text-dark font-sans antialiased pb-16">
      <section className="bg-linear-to-br from-primary to-tertiary text-white relative overflow-hidden py-16 px-6 sm:px-12 rounded-b-[2.5rem] shadow-lg">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-secondary/20 rounded-full blur-2xl" />
        <div className="absolute -left-10 -bottom-10 w-60 h-60 bg-accent/20 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto space-y-4 relative z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1 rounded-full backdrop-blur-xs">
            <Star size={12} className="text-secondary fill-secondary" />
            <span className="text-[10px] font-black uppercase tracking-widest">Comunidad Olimpyx</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-white">
            Observa las organizaciones que están con nosotros
          </h1>
          <p className="text-sm md:text-lg text-white/80 font-medium max-w-2xl leading-relaxed">
            Instituciones, ligas y clubes deportivos que confían en nuestra infraestructura tecnológica para gestionar sus torneos con total transparencia y competitividad.
          </p>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-dark/10 shadow-xs">
          <div>
            <h2 className="text-sm font-black uppercase tracking-wider text-dark/40">
              Directorio de Miembros
            </h2>
            <p className="text-xs text-dark/60 font-medium">
              Filtrado de entidades federadas activas en tiempo real.
            </p>
          </div>
          <div className="w-full sm:w-80">
            <InputText
              placeholder="Buscar por nombre o descripción..."
              icon={Search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="[&_input]:bg-dark/2 [&_input]:border-dark/10 [&_input]:text-dark [&_input]:placeholder:text-dark/40 [&_input]:focus:border-primary [&_svg]:text-dark/40 [&_svg]:group-focus-within:text-primary"
            />
          </div>
        </div>
        <main>
          {filteredOrganizations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOrganizations.map((org) => (
                <PublicOrganizationCard key={org.id} organization={org} />
              ))}
            </div>
          ) : (
            <div className="py-20 flex flex-col items-center justify-center bg-white rounded-2xl border border-dark/10 max-w-xl mx-auto px-6 text-center shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-4">
                <ShieldAlert size={22} />
              </div>
              <h3 className="text-sm font-black uppercase tracking-wider text-dark mb-1">
                Sin resultados coincidentes
              </h3>
              <p className="text-xs text-dark/40 font-medium leading-relaxed">
                No se encontraron organizaciones públicas que coincidan con los términos de búsqueda ingresados.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default OrganizationListPage;