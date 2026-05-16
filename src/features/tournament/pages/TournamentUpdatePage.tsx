/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Trophy, Save, X, Settings, ListOrdered } from "lucide-react";
import { InputText } from "@atoms/InputText";
import { Button } from "@atoms/Button";
import { SelectCustom } from "@atoms/SelectCustom";
import { LoadingState } from "@atoms/LoadingState";
import { useTournament } from "../hooks/useTournament";

const TournamentUpdatePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTournamentDetail, updateTournamentConfig, isLoading } =
    useTournament();

  const [formData, setFormData] = useState({
    name: "",
    format: "GROUP_STAGE",
    pointsPerWin: 3,
    pointsPerDraw: 1,
    pointsPerLoss: 0,
  });

  const [errors, setErrors] = useState({
    name: "",
    pointsPerWin: "",
    pointsPerDraw: "",
    pointsPerLoss: "",
  });

  const formats = [
    { id: "GROUP_STAGE", name: "Fase de Grupos" },
    { id: "ROUND_ROBIN", name: "Liga (Todos vs Todos)" },
    { id: "ELIMINATION", name: "Eliminación Directa" },
  ];

  useEffect(() => {
    if (id) {
      const loadTournament = async () => {
        const data = await getTournamentDetail(id);
        if (data) {
          setFormData({
            name: data.name,
            format: data.format,
            pointsPerWin: data.pointsPerWin,
            pointsPerDraw: data.pointsPerDraw,
            pointsPerLoss: data.pointsPerLoss,
          });
        }
      };
      loadTournament();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const finalValue = type === "number" ? Number(value) : value;

    setFormData((prev) => ({ ...prev, [name]: finalValue }));

    if (name === "name") {
      if (value.trim().length < 3) {
        setErrors((prev) => ({
          ...prev,
          name: "El nombre debe tener al menos 3 caracteres",
        }));
      } else {
        setErrors((prev) => ({ ...prev, name: "" }));
      }
    }

    if (type === "number") {
      if (Number(value) < 0) {
        setErrors((prev) => ({
          ...prev,
          [name]: "El valor no puede ser negativo",
        }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    }
  };

  const handleFormatChange = (newFormat: string) => {
    setFormData((prev) => ({ ...prev, format: newFormat }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || Object.values(errors).some((err) => err !== "")) return;

    const success = await updateTournamentConfig(id, formData);
    if (success) {
      navigate(-1);
    }
  };

  if (isLoading && !formData.name) {
    return (
      <LoadingState
        text="Obteniendo configuración del torneo..."
        variant="secondary"
      />
    );
  }

  const isFormInvalid =
    formData.name.trim().length < 3 ||
    Object.values(errors).some((err) => err !== "") ||
    isLoading;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="space-y-2">
        <div className="flex items-center gap-2 text-primary">
          <Settings size={16} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
            Panel de Control
          </span>
        </div>
        <h2 className="text-3xl font-bold text-light tracking-tighter">
          Ajustar Torneo
        </h2>
      </header>

      <form
        onSubmit={handleSubmit}
        className="bg-[#1A1A1A] border border-white/5 rounded-lg p-8 shadow-2xl space-y-8"
      >
        <div className="space-y-2">
          <h3 className="text-sm font-black uppercase text-light tracking-widest">
            Parámetros de Competición
          </h3>
          <p className="text-xs text-gray/40 leading-relaxed">
            Modifica los aspectos estructurales del torneo. Ten en cuenta que
            cambiar las reglas de puntuación afectará las tablas de posiciones
            en tiempo real.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <InputText
              name="name"
              label="Nombre del Torneo"
              icon={Trophy}
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black uppercase text-gray/40 tracking-[0.2em] px-1">
              Sistema de Formato
            </span>
            <SelectCustom
              options={formats}
              selectedId={formData.format}
              onSelect={handleFormatChange}
              icon={ListOrdered}
              disabled={isLoading}
            />
          </div>

          <InputText
            name="pointsPerWin"
            label="Puntos por Victoria"
            type="number"
            value={formData.pointsPerWin}
            onChange={handleChange}
            error={errors.pointsPerWin}
            required
            disabled={isLoading}
          />

          <InputText
            name="pointsPerDraw"
            label="Puntos por Empate"
            type="number"
            value={formData.pointsPerDraw}
            onChange={handleChange}
            error={errors.pointsPerDraw}
            required
            disabled={isLoading}
          />

          <InputText
            name="pointsPerLoss"
            label="Puntos por Derrota"
            type="number"
            value={formData.pointsPerLoss}
            onChange={handleChange}
            error={errors.pointsPerLoss}
            required
            disabled={isLoading}
          />
        </div>

        <div className="flex items-center justify-end gap-4 pt-6 border-t border-white/5">
          <Button
            variant="outline"
            icon={X}
            type="button"
            onClick={() => navigate(-1)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            icon={Save}
            showShadow
            type="submit"
            disabled={isFormInvalid}
            isLoading={isLoading}
          >
            Guardar Ajustes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TournamentUpdatePage;
