import { Search, Trophy, RotateCcw } from "lucide-react";
import { InputText } from "@atoms/InputText";
import { SelectCustom } from "@atoms/SelectCustom";

interface FilterBarProps {
  onSearchChange: (val: string) => void;
  onTournamentChange: (id: string) => void;
  onClearFilters: () => void;
  selectedTournamentId: string;
  searchValue: string;
}

export const FilterBar = ({
  onSearchChange,
  onTournamentChange,
  onClearFilters,
  selectedTournamentId,
  searchValue
}: FilterBarProps) => {
  const tournamentOptions = [
    { id: "1", name: "Copa Inter-Comunidades" },
    { id: "2", name: "Torneo Femenino Vóley" },
    { id: "3", name: "Liga Distrital Abancay" },
  ];

  return (
    <div className="bg-[#1A1A1A] p-4 rounded-lg border border-white/5 flex flex-col md:flex-row md:items-end gap-4">
      <div className="flex-1">
        <InputText
          placeholder="Buscar equipos por nombre de club..."
          icon={Search}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap sm:flex-nowrap items-center gap-4">
        <SelectCustom
          options={tournamentOptions}
          selectedId={selectedTournamentId}
          onSelect={onTournamentChange}
          icon={Trophy}
          placeholder="Filtrar por torneo"
        />

        <button
          onClick={onClearFilters}
          type="button"
          className="h-12 px-4 bg-white/5 text-gray hover:text-secondary hover:bg-secondary/10 border border-white/5 hover:border-secondary/20 rounded-lg transition-all cursor-pointer flex items-center gap-2 group text-xs font-black uppercase tracking-widest shrink-0"
        >
          <RotateCcw size={14} className="group-hover:-rotate-45 transition-transform" />
          <span>Limpiar</span>
        </button>
      </div>
    </div>
  );
};