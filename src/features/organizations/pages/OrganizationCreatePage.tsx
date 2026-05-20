import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, AlignLeft, Save, X, Plus } from "lucide-react";
import { InputText } from "@atoms/InputText";
import { Button } from "@atoms/Button";
import { FormSection } from "@organisms/FormSection";
import { useOrganization } from "../hooks/useOrganization";

const OrganizationCreatePage = () => {
  const navigate = useNavigate();
  const { createOrganization, isLoading } = useOrganization();
  
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [errors, setErrors] = useState({ name: "", description: "" });

  const validateField = (name: string, value: string) => {
    if (value.trim().length > 0 && value.trim().length < 3) {
      setErrors(prev => ({ ...prev, [name]: "Mínimo 3 caracteres" }));
    } else {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createOrganization({
      ...formData,
      parentId: null
    });
  };

  const isButtonDisabled = 
    formData.name.trim().length < 3 || 
    formData.description.trim().length < 3 ||
    isLoading;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="space-y-2">
        <div className="flex items-center gap-2 text-secondary">
          <Plus size={16} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Registro</span>
        </div>
        <h2 className="text-3xl font-bold text-light tracking-tighter">Nueva Entidad</h2>
      </header>

      <FormSection
        title="Configuración de Entidad"
        description="Registra una nueva organización para gestionar eventos y equipos."
        onSubmit={handleSubmit}
        footer={
          <>
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)} 
              type="button" 
              icon={X}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button 
              icon={Save} 
              showShadow 
              type="submit" 
              disabled={isButtonDisabled}
              isLoading={isLoading}
            >
              Crear Organización
            </Button>
          </>
        }
      >
        <InputText
          name="name"
          label="Nombre de la Organización"
          icon={Building2}
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
          placeholder="Ej. Liga Departamental"
          required
          disabled={isLoading}
          className="md:col-span-2"
        />
        <InputText
          name="description"
          label="Descripción"
          icon={AlignLeft}
          value={formData.description}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.description}
          placeholder="Descripción de la entidad..."
          required
          disabled={isLoading}
          className="md:col-span-2"
        />
      </FormSection>
    </div>
  );
};

export default OrganizationCreatePage;