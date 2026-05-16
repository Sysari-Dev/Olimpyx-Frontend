/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Settings,
  CheckCircle2,
  GitMerge,
  ListOrdered,
  LayoutGrid,
} from "lucide-react";
import { InputText } from "@atoms/InputText";
import type { CreateTournamentRequestDTO } from "../models/tournament-api.model";

interface StepProps {
  data: CreateTournamentRequestDTO;
  onUpdate: (data: Partial<CreateTournamentRequestDTO>) => void;
}

export const StepCompetitionSystem = ({ data, onUpdate }: StepProps) => {
  const systems = [
    {
      id: "GROUP_STAGE",
      label: "Fase de Grupos",
      icon: LayoutGrid,
      desc: "Grupos clasificatorios seguidos de eliminatorias.",
    },
    {
      id: "ROUND_ROBIN",
      label: "Liga (Todos vs Todos)",
      icon: ListOrdered,
      desc: "Sistema de puntuación por jornadas acumulativas.",
    },
    {
      id: "ELIMINATION",
      label: "Eliminación Directa",
      icon: GitMerge,
      desc: "Playoffs inmediatos a partido único o doble.",
    },
  ];

  return (
    <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6 shadow-lg shadow-primary/20">
        <Settings size={32} />
      </div>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-light tracking-tighter">
          Sistema de Juego
        </h2>
        <p className="text-gray/40 text-sm mt-1">
          Selecciona el formato que regirá la competición.
        </p>
      </div>
      <div className="w-full max-w-2xl space-y-4">
        {systems.map((sys) => {
          const isSelected = data.format === sys.id;
          const Icon = sys.icon;
          return (
            <button
              key={sys.id}
              type="button"
              onClick={() => onUpdate({ format: sys.id as any })}
              className={`w-full p-5 rounded-lg border-2 flex items-center gap-5 transition-all duration-300 group cursor-pointer
                ${
                  isSelected
                    ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(var(--primary-rgb),0.05)]"
                    : "border-white/5 bg-white/2 hover:border-white/20 hover:bg-white/5"
                }`}
            >
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 transition-colors
                ${isSelected ? "bg-primary text-white" : "bg-white/5 text-gray/40 group-hover:text-light"}`}
              >
                <Icon size={24} />
              </div>
              <div className="flex-1 text-left">
                <p
                  className={`font-bold transition-colors ${isSelected ? "text-primary" : "text-light"}`}
                >
                  {sys.label}
                </p>
                <p className="text-[11px] text-gray/40 font-medium leading-none mt-1">
                  {sys.desc}
                </p>
              </div>
              {isSelected && (
                <CheckCircle2
                  className="text-primary animate-in zoom-in duration-300"
                  size={20}
                />
              )}
            </button>
          );
        })}
        {data.format && (
          <div className="pt-8 space-y-6 animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center p-6 bg-white/3 rounded-lg border border-white/5 group hover:border-white/10 transition-colors">
              <div className="space-y-1">
                <p className="font-bold text-light text-sm">
                  Partidos de Ida y Vuelta
                </p>
                <p className="text-[11px] text-gray/40 font-medium leading-none">
                  Define si los enfrentamientos tendrán revancha automática.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={data.isHomeAndAway}
                  onChange={(e) =>
                    onUpdate({ isHomeAndAway: e.target.checked })
                  }
                />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-inner"></div>
              </label>
            </div>
            {data.format === "GROUP_STAGE" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-primary/5 border border-primary/10 rounded-lg">
                <InputText
                  label="Cantidad de Grupos"
                  type="number"
                  placeholder="Ej: 4"
                  value={data.groupsCount}
                  onChange={(e) =>
                    onUpdate({ groupsCount: Number(e.target.value) })
                  }
                />
                <InputText
                  label="Clasificados por Grupo"
                  type="number"
                  placeholder="Ej: 2"
                  value={data.qualifiersPerGroup}
                  onChange={(e) =>
                    onUpdate({ qualifiersPerGroup: Number(e.target.value) })
                  }
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
