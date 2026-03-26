import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Trophy } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { AdminTournamentCard } from "../components/AdminTournamentCard";
import { ConfirmModal } from "../components/ConfirmModal"; 

const EVENTS_MOCK = [
  { id: "evt-1", name: "Intercarreras UNAMBA", description: "Olimpiadas generales de la Universidad." },
  { id: "evt-2", name: "Intercódigos Ing Sistemas 26-1", description: "Campeonato interno." }
];

const TOURNAMENTS_MOCK = [
  { id: "t1", eventId: "evt-1", name: "Vóley Femenino", sport: "Vóley", format: "Fase de Grupos", status: "PLANNED" },
  { id: "t2", eventId: "evt-1", name: "Futsal Varones", sport: "Futsal", format: "Eliminación Directa", status: "ACTIVE" },
];

const AdminEventDetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const currentEvent = EVENTS_MOCK.find(e => e.id === id);
  const currentTournaments = TOURNAMENTS_MOCK.filter(t => t.eventId === id);
  const [isCreateTournamentModalOpen, setIsCreateTournamentModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [tournamentToDelete, setTournamentToDelete] = useState<string | null>(null);
  const handleDeleteClick = (tournamentId: string) => {
    setTournamentToDelete(tournamentId); 
    setIsDeleteModalOpen(true);          
  };

  const confirmDelete = () => {
    console.log("Eliminando Torneo ID:", tournamentToDelete);
    setIsDeleteModalOpen(false);
    setTournamentToDelete(null);
  };

  if (!currentEvent) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <h2 className="text-2xl font-black text-dark">Evento no encontrado</h2>
        <button onClick={() => navigate('/admin/eventos')} className="text-accent hover:underline font-bold">
          Volver a la lista
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-6 animate-fade-in relative">
      <div className="shrink-0">
        <button 
          onClick={() => navigate('/admin/eventos')} 
          className="flex items-center gap-2 text-dark/60 hover:text-accent transition-colors font-bold text-sm"
        >
          <ArrowLeft size={16} /> Volver a Eventos
        </button>
      </div>
      
      <div className="shrink-0">
        <PageHeader
          title={currentEvent.name}
          subtitle={`Gestión del evento: ${currentEvent.description}`}
          buttonLabel="Nuevo Torneo"
          buttonIcon={<Plus size={20} />}
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
                sport={torneo.sport}
                format={torneo.format}
                status={torneo.status}
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
      {isCreateTournamentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark/40 backdrop-blur-sm">
           <div className="bg-white p-8 rounded-3xl text-center">
              <h2 className="text-2xl font-black mb-4">Formulario en construcción 🚧</h2>
              <button 
                onClick={() => setIsCreateTournamentModalOpen(false)}
                className="bg-accent text-white px-6 py-2 rounded-xl font-bold"
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