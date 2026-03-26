import { useState, useMemo } from "react";
import { Plus, Trophy } from "lucide-react";
import type { Tournament } from "src/shared/models/tournament.model";
import PageHeader from "../components/PageHeader";
import TournamentList from "../components/TournamentList";
import FilterBarAlt from "../components/FilterBarAlt";

// ==========================================
// MOCKS: DATOS DE PRUEBA (Adaptados al Modelo)
// ==========================================
// Usamos "as unknown as Tournament[]" para que TypeScript no nos exija
// llenar los campos obligatorios del modelo (como format o pointsPerWin) en estos datos falsos.
const MOCK_TOURNAMENTS = [
  {
    id: "t1", name: "Fútbol Varones - Libre",
    event: { id: "1" }, sport: { name: "Fútbol" }, category: "Libre",
    teamsCount: 16, status: "REGISTRATION", startDate: "10 Jan 2026",
  },
  {
    id: "t2", name: "Vóley Mujeres - Sub-19",
    event: { id: "1" }, sport: { name: "Vóley" }, category: "Sub-19",
    teamsCount: 8, status: "IN_PROGRESS", startDate: "05 Feb 2026",
  },
  {
    id: "t3", name: "Basket Masculino - Open",
    event: { id: "2" }, sport: { name: "Basket" }, category: "Libre",
    teamsCount: 12, status: "FINISHED", startDate: "12 Jan 2026",
  },
  {
    id: "t4", name: "Fútbol Femenino - Sub-17",
    event: { id: "2" }, sport: { name: "Fútbol" }, category: "Sub-17",
    teamsCount: 10, status: "IN_PROGRESS", startDate: "20 Feb 2026",
  },
  {
    id: "t5", name: "Vóley Mixto - Amateur",
    event: { id: "3" }, sport: { name: "Vóley" }, category: "Amateur",
    teamsCount: 6, status: "REGISTRATION", startDate: "01 Mar 2026",
  },
  {
    id: "t6", name: "Futsal Varones - Libre",
    event: { id: "3" }, sport: { name: "Futsal" }, category: "Libre",
    teamsCount: 14, status: "IN_PROGRESS", startDate: "18 Mar 2026",
  },
  {
    id: "t7", name: "Basket Femenino - Sub-21",
    event: { id: "2" }, sport: { name: "Basket" }, category: "Sub-21",
    teamsCount: 8, status: "REGISTRATION", startDate: "25 Apr 2026",
  },
  {
    id: "t8", name: "Fútbol Varones - Master",
    event: { id: "3" }, sport: { name: "Fútbol" }, category: "35+",
    teamsCount: 10, status: "FINISHED", startDate: "15 Jan 2026",
  },
] as unknown as Tournament[]; 
// ^^^ EL TRUCO MÁGICO ESTÁ AQUÍ ^^^

const TournamentManagementScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEventId, setSelectedEventId] = useState<string | number>(1);
  const [selectedSport, setSelectedSport] = useState<string>("Todos");

  const eventOptions = [
    { id: 1, label: "Aniversario Tamburco" },
    { id: 2, label: "Copa Abancay 2026" },
    { id: 3, label: "Inter-Facultades UNAMBA" },
  ];

  const currentEventName = useMemo(() => {
    return eventOptions.find((e) => e.id === Number(selectedEventId))?.label || "Seleccionar Evento";
  }, [selectedEventId]);

  const filteredTournaments = useMemo(() => {
    return MOCK_TOURNAMENTS.filter((t: Tournament) => {
      const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesEvent = t.event?.id === String(selectedEventId);
      
      // Ahora leemos el nombre del deporte desde el objeto anidado (t.sport.name)
      const sportName = (t.sport as unknown as { name: string })?.name;
      const matchesSport = selectedSport === "Todos" || sportName === selectedSport;
      
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