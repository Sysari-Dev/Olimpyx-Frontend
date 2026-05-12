import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Save, X, Plus } from "lucide-react";
import { InputText } from "@atoms/InputText";
import { Button } from "@atoms/Button";
import { FormSection } from "@organisms/FormSection";
import { useAppSelector } from "@store/hooks";
import { useTeam } from "../hooks/useTeam";

const TeamCreatePage = () => {
  const navigate = useNavigate();
  const { activeOrg } = useAppSelector((state) => state.auth);
  const { createTeam, isLoading } = useTeam();

  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const validateField = (value: string) => {
    if (value.trim().length > 0 && value.trim().length < 3) {
      setError("El nombre debe tener al menos 3 caracteres");
    } else {
      setError("");
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    validateField(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeOrg?.id) return;

    const success = await createTeam(activeOrg.id, name);
    if (success) {
      navigate("/admin/equipos");
    }
  };

  const isButtonDisabled = name.trim().length < 3 || isLoading;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="space-y-2">
        <div className="flex items-center gap-2 text-secondary">
          <Plus size={16} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Registro de competidor</span>
        </div>
        <h2 className="text-3xl font-bold text-light tracking-tighter">Nuevo Equipo</h2>
      </header>
      <FormSection
        title="Información del club"
        description={`Registrando equipo para la organización: ${activeOrg?.name}`}
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
              Registrar Equipo
            </Button>
          </>
        }
      >
        <InputText
          label="Nombre oficial del equipo"
          icon={Shield}
          value={name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={error}
          placeholder="Ej. Club Deportivo Municipal"
          required
          disabled={isLoading}
          className="md:col-span-2"
        />
      </FormSection>
    </div>
  );
};

export default TeamCreatePage;