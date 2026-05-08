import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Trophy, Loader2 } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { AdminTournamentCard } from "../components/AdminTournamentCard";
import { ConfirmModal } from "../components/ConfirmModal"; 
import { EventService } from "src/core/services/event.service";
import { TournamentService } from "src/core/services/tournament.service"; // <-- Nuevo servicio

// Interfaces para tipar la respuesta del backend
interface EventDetail {
  id: string;
  name: string;
  description: string;
}

interface Tournament {
  id: string;
  eventId: string;
  name: string;
  sport: string; // Asumo que tu backend manda el nombre del deporte o lo adaptaremos luego
  format: string;
  status: string;
}

const AdminEventDetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Estados para los datos reales
  const [currentEvent, setCurrentEvent] = useState<EventDetail | null>(null);
  const [currentTournaments, setCurrentTournaments] = useState<Tournament[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Estados de modales
  const [isCreateTournamentModalOpen, setIsCreateTournamentModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [tournamentToDelete, setTournamentToDelete] = useState<string | null>(null);

  // Efecto para cargar los datos del evento y sus torneos
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        
        // Hacemos las dos peticiones en paralelo para que cargue más rápido
        const [eventRes, tournamentsRes] = await Promise.all([
          EventService.getById(id),
          TournamentService.getByEventId(id)
        ]);

        // 1. Extraemos el evento
        const eventData = eventRes.data?.data || eventRes.data;
        setCurrentEvent(eventData);

        // 2. Extraemos los torneos (con el escudo multicapa)
        let tournamentsArray: Tournament[] = [];
        const tData = tournamentsRes.data;
        
        if (Array.isArray(tData)) {
          tournamentsArray = tData;
        } else if (Array.isArray(tData?.data)) {
          tournamentsArray = tData.data;
        } else if (Array.isArray(tData?.data?.data)) {
          tournamentsArray = tData.data.data;
        } else if (Array.isArray(tData?.data?.items)) {
          tournamentsArray = tData.data.items;
        }
        
        setCurrentTournaments(tournamentsArray);

      } catch (error) {
        console.error("Error al cargar detalles del evento:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDeleteClick = (tournamentId: string) => {
    setTournamentToDelete(tournamentId); 
    setIsDeleteModalOpen(true);          
  };

  const confirmDelete = () => {
    console.log("Eliminando Torneo ID:", tournamentToDelete);
    // Aquí luego llamaremos a TournamentService.delete(tournamentToDelete)
    setIsDeleteModalOpen(false);
    setTournamentToDelete(null);
  };

  // VISTA DE CARGA
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <Loader2 size={40} className="animate-spin text-accent" />
        <p className="text-dark/40 font-bold">Cargando información del evento...</p>
      </div>
    );
  }

  // VISTA DE ERROR / NO ENCONTRADO
  if (!currentEvent) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <h2 className="text-2xl font-black text-dark">Evento no encontrado</h2>
        <button onClick={() => navigate('/admin/eventos')} className="text-accent hover:underline font-bold">
          Volver a la lista de eventos
        </button>
      </div>
    );
  }

  // VISTA PRINCIPAL
  return (
    <div className="h-full flex flex-col gap-6 animate-fade-in relative">
      <div className="shrink-0">
        <button 
          onClick={() => navigate('/admin/eventos')} 
          className="flex items-center gap-2 text-dark/60 hover:text-accent transition-colors font-bold text-sm cursor-pointer"
        >
          <ArrowLeft size={16} /> Volver a Eventos
        </button>
      </div>
      
      <div className="shrink-0">
        <PageHeader
          title={currentEvent.name}
          subtitle={currentEvent.description || "Gestión de torneos para este evento"}
          buttonLabel="Nuevo Torneo"
          buttonIcon={<Plus size={20} />}
          // Pasamos el ID del evento en la URL para que el formulario sepa a quién pertenece
          onButtonClick={() => navigate(`/admin/evento/${id}/torneo/nuevo`)}
        />
      </div>
      
      <div className="flex-1 min-h-0 overflow-y-auto pr-2 custom-scrollbar">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-black text-dark tracking-tight flex items-center gap-2">
            <Trophy size={20} className="text-accent" />
            Torneos Registrados
            <span className="bg-light/50 text-dark/40 px-2 py-0.5 rounded-lg text-xs font-bold ml-2">
              {currentTournaments.length}
            </span>
          </h3>
        </div>
        
        {currentTournaments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentTournaments.map((torneo) => (
              <AdminTournamentCard 
                key={torneo.id}
                id={torneo.id}
                name={torneo.name}
                sport={torneo.sport || "Disciplina por definir"} // Por si el backend no manda deporte aún
                format={torneo.format || "Formato por definir"}
                status={torneo.status || "PLANNED"}
                onClick={(tId) => navigate(`/admin/torneo/${tId}`)} 
                onEdit={(tId) => console.log("Editar torneo:", tId)} 
                onDelete={handleDeleteClick} 
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-dashed border-light/80 rounded-3xl p-12 text-center flex flex-col items-center justify-center">
            <Trophy size={48} className="text-light mb-4" />
            <p className="text-dark/60 font-bold mb-2">Aún no hay torneos en este evento.</p>
            <p className="text-sm text-dark/40">Haz clic en "Nuevo Torneo" arriba a la derecha para empezar.</p>
          </div>
        )}
      </div>

      {/* Modal temporal por si decides hacer la creación aquí en vez de en otra pantalla */}
      {isCreateTournamentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark/40 backdrop-blur-sm">
           <div className="bg-white p-8 rounded-3xl text-center">
              <h2 className="text-2xl font-black mb-4">Formulario en construcción 🚧</h2>
              <button 
                onClick={() => setIsCreateTournamentModalOpen(false)}
                className="bg-accent text-white px-6 py-2 rounded-xl font-bold cursor-pointer"
              >
                Cerrar por ahora
              </button>
           </div>
        </div>
      )}

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="¿Eliminar Torneo?"
        message="Esta acción es irreversible. Se eliminarán los equipos, partidos y resultados asociados a este torneo."
        onConfirm={confirmDelete}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setTournamentToDelete(null);
        }}
      />
    </div>
  );
};

export default AdminEventDetailScreen;