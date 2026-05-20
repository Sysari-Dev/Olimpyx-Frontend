import { Search, Trophy, Calendar, RotateCcw } from "lucide-react";
import { InputText } from "@atoms/InputText";
import { SelectCustom } from "@atoms/SelectCustom";

interface FilterBarProps {
  onSearchChange: (val: string) => void;
  onEventChange: (id: string) => void;
  onTournamentChange: (id: string) => void;
  onClearFilters: () => void;
  selectedEventId: string;
  selectedTournamentId: string;
  searchValue: string;
  eventOptions: { id: string; name: string }[];
  tournamentOptions: { id: string; name: string }[];
}

export const FilterBar = ({
  onSearchChange,
  onEventChange,
  onTournamentChange,
  onClearFilters,
  selectedEventId,
  selectedTournamentId,
  searchValue,
  eventOptions,
  tournamentOptions,
}: FilterBarProps) => {
  return (
    <div className="bg-[#1A1A1A] p-4 rounded-lg border border-white/5 flex flex-col lg:flex-row lg:items-end gap-4">
      <div className="flex-1">
        <InputText
          placeholder="Buscar encuentros por club..."
          icon={Search}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-4">
        <SelectCustom
          options={eventOptions}
          selectedId={selectedEventId}
          onSelect={onEventChange}
          icon={Calendar}
          placeholder="Seleccionar Evento"
        />
        <SelectCustom
          options={tournamentOptions}
          selectedId={selectedTournamentId}
          onSelect={onTournamentChange}
          icon={Trophy}
          placeholder="Seleccionar Torneo"
          disabled={tournamentOptions.length === 0}
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