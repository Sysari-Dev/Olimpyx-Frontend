import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Trophy,
  Calendar,
  MapPin,
  AlignLeft,
  Save,
  X,
  Plus,
} from "lucide-react";
import { InputText } from "@atoms/InputText";
import { Button } from "@atoms/Button";
import { FormSection } from "@organisms/FormSection";
import { useAppSelector } from "@store/hooks";
import { useEvent } from "../hooks/useEvent";

const EventCreatePage = () => {
  const navigate = useNavigate();
  const { activeOrg } = useAppSelector((state) => state.auth);
  const { createEvent, isLoading } = useEvent();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    start_date: "",
    end_date: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    dates: "",
  });

  const validateField = (name: string, value: string) => {
    if (name === "name" && value.trim().length > 0 && value.trim().length < 3) {
      setErrors((prev) => ({ ...prev, name: "Mínimo 3 caracteres" }));
    } else if (name === "name") {
      setErrors((prev) => ({ ...prev, name: "" }));
    }

    if (formData.start_date && formData.end_date) {
      if (new Date(formData.start_date) > new Date(formData.end_date)) {
        setErrors((prev) => ({
          ...prev,
          dates: "La fecha de fin debe ser posterior al inicio",
        }));
      } else {
        setErrors((prev) => ({ ...prev, dates: "" }));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors.name && name === "name")
      setErrors((prev) => ({ ...prev, name: "" }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    validateField(e.target.name, e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeOrg?.id) return;

    const payload = {
      ...formData,
      organizationId: activeOrg.id,
      start_date: new Date(formData.start_date).toISOString(),
      end_date: new Date(formData.end_date).toISOString(),
    };

    const success = await createEvent(payload);

    if (success) {
      navigate("/admin/eventos");
    }
  };

  const isButtonDisabled =
    formData.name.trim().length < 3 ||
    !formData.start_date ||
    !formData.end_date ||
    !!errors.dates ||
    isLoading;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="space-y-2">
        <div className="flex items-center gap-2 text-secondary">
          <Plus size={16} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
            Planificación
          </span>
        </div>
        <h2 className="text-3xl font-bold text-light tracking-tighter">
          Crear Nuevo Evento
        </h2>
      </header>

      <FormSection
        title="Detalles del Evento"
        description="Define los parámetros base para tu competencia deportiva."
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
              Guardar Evento
            </Button>
          </>
        }
      >
        <InputText
          name="name"
          label="Nombre del Evento"
          icon={Trophy}
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
          placeholder="Ej. Torneo Apertura 2026"
          required
          disabled={isLoading}
          className="md:col-span-2"
        />

        <InputText
          name="location"
          label="Ubicación / Sede"
          icon={MapPin}
          value={formData.location}
          onChange={handleChange}
          placeholder="Ej. Estadio Monumental de Condebamba"
          disabled={isLoading}
          className="md:col-span-2"
        />

        <InputText
          name="start_date"
          label="Fecha de Inicio"
          type="date"
          icon={Calendar}
          value={formData.start_date}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          disabled={isLoading}
        />

        <InputText
          name="end_date"
          label="Fecha de Finalización"
          type="date"
          icon={Calendar}
          value={formData.end_date}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.dates}
          required
          disabled={isLoading}
        />

        <InputText
          name="description"
          label="Descripción"
          icon={AlignLeft}
          value={formData.description}
          onChange={handleChange}
          placeholder="Breve resumen del propósito del evento..."
          disabled={isLoading}
          className="md:col-span-2"
        />
      </FormSection>
    </div>
  );
};

export default EventCreatePage;
