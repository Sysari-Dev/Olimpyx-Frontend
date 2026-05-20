import { useState, useMemo } from "react";
import { Plus, Clock } from "lucide-react";
import PageHeader from "../components/PageHeader";
import FilterBar from "../components/FilterBar";
import MatchList from "../components/MatchList";
import type { Match } from "src/shared/models/match.model"; 

const MATCHES = [
  {
    id: "1",
    tournament: { name: "Liga Distrital Abancay" },
    team1: { name: "Miguel Grau" },
    team2: { name: "DEA Abancay" },
    matchDate: "17 Mar, 2026",
    status: "LIVE",
    scoreTeam1: 1,
    scoreTeam2: 1,
  },
  {
    id: "2",
    tournament: { name: "Copa Inter-Comunidades" },
    team1: { name: "Santos FC" },
    team2: { name: "Curibamba City" },
    matchDate: "17 Mar, 2026", 
    status: "FINISHED",
    scoreTeam1: 3,
    scoreTeam2: 0,
  },
  {
    id: "3",
    tournament: { name: "Torneo Femenino Vóley" },
    team1: { name: "Las Poderosas" },
    team2: { name: "Sport Girls Abancay" },
    matchDate: "16 Mar, 2026", 
    status: "FINISHED",
    scoreTeam1: 3,
    scoreTeam2: 1,
  },
  {
    id: "4",
    tournament: { name: "Liga Distrital Abancay" },
    team1: { name: "Social Olivo" },
    team2: { name: "CD Educación" },
    matchDate: "15 Mar, 2026",
    status: "FINISHED",
    scoreTeam1: 2,
    scoreTeam2: 2,
  },
  {
    id: "5",
    tournament: { name: "Liga Distrital Abancay" },
    team1: { name: "Imperial Abancay" },
    team2: { name: "Apurímac United" },
    matchDate: "17 Mar, 2026",
    status: "LIVE",
    scoreTeam1: 0,
    scoreTeam2: 0,
  },
  {
    id: "6",
    tournament: { name: "Torneo Femenino Vóley" },
    team1: { name: "Club Victoria" },
    team2: { name: "Amazonas Vóley" },
    matchDate: "17 Mar, 2026",
    status: "PENDING", 
    scoreTeam1: 0,
    scoreTeam2: 0,
  }
] as unknown as Match[];

const MatchSchedulerScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTournamentId, setSelectedTournamentId] = useState<string | number>(1);

  const tournamentOptions = [
    { id: 1, label: "Copa Inter-Comunidades" },
    { id: 2, label: "Torneo Femenino Vóley" },
    { id: 3, label: "Liga Distrital Abancay" },
  ];

  const currentTournamentName = useMemo(() => {
    return tournamentOptions.find((t) => t.id === Number(selectedTournamentId))?.label || "Seleccionar Torneo";
  }, [selectedTournamentId]);

  const filteredMatches = useMemo(() => {
    return MATCHES.filter((match: Match) => {
      // Extraemos los nombres forzando el tipo para evitar el 'any'
      const t1Name = (match.team1 as unknown as { name: string })?.name || "";
      const t2Name = (match.team2 as unknown as { name: string })?.name || "";
      const tourneyName = (match.tournament as unknown as { name: string })?.name || "";

      const matchesSearch = 
        t1Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t2Name.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesTournament = tourneyName === currentTournamentName;

      return matchesSearch && matchesTournament;
    });
  }, [searchTerm, currentTournamentName]); 

  const handleExecuteSearch = () => {
    console.log("Resultados encontrados:", filteredMatches.length);
  };

  const resetAll = () => {
    setSearchTerm("");
    setSelectedDate(new Date());
    setSelectedTournamentId(1);
  };

  return (
    <div className="h-full flex flex-col gap-6 animate-fade-in">
      <div className="shrink-0 space-y-6">
        <PageHeader
          title="Gestión de partidos"
          subtitle="Organiza y controla los encuentros en tiempo real."
          buttonLabel="Nuevo partido"
          buttonIcon={<Plus size={20} />}
          onButtonClick={() => console.log("Nuevo Partido")}
        />
        <FilterBar
          currentTournament={currentTournamentName}
          currentDate={selectedDate}
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          onDateChange={setSelectedDate}
          onTournamentChange={(id) => setSelectedTournamentId(id)}
          onExecuteSearch={handleExecuteSearch}
          onClearFilters={resetAll}
        />
      </div>
      <div className="flex-1 min-h-0">
        <MatchList matches={filteredMatches} />
      </div>
      <div className="shrink-0 bg-white p-3 rounded-xl flex items-center gap-3 border border-light">
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
          <Clock size={16} />
        </div>
        <p className="text-[11px] text-dark/60 font-medium leading-tight">
          <span className="font-bold text-dark block text-xs">Tip de Gestión:</span>
          Haz clic en el marcador de un partido <span className="text-tertiary font-bold">"En Vivo"</span> para actualizar puntos.
        </p>
      </div>
    </div>
  );
};

export default MatchSchedulerScreen;