import DatePicker from "@atoms/DatePicker";
import Select from "@atoms/Select";
import SearchInput from "@molecules/SearchInput";
import { Trophy, RotateCcw } from "lucide-react";

interface FilterBarProps {
  onSearch: (val: string) => void;
  onDateChange: (date: Date) => void;
  onTournamentChange: (id: string | number) => void;
  onClearFilters: () => void;
  currentTournament: string;
  currentDate: Date;
  searchValue: string;
}

const FilterBar = ({
  onSearch,
  onDateChange,
  onTournamentChange,
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
    <div className="bg-white p-4 rounded-[2rem] border border-light shadow-sm flex flex-col lg:flex-row items-center gap-4 animate-fade-in">
      <div className="w-full lg:w-auto">
        <Select
          icon={Trophy}
          title="Torneo Actual"
          value={currentTournament}
          options={tournamentOptions}
          onChange={onTournamentChange}
        />
      </div>

      <div className="w-full lg:flex-grow">
        <SearchInput
          placeholder="Buscar por equipo o partido..."
          value={searchValue}
          onChange={onSearch}
          onSearch={(val: string) => console.log("Buscando:", val)}
          showButton={true}
        />
      </div>

      <div className="w-full lg:w-auto flex items-center gap-2">
        <DatePicker 
          date={currentDate}
          onChange={onDateChange}
        />

        <button 
          onClick={onClearFilters}
          type="button"
          className="p-3 bg-light/50 text-dark/40 hover:text-accent hover:bg-accent/10 border border-transparent hover:border-accent/20 rounded-2xl transition-all cursor-pointer active:scale-95 flex items-center gap-2 group"
        >
          <RotateCcw size={18} className="group-hover:rotate-[-45deg] transition-transform" />
          <span className="lg:hidden text-sm font-bold">Limpiar</span>
        </button>
      </div>
    </div>
  );
};

export default FilterBar;