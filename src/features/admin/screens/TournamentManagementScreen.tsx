import { useState, useEffect, useMemo } from "react";
import { Plus, Trophy, Loader2 } from "lucide-react";
import type { Tournament } from "src/shared/models/tournament.model";
import PageHeader from "../components/PageHeader";
import TournamentList from "../components/TournamentList";
import FilterBarAlt from "../components/FilterBarAlt";

import { useAuthStore } from "src/core/store/slices/auth.slice";
import { EventService } from "src/core/services/event.service";
import { TournamentService } from "src/core/services/tournament.service";
import { useNavigate } from "react-router-dom";

const TournamentManagementScreen = () => {
  const navigate = useNavigate();
  const activeOrg = useAuthStore(state => state.activeOrg);

  // Estados para Filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEventId, setSelectedEventId] = useState<string | number>("");
  const [selectedSport, setSelectedSport] = useState<string>("Todos");

  // Estados de Datos Reales
  const [eventsList, setEventsList] = useState<{ id: string | number; label: string }[]>([]);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // ==========================================
  // PASO 1: CARGAR EVENTOS PARA EL FILTRO
  // ==========================================
  useEffect(() => {
    const fetchEventsForFilter = async () => {
      if (!activeOrg?.id) {
        setEventsList([]);
        return;
      }

      try {
        const response = await EventService.getAll(activeOrg.id);
        const rawEvents = response.data?.data || response.data;
        
        if (Array.isArray(rawEvents)) {
          // Mapeamos los eventos para que el FilterBarAlt los entienda
          const mappedEvents = rawEvents.map(e => ({ id: e.id, label: e.name }));
          setEventsList(mappedEvents);

          // Autoseleccionar el primer evento si hay datos y no hemos elegido ninguno
          if (mappedEvents.length > 0 && !selectedEventId) {
            setSelectedEventId(mappedEvents[0].id);
          }
        }
      } catch (error) {
        console.error("Error al cargar eventos para el filtro:", error);
      }
    };

    fetchEventsForFilter();
  }, [activeOrg]); // Si cambiamos de organización, se recargan los eventos

  // ==========================================
  // PASO 2: CARGAR TORNEOS DEL EVENTO ELEGIDO
  // ==========================================
  useEffect(() => {
    const fetchTournaments = async () => {
      if (!selectedEventId) {
        setTournaments([]);
        return;
      }

      try {
        setIsLoading(true);
        const response = await TournamentService.getByEventId(String(selectedEventId));
        
        let tArray: Tournament[] = [];

        // Escudo antimuñeca rusa (igual que en los equipos)
        if (Array.isArray(response.data)) {
          tArray = response.data;
        } else if (Array.isArray(response.data?.data)) {
          tArray = response.data.data;
        } else if (Array.isArray(response.data?.data?.data)) {
          tArray = response.data.data.data;
        } else if (Array.isArray(response.data?.data?.items)) {
          tArray = response.data.data.items;
        }

        setTournaments(tArray);
      } catch (error) {
        console.error("Error al cargar torneos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTournaments();
  }, [selectedEventId]); // Se ejecuta cada vez que el usuario cambia el filtro de Evento

  // ==========================================
  // LÓGICA DE VISTA Y FILTRADO LOCAL
  // ==========================================

  // Nombre del evento actual para mostrarlo en el filtro
  const currentEventName = useMemo(() => {
    return eventsList.find((e) => String(e.id) === String(selectedEventId))?.label || "Seleccionar Evento";
  }, [selectedEventId, eventsList]);

  // Filtramos la lista de torneos usando el buscador de texto y el deporte
 // Filtramos la lista de torneos usando el buscador de texto y el deporte
  const filteredTournaments = useMemo(() => {
    return tournaments.filter((t: Tournament) => {
      // 1. Filtro por búsqueda de nombre
      const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      // 2. Filtro por deporte (TypeScript Seguro)
      let sportName = "";
      const rawSport = t.sport as unknown; // Usamos unknown en lugar de any
      
      if (rawSport) {
        if (typeof rawSport === 'string') {
          sportName = rawSport;
        } else if (typeof rawSport === 'object' && 'name' in rawSport) {
          // Le decimos a TS que confíe en que es un objeto con propiedades
          sportName = String((rawSport as Record<string, unknown>).name || "");
        }
      }

      const matchesSport = selectedSport === "Todos" || sportName === selectedSport;
      
      return matchesSearch && matchesSport;
    });
  }, [tournaments, searchTerm, selectedSport]);

  const handleExecuteSearch = () => {
    console.log("Ejecutando búsqueda de torneos...");
  };

  const resetAll = () => {
    setSearchTerm("");
    setSelectedSport("Todos");
    if (eventsList.length > 0) {
      setSelectedEventId(eventsList[0].id); // Reset al primer evento
    }
  };

  return (
    <div className="h-full flex flex-col gap-6 animate-fade-in relative">
      <div className="shrink-0 space-y-6">
        <PageHeader
          title="Gestión de Torneos"
          subtitle={
            activeOrg 
              ? `Organiza las categorías y disciplinas para: ${activeOrg.name}` 
              : "Selecciona una organización en el menú lateral."
          }
          buttonLabel="Nuevo Torneo"
          buttonIcon={<Plus size={20} />}
          onButtonClick={() => {
            // Si hay un evento seleccionado, navegamos al formulario con ese ID en la URL
            if (selectedEventId) {
              navigate(`/admin/evento/${selectedEventId}/torneo/nuevo`);
            } else {
              console.log("Abre modal o alerta: Selecciona un evento primero");
            }
          }}
        />

        {/* Solo mostramos la barra de filtros si la organización tiene eventos creados */}
        {eventsList.length > 0 && (
          <FilterBarAlt
            currentEvent={currentEventName}
            currentSport={selectedSport}
            searchValue={searchTerm}
            eventOptions={eventsList} // <-- Pasamos la lista real de eventos
            onSearchChange={setSearchTerm}
            onEventChange={(id) => setSelectedEventId(id)}
            onSportChange={(sport) => setSelectedSport(String(sport))}
            onExecuteSearch={handleExecuteSearch}
            onClearFilters={resetAll}
          />
        )}
      </div>
      
      <div className="flex-1 min-h-0 relative">
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-dark/40 bg-light/10 rounded-2xl">
            <Loader2 size={32} className="animate-spin mb-4 text-accent" />
            <p className="font-bold">Cargando torneos...</p>
          </div>
        ) : !activeOrg ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-dark/40 bg-light/10 rounded-2xl border-2 border-dashed border-light">
            <p className="font-bold">Ninguna organización seleccionada</p>
            <p className="text-sm">Usa el menú lateral para elegir una organización.</p>
          </div>
        ) : eventsList.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-dark/40 bg-light/10 rounded-2xl border-2 border-dashed border-light">
            <p className="font-bold text-lg mb-2">No tienes eventos creados</p>
            <p className="text-sm mb-6">Para crear un torneo, primero debes crear un evento principal.</p>
            <button 
              onClick={() => navigate('/admin/evento/nuevo')}
              className="bg-dark text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-accent transition-colors"
            >
              <Plus size={18} /> Crear mi primer Evento
            </button>
          </div>
        ) : (
          <TournamentList 
            tournaments={filteredTournaments} 
            onSelectTournament={(id) => navigate(`/admin/torneo/${id}`)} 
          />
        )}
      </div>
      
      <div className="shrink-0 bg-white border border-light p-3 rounded-xl flex items-center gap-3">
        <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center text-accent">
          <Trophy size={16} />
        </div>
        <p className="text-[11px] text-dark/60 font-medium leading-tight">
          <span className="font-bold text-dark block text-xs">Gestión por Eventos:</span>
          Cada torneo está vinculado a un evento. Usa el filtro de arriba para cambiar entre eventos.
        </p>
      </div>
    </div>
  );
};

export default TournamentManagementScreen;