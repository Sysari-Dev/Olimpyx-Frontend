import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, AlignLeft, Globe, ArrowLeft, Save } from "lucide-react";
import Select from "@atoms/Select"; // Asumo que tienes este componente

// Usaremos el mismo mock temporal para el "Parent Organization"
const ORG_OPTIONS = [
  { id: "none", label: "Ninguna (Organización Principal)" },
  { id: "1", label: "Municipalidad de Abancay" },
  { id: "2", label: "Liga Distrital de Fútbol" },
];

const OrganizationCreateScreen = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Estados del formulario basados en tu modelo
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [parentId, setParentId] = useState<string | number>("none");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Aquí irá la llamada a tu nuevo OrganizationService
      const payload = {
        name,
        description: description || undefined,
        parent_id: parentId === "none" ? null : parentId
      };
      
      console.log("Enviando a BD:", payload);
      
      // Simulamos carga y volvemos a la lista
      setTimeout(() => navigate("/admin/organizacion"), 1000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col gap-8 animate-fade-in max-w-3xl mx-auto">
      
      {/* HEADER DE LA PÁGINA */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate("/admin/organizacion")}
          className="w-10 h-10 bg-white border border-light rounded-xl flex items-center justify-center text-dark/40 hover:text-dark hover:border-dark/20 transition-all cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-black text-dark tracking-tighter">Crear Organización</h1>
          <p className="text-sm text-dark/40 font-medium">Registra una nueva institución en el sistema.</p>
        </div>
      </div>

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit} className="flex-1 bg-white border border-light rounded-2xl p-6 md:p-8 space-y-6">
        
        {/* INPUT: NOMBRE (Obligatorio) */}
        <div className="space-y-2">
          <label className="text-[11px] font-black text-dark/50 uppercase tracking-[0.15em] ml-1">
            Nombre de la Institución <span className="text-red-500">*</span>
          </label>
          <div className="relative group">
            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30 group-focus-within:text-accent transition-colors" size={18} />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. Club Social Deportivo..."
              className="w-full bg-light/10 border border-light p-4 pl-12 rounded-2xl outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/5 transition-all text-sm font-medium text-dark"
            />
          </div>
        </div>

        {/* INPUT: DESCRIPCIÓN (Opcional) */}
        <div className="space-y-2">
          <label className="text-[11px] font-black text-dark/50 uppercase tracking-[0.15em] ml-1">
            Descripción
          </label>
          <div className="relative group">
            <AlignLeft className="absolute left-4 top-4 text-dark/30 group-focus-within:text-accent transition-colors" size={18} />
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detalles sobre la institución..."
              className="w-full bg-light/10 border border-light p-4 pl-12 rounded-2xl outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/5 transition-all text-sm font-medium text-dark resize-none custom-scrollbar"
            />
          </div>
        </div>

        {/* INPUT: PARENT_ID (Opcional / Jerarquía) */}
        <div className="space-y-2">
          <label className="text-[11px] font-black text-dark/50 uppercase tracking-[0.15em] ml-1">
            Dependencia (Organización Padre)
          </label>
          {/* Asumo que tu componente Select funciona así, si no, lo ajustamos */}
          <Select
            icon={Globe}
            title="Seleccionar dependencia"
            value={ORG_OPTIONS.find(o => o.id === parentId)?.label || ""}
            options={ORG_OPTIONS}
            onChange={(id) => setParentId(id)}
          />
        </div>

        <div className="pt-6 border-t border-light flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/admin/organizacion")}
            className="px-6 py-3 rounded-xl font-bold text-sm text-dark/60 hover:bg-light transition-all cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading || !name}
            className="flex items-center gap-2 bg-accent text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-primary transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          >
            <Save size={18} />
            {isLoading ? "Guardando..." : "Crear Organización"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrganizationCreateScreen;