import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { LayoutGrid, Clock } from "lucide-react";
import { FilterBar } from "../components/FilterBar";
import { MatchList } from "../components/MatchList";
import { useAppSelector } from "@store/hooks";
import { useEvent } from "@features/events/hooks/useEvent";
import { useTournament } from "@features/tournament/hooks/useTournament";
import { useMatch } from "../hooks/useMatch";
import { LoadingState } from "@atoms/LoadingState";

const MatchSchedulerPage = () => {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId") || "";
  const { activeOrg } = useAppSelector((state) => state.auth);
  
  const { events, fetchEvents, isLoading: isLoadingEvents } = useEvent();
  const { tournaments, fetchTournamentsByEvent, isLoading: isLoadingTournaments } = useTournament();
  const { matches, fetchMatches, isLoading: isLoadingMatches } = useMatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [selectedTournamentId, setSelectedTournamentId] = useState<string>("");
  
  const [prevOrgId, setPrevOrgId] = useState<string | undefined>(activeOrg?.id);

  if (activeOrg?.id !== prevOrgId) {
    setPrevOrgId(activeOrg?.id);
    setSelectedEventId("");
    setSelectedTournamentId("");
  }

  useEffect(() => {
    if (activeOrg?.id) {
      fetchEvents(activeOrg.id);
    }
  }, [activeOrg?.id, fetchEvents]);

  const activeEventId = useMemo(() => {
    if (events.length === 0) return "";
    return selectedEventId || eventId || events[0]?.id || "";
  }, [events, selectedEventId, eventId]);

  useEffect(() => {
    if (activeEventId) {
      fetchTournamentsByEvent(activeEventId);
    }
  }, [activeEventId, fetchTournamentsByEvent]);

  const activeTournamentId = useMemo(() => {
    if (tournaments.length === 0 || !activeEventId) return "";
    const isCurrentValid = tournaments.some((t) => t.id === selectedTournamentId);
    return isCurrentValid ? selectedTournamentId : tournaments[0]?.id || "";
  }, [tournaments, selectedTournamentId, activeEventId]);

  useEffect(() => {
    if (activeTournamentId) {
      fetchMatches(activeTournamentId);
    }
  }, [activeTournamentId, fetchMatches]);

  const eventOptions = useMemo(() => {
    return events.map((e) => ({ id: e.id, name: e.name }));
  }, [events]);

  const tournamentOptions = useMemo(() => {
    return tournaments.map((t) => ({ id: t.id, name: t.name }));
  }, [tournaments]);

  const filteredMatches = useMemo(() => {
    if (!activeTournamentId) return [];
    return matches.filter((match) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        match.team1.name.toLowerCase().includes(searchLower) ||
        match.team2.name.toLowerCase().includes(searchLower)
      );
    });
  }, [searchTerm, matches, activeTournamentId]);

  const handleEventChange = (evtId: string) => {
    setSelectedEventId(evtId);
    setSelectedTournamentId(""); 
  };

  const resetAll = () => {
    setSearchTerm("");
    setSelectedEventId("");
    setSelectedTournamentId("");
  };

  if (isLoadingEvents && events.length === 0) {
    return <LoadingState text="Sincronizando eventos institucionales..." />;
  }

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
      </header>

      <FilterBar
        selectedEventId={activeEventId}
        selectedTournamentId={activeTournamentId}
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        onEventChange={handleEventChange}
        onTournamentChange={setSelectedTournamentId}
        onClearFilters={resetAll}
        eventOptions={eventOptions}
        tournamentOptions={tournamentOptions}
      />

      <main>
        {isLoadingTournaments || isLoadingMatches ? (
          <LoadingState text="Actualizando cronograma de encuentros..." variant="secondary" />
        ) : (
          <MatchList matches={filteredMatches} />
        )}
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