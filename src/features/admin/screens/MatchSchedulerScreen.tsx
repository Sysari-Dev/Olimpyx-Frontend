import { useState, useMemo } from "react";
import { Plus, Clock } from "lucide-react";
import PageHeader from "../components/PageHeader";
import FilterBar from "../components/FilterBar";
import MatchList from "../components/MatchList";
import type { Match } from "src/shared/models/match.model"; // Importamos el modelo

const MATCHES: Match[] = [
  {
    id: "1",
    tournament: "Liga Distrital Abancay",
    sport: "Fútbol",
    team1: "Miguel Grau",
    team2: "DEA Abancay",
    time: "13:00",
    date: "17 Mar, 2026",
    status: "LIVE",
    score: "1 - 1",
  },
  {
    id: "2",
    tournament: "Copa Inter-Comunidades",
    sport: "Fútbol",
    team1: "Santos FC",
    team2: "Curibamba City",
    time: "09:00",
    date: "17 Mar, 2026", 
    status: "FINISHED",
    score: "3 - 0",
  },
  {
    id: "3",
    tournament: "Torneo Femenino Vóley",
    sport: "Vóley",
    team1: "Las Poderosas",
    team2: "Sport Girls Abancay",
    time: "15:00",
    date: "16 Mar, 2026", 
    status: "FINISHED",
    score: "3 - 1",
  },
  {
    id: "4",
    tournament: "Liga Distrital Abancay",
    sport: "Fútbol",
    team1: "Social Olivo",
    team2: "CD Educación",
    time: "16:00",
    date: "15 Mar, 2026",
    status: "FINISHED",
    score: "2 - 2",
  },
  {
    id: "5",
    tournament: "Liga Distrital Abancay",
    sport: "Fútbol",
    team1: "Imperial Abancay",
    team2: "Apurímac United",
    time: "15:30",
    date: "17 Mar, 2026",
    status: "LIVE",
    score: "0 - 0",
  },
  {
    id: "6",
    tournament: "Torneo Femenino Vóley",
    sport: "Vóley",
    team1: "Club Victoria",
    team2: "Amazonas Vóley",
    time: "17:00",
    date: "17 Mar, 2026",
    status: "UPCOMING",
    score: "0 - 0",
  },
  {
    id: "7",
    tournament: "Copa Inter-Comunidades",
    sport: "Fútbol",
    team1: "San Antonio",
    team2: "Los Chankas Jr",
    time: "10:00",
    date: "18 Mar, 2026",
    status: "UPCOMING",
    score: "0 - 0",
  },
  {
    id: "8",
    tournament: "Liga Distrital Abancay",
    sport: "Fútbol",
    team1: "Santiago Pata",
    team2: "Micaela Bastidas",
    time: "14:00",
    date: "18 Mar, 2026",
    status: "UPCOMING",
    score: "0 - 0",
  },
  {
    id: "9",
    tournament: "Torneo Femenino Vóley",
    sport: "Vóley",
    team1: "Águilas Doradas",
    team2: "Santuario Vóley",
    time: "16:00",
    date: "19 Mar, 2026",
    status: "UPCOMING",
    score: "0 - 0",
  },
  {
    id: "10",
    tournament: "Copa Inter-Comunidades",
    sport: "Fútbol",
    team1: "Bellavista FC",
    team2: "Tamburco Rayo",
    time: "08:30",
    date: "20 Mar, 2026",
    status: "UPCOMING",
    score: "0 - 0",
  },
];

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
    return tournamentOptions.find((t) => t.id === selectedTournamentId)?.label || "Seleccionar Torneo";
  }, [selectedTournamentId]);

  const filteredMatches = useMemo(() => {
    return MATCHES.filter((match) => {
      const matchesSearch = 
        match.team1.toLowerCase().includes(searchTerm.toLowerCase()) ||
        match.team2.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTournament = match.tournament === currentTournamentName;

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
