import { useState, useMemo } from "react";
import { Plus, Trophy } from "lucide-react";
import type { Tournament } from "src/shared/models/tournament.model";
import PageHeader from "../components/PageHeader";
import TournamentList from "../components/TournamentList";
import FilterBarAlt from "../components/FilterBarAlt";

const MOCK_TOURNAMENTS: Tournament[] = [
  {
    id: "t1",
    name: "Fútbol Varones - Libre",
    eventId: 1,
    sport: "Fútbol",
    category: "Libre",
    teamsCount: 16,
    status: "REGISTRATION",
    startDate: "10 Jan 2026",
  },
  {
    id: "t2",
    name: "Vóley Mujeres - Sub-19",
    eventId: 1,
    sport: "Vóley",
    category: "Sub-19",
    teamsCount: 8,
    status: "IN_PROGRESS",
    startDate: "05 Feb 2026",
  },
  {
    id: "t3",
    name: "Basket Masculino - Open",
    eventId: 2,
    sport: "Basket",
    category: "Libre",
    teamsCount: 12,
    status: "FINISHED",
    startDate: "12 Jan 2026",
  },
  {
    id: "t4",
    name: "Fútbol Femenino - Sub-17",
    eventId: 2,
    sport: "Fútbol",
    category: "Sub-17",
    teamsCount: 10,
    status: "IN_PROGRESS",
    startDate: "20 Feb 2026",
  },
  {
    id: "t5",
    name: "Vóley Mixto - Amateur",
    eventId: 3,
    sport: "Vóley",
    category: "Amateur",
    teamsCount: 6,
    status: "REGISTRATION",
    startDate: "01 Mar 2026",
  },
  {
    id: "t6",
    name: "Futsal Varones - Libre",
    eventId: 3,
    sport: "Futsal",
    category: "Libre",
    teamsCount: 14,
    status: "IN_PROGRESS",
    startDate: "18 Mar 2026",
  },
  {
    id: "t7",
    name: "Basket Femenino - Sub-21",
    eventId: 2,
    sport: "Basket",
    category: "Sub-21",
    teamsCount: 8,
    status: "REGISTRATION",
    startDate: "25 Apr 2026",
  },
  {
    id: "t8",
    name: "Fútbol Varones - Master",
    eventId: 3,
    sport: "Fútbol",
    category: "35+",
    teamsCount: 10,
    status: "FINISHED",
    startDate: "15 Jan 2026",
  },
  {
    id: "t9",
    name: "Vóley Mujeres - Libre",
    eventId: 2,
    sport: "Vóley",
    category: "Libre",
    teamsCount: 12,
    status: "IN_PROGRESS",
    startDate: "08 May 2026",
  },
  {
    id: "t10",
    name: "Futsal Mixto - Universitario",
    eventId: 1,
    sport: "Futsal",
    category: "Universitario",
    teamsCount: 16,
    status: "REGISTRATION",
    startDate: "30 Jun 2026",
  },

  {
    id: "t10",
    name: "Fútbol Femenino - Libre",
    eventId: 1,
    sport: "Fútbol",
    category: "Libre",
    teamsCount: 12,
    status: "IN_PROGRESS",
    startDate: "02 Jul 2026",
  },
  {
    id: "t11",
    name: "Vóley Varones - Sub-21",
    eventId: 2,
    sport: "Vóley",
    category: "Sub-21",
    teamsCount: 10,
    status: "REGISTRATION",
    startDate: "15 Jul 2026",
  },
  {
    id: "t12",
    name: "Basket Mixto - Amateur",
    eventId: 3,
    sport: "Basket",
    category: "Amateur",
    teamsCount: 8,
    status: "FINISHED",
    startDate: "10 Feb 2026",
  },
  {
    id: "t13",
    name: "Futsal Varones - Sub-18",
    eventId: 1,
    sport: "Futsal",
    category: "Sub-18",
    teamsCount: 14,
    status: "IN_PROGRESS",
    startDate: "28 Jul 2026",
  },
  {
    id: "t14",
    name: "Fútbol Varones - Universitario",
    eventId: 2,
    sport: "Fútbol",
    category: "Universitario",
    teamsCount: 16,
    status: "REGISTRATION",
    startDate: "05 Aug 2026",
  },
  {
    id: "t15",
    name: "Vóley Mujeres - Sub-17",
    eventId: 3,
    sport: "Vóley",
    category: "Sub-17",
    teamsCount: 6,
    status: "FINISHED",
    startDate: "22 Jan 2026",
  },
  {
    id: "t16",
    name: "Basket Varones - Libre",
    eventId: 1,
    sport: "Basket",
    category: "Libre",
    teamsCount: 12,
    status: "IN_PROGRESS",
    startDate: "18 Aug 2026",
  },
  {
    id: "t17",
    name: "Futsal Mujeres - Amateur",
    eventId: 2,
    sport: "Futsal",
    category: "Amateur",
    teamsCount: 10,
    status: "REGISTRATION",
    startDate: "01 Sep 2026",
  },
  {
    id: "t18",
    name: "Fútbol Mixto - Open",
    eventId: 3,
    sport: "Fútbol",
    category: "Open",
    teamsCount: 14,
    status: "IN_PROGRESS",
    startDate: "12 Sep 2026",
  },
  {
    id: "t19",
    name: "Vóley Varones - Libre",
    eventId: 1,
    sport: "Vóley",
    category: "Libre",
    teamsCount: 8,
    status: "FINISHED",
    startDate: "30 Mar 2026",
  },
];

const TournamentManagementScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEventId, setSelectedEventId] = useState<string | number>(1);
  const [selectedSport, setSelectedSport] = useState("Todos");

  const eventOptions = [
    { id: 1, label: "Aniversario Tamburco" },
    { id: 2, label: "Copa Abancay 2026" },
    { id: 3, label: "Inter-Facultades UNAMBA" },
  ];

  const currentEventName = useMemo(() => {
    return eventOptions.find((e) => e.id === selectedEventId)?.label || "Seleccionar Evento";
  }, [selectedEventId]);

  const filteredTournaments = useMemo(() => {
    return MOCK_TOURNAMENTS.filter((t) => {
      const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesEvent = t.eventId === selectedEventId;
      const matchesSport = selectedSport === "Todos" || t.sport === selectedSport;
      
      return matchesSearch && matchesEvent && matchesSport;
    });
  }, [searchTerm, selectedEventId, selectedSport]);

  const handleExecuteSearch = () => {
    console.log("Ejecutando búsqueda de torneos...");
  };

  const resetAll = () => {
    setSearchTerm("");
    setSelectedEventId(1);
    setSelectedSport("Todos");
  };

  return (
    <div className="h-full flex flex-col gap-6 animate-fade-in">
      <div className="shrink-0 space-y-6">
        <PageHeader
          title="Gestión de Torneos"
          subtitle="Organiza las categorías y disciplinas de tus eventos deportivos."
          buttonLabel="Nuevo Torneo"
          buttonIcon={<Plus size={20} />}
          onButtonClick={() => console.log("Abrir Modal Nuevo Torneo")}
        />

        <FilterBarAlt
          currentEvent={currentEventName}
          currentSport={selectedSport}
          searchValue={searchTerm}
          eventOptions={eventOptions}
          onSearchChange={setSearchTerm}
          onEventChange={(id) => setSelectedEventId(id)}
          onSportChange={(sport) => setSelectedSport(String(sport))}
          onExecuteSearch={handleExecuteSearch}
          onClearFilters={resetAll}
        />
      </div>
      <div className="flex-1 min-h-0">
        <TournamentList 
          tournaments={filteredTournaments} 
          onSelectTournament={(id) => console.log("Seleccionado:", id)} 
        />
      </div>
      <div className="shrink-0 bg-white border border-light p-3 rounded-xl flex items-center gap-3">
        <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center text-accent">
          <Trophy size={16} />
        </div>
        <p className="text-[11px] text-dark/60 font-medium leading-tight">
          <span className="font-bold text-dark block text-xs">Gestión por Eventos:</span>
          Cada torneo debe estar vinculado a un evento principal para organizar los puntos generales.
        </p>
      </div>
    </div>
  );
};

export default TournamentManagementScreen;