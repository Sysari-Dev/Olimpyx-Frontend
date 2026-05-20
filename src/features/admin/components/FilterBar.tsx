import DatePicker from "@atoms/DatePicker";
import Select from "@atoms/Select";
import SearchInput from "@molecules/SearchInput";
import { Trophy, RotateCcw, Search } from "lucide-react";

interface FilterBarProps {
  onSearchChange: (val: string) => void;
  onDateChange: (date: Date) => void;
  onTournamentChange: (id: string | number) => void;
  onExecuteSearch: () => void;
  onClearFilters: () => void;
  currentTournament: string;
  currentDate: Date;
  searchValue: string;
}

const FilterBar = ({
  onSearchChange,
  onDateChange,
  onTournamentChange,
  onExecuteSearch,
  onClearFilters,
  currentTournament,
  currentDate,
  searchValue
}: FilterBarProps) => {
  
  const tournamentOptions = [
    { id: 1, label: "Copa Inter-Comunidades" },
    { id: 2, label: "Torneo Femenino Vóley" },
    { id: 3, label: "Liga Distrital Abancay" },
  ];

  return (
    <div className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl border border-light flex flex-col gap-3 md:gap-4 animate-fade-in">
      <div className="flex items-center gap-2 w-full">
        <div className="grow">
          <SearchInput
            placeholder="Buscar equipos..."
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
            title="Torneo"
            value={currentTournament}
            options={tournamentOptions}
            onChange={onTournamentChange}
          />
        </div>
        <div className="grow md:grow-0">
          <DatePicker 
            date={currentDate}
            onChange={onDateChange}
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

export default FilterBar;