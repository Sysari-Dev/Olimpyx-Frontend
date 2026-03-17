import Select from "@atoms/Select";
import SearchInput from "@molecules/SearchInput";
import { Trophy, RotateCcw, Search, LayoutGrid } from "lucide-react";

interface FilterBarAltProps {
  onSearchChange: (val: string) => void;
  onEventChange: (id: string | number) => void;
  onSportChange: (sport: string | number) => void;
  onExecuteSearch: () => void;
  onClearFilters: () => void;
  currentEvent: string;
  currentSport: string;
  searchValue: string;
  eventOptions: { id: string | number; label: string }[];
}

const FilterBarAlt = ({
  onSearchChange,
  onEventChange,
  onSportChange,
  onExecuteSearch,
  onClearFilters,
  currentEvent,
  currentSport,
  searchValue,
  eventOptions
}: FilterBarAltProps) => {

  const sportOptions = [
    { id: "Todos", label: "Todos los Deportes" },
    { id: "Fútbol", label: "Fútbol" },
    { id: "Vóley", label: "Vóley" },
    { id: "Básquet", label: "Básquet" },
  ];

  return (
    <div className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl border border-light flex flex-col gap-3 md:gap-4 animate-fade-in">
      <div className="flex items-center gap-2 w-full">
        <div className="grow">
          <SearchInput
            placeholder="Buscar por nombre de torneo..."
            value={searchValue}
            onChange={onSearchChange}
            showButton={false}
          />
        </div>
        <button 
          onClick={onExecuteSearch}
          className="h-12 w-12 shrink-0 bg-accent text-white rounded-xl flex items-center justify-center shadow-lg shadow-accent/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <Search size={20} />
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-2 md:gap-4">
        <div className="grow md:grow-0">
          <Select
            icon={Trophy}
            title="Evento Principal"
            value={currentEvent}
            options={eventOptions}
            onChange={onEventChange}
          />
        </div>
        <div className="grow md:grow-0">
          <Select
            icon={LayoutGrid}
            title="Deporte"
            value={currentSport}
            options={sportOptions}
            onChange={onSportChange}
          />
        </div>
        <button 
          onClick={onClearFilters}
          type="button"
          className="h-12 px-4 bg-light/30 text-dark/40 hover:text-accent hover:bg-accent/10 border border-transparent hover:border-accent/20 rounded-xl transition-all cursor-pointer active:scale-95 flex items-center gap-2 group"
        >
          <RotateCcw size={18} className="group-hover:-rotate-45 transition-transform" />
          <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider">Limpiar</span>
        </button>
      </div>
    </div>
  );
};

export default FilterBarAlt;