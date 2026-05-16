/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useMemo } from "react";
import { Plus, LayoutGrid, Clock } from "lucide-react";
import { Button } from "@atoms/Button";
import { FilterBar } from "../components/FilterBar";
import { MatchList } from "../components/MatchList";
import { MOCK_MATCHES } from "../mocks/match.mock";

const MatchSchedulerPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTournamentId, setSelectedTournamentId] = useState<string>("3");

  const tournamentNames: Record<string, string> = {
    "1": "Copa Inter-Comunidades",
    "2": "Torneo Femenino Vóley",
    "3": "Liga Distrital Abancay",
  };

  const filteredMatches = useMemo(() => {
    return MOCK_MATCHES.filter((match) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        match.team1Name.toLowerCase().includes(searchLower) ||
        match.team2Name.toLowerCase().includes(searchLower);
        
      const matchesTournament = match.tournamentName === tournamentNames[selectedTournamentId];

      return matchesSearch && matchesTournament;
    });
  }, [searchTerm, selectedTournamentId]);

  const resetAll = () => {
    setSearchTerm("");
    setSelectedTournamentId("3");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary">
            <LayoutGrid size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Calendario</span>
          </div>
          <h2 className="text-3xl font-bold text-light tracking-tighter">Gestión de Partidos</h2>
        </div>

        <Button icon={Plus} showShadow onClick={() => console.log("Nuevo partido workflow")}>
          Nuevo Partido
        </Button>
      </header>

      <FilterBar
        selectedTournamentId={selectedTournamentId}
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        onTournamentChange={setSelectedTournamentId}
        onClearFilters={resetAll}
      />

      <main>
        <MatchList matches={filteredMatches} />
      </main>

      <footer className="p-4 bg-primary/5 border border-primary/10 rounded-lg flex items-center gap-4">
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
          <Clock size={16} />
        </div>
        <div className="space-y-0.5">
          <p className="text-xs font-bold text-primary uppercase tracking-widest">Tip de Gestión</p>
          <p className="text-[11px] text-gray/40 font-medium leading-tight">
            Haz clic en las filas de los encuentros con marcador <strong className="text-secondary uppercase">"En Vivo"</strong> para acceder al panel de arbitraje y actualización de puntos en tiempo real.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MatchSchedulerPage;