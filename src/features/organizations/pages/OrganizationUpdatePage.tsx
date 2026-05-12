import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, AlignLeft, Save, X } from "lucide-react";
import { InputText } from "@atoms/InputText";
import { Button } from "@atoms/Button";
import { FormSection } from "@organisms/FormSection";
import { useAppSelector } from "@store/hooks";
import { useOrganization } from "../hooks/useOrganization";

const OrganizationUpdatePage = () => {
  const navigate = useNavigate();
  const { activeOrg } = useAppSelector((state) => state.auth);
  const { updateOrganization, isLoading } = useOrganization();
  
  const [formData, setFormData] = useState({
    name: activeOrg?.name || "",
    description: activeOrg?.description || ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeOrg?.id) return;

    const success = await updateOrganization(activeOrg.id, formData);
    if (success) {
      navigate("/admin/organizacion");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="space-y-2">
        <div className="flex items-center gap-2 text-primary">
          <Building2 size={16} />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Configuración</span>
        </div>
        <h2 className="text-3xl font-bold text-light tracking-tighter">Editar Organización</h2>
      </header>
      <FormSection
        title="Información básica"
        description="Actualiza los detalles públicos de tu entidad deportiva."
        onSubmit={handleSubmit}
        footer={
          <>
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)} 
              type="button"
              disabled={isLoading}
              icon={X}
            >
              Cancelar
            </Button>
            <Button 
              icon={Save} 
              showShadow 
              type="submit"
              isLoading={isLoading}
            >
              Guardar Cambios
            </Button>
          </>
        }
      >
        <InputText
          label="Nombre de la Organización"
          icon={Building2}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Ej. Liga Departamental de Apurímac"
          required
          disabled={isLoading}
          className="md:col-span-2"
        />
        <InputText
          label="Descripción"
          icon={AlignLeft}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Breve descripción de la entidad..."
          disabled={isLoading}
          className="md:col-span-2"
        />
      </FormSection>
    </div>
  );
};

export default OrganizationUpdatePage;