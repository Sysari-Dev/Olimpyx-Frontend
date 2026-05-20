import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, AlignLeft, Globe, ArrowLeft, Save, AlertCircle } from "lucide-react";
import { isAxiosError } from "axios";
import Select from "@atoms/Select"; 
import { OrganizationService } from "src/core/services/organization.service";

const ORG_OPTIONS = [
  { id: "none", label: "Ninguna (Organización Principal)" },
  { id: "1", label: "Municipalidad de Abancay" },
  { id: "2", label: "Liga Distrital de Fútbol" },
];

const OrganizationCreateScreen = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estados del formulario basados en tu modelo
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [parentId, setParentId] = useState<string | number>("none");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Armamos el paquete exactamente como lo pide Postman
      const payload = {
        name,
        description: description || undefined,
        parentId: parentId === "none" ? null : String(parentId)
      };
      
      console.log("Enviando a BD:", payload);
      
      // Llamada real al backend
      await OrganizationService.create(payload);
      
      // Volvemos a la lista si todo fue exitoso
      navigate("/admin/organizacion");

    } catch (err: unknown) {
      console.error("Error al crear organización:", err);
      
      // Manejo de errores seguro para la UI
      if (isAxiosError(err)) {
        const backendMessage = err.response?.data?.message;
        let errorMessage = "Error al crear la organización. Inténtalo de nuevo.";
        
        if (backendMessage && typeof backendMessage === 'object' && backendMessage.content) {
            errorMessage = backendMessage.content;
        } else if (typeof backendMessage === 'string') {
            errorMessage = backendMessage;
        }
        setError(errorMessage);
      } else {
        setError("Ocurrió un error inesperado.");
      }
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
          disabled={isLoading}
          className="w-10 h-10 bg-white border border-light rounded-xl flex items-center justify-center text-dark/40 hover:text-dark hover:border-dark/20 transition-all cursor-pointer disabled:opacity-50"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-black text-dark tracking-tighter">Crear Organización</h1>
          <p className="text-sm text-dark/40 font-medium">Registra una nueva institución en el sistema.</p>
        </div>
      </div>

      {/* ALERTA DE ERROR */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-bold animate-fade-in">
          <AlertCircle size={18} className="shrink-0" />
          <p>{error}</p>
        </div>
      )}

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
              disabled={isLoading}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. Club Social Deportivo..."
              className="w-full bg-light/10 border border-light p-4 pl-12 rounded-2xl outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/5 transition-all text-sm font-medium text-dark disabled:opacity-50"
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
              disabled={isLoading}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detalles sobre la institución..."
              className="w-full bg-light/10 border border-light p-4 pl-12 rounded-2xl outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/5 transition-all text-sm font-medium text-dark resize-none custom-scrollbar disabled:opacity-50"
            />
          </div>
        </div>

        {/* INPUT: PARENT_ID (Opcional / Jerarquía) */}
        <div className="space-y-2">
          <label className="text-[11px] font-black text-dark/50 uppercase tracking-[0.15em] ml-1">
            Dependencia (Organización Padre)
          </label>
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
            disabled={isLoading}
            onClick={() => navigate("/admin/organizacion")}
            className="px-6 py-3 rounded-xl font-bold text-sm text-dark/60 hover:bg-light transition-all cursor-pointer disabled:opacity-50"
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