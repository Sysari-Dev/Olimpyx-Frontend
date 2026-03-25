import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, LayoutGrid } from "lucide-react";
import type { SportEvent } from "src/shared/models/event.model";
import PageHeader from "../components/PageHeader";
import EventList from "../components/EventList";
import { ConfirmModal } from "../components/ConfirmModal"; 
import { EditEventModal } from "../components/EditEventModal"; 

const EVENTS_MOCK: SportEvent[] = [
  { id: "evt-1", name: "Intercarreras UNAMBA", description: "Olimpiadas generales de la Universidad.", startDate: "15 Mar", endDate: "30 Mar", status: "ACTIVE" },
  { id: "evt-2", name: "Intercódigos Ing Sistemas 26-1", description: "Campeonato interno de confraternidad.", startDate: "10 Abr", endDate: "15 Abr", status: "PLANNED" }
];

const EventManagementScreen = () => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<SportEvent | null>(null);
  const handleEditClick = (id: string) => {
    const eventData = EVENTS_MOCK.find(e => e.id === id);
    if (eventData) {
      setEventToEdit(eventData);
      setIsEditModalOpen(true);
    }
  };

  const handleSaveEdit = (updatedData: unknown) => {
    console.log("Guardando cambios del evento:", eventToEdit?.id, updatedData);
    setIsEditModalOpen(false);
    setEventToEdit(null);
  };
  const handleDeleteClick = (id: string) => {
    setEventToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    console.log("Eliminando evento ID:", eventToDelete);
    setIsDeleteModalOpen(false);
    setEventToDelete(null);
  };
  const handleEventClick = (id: string) => {
    navigate(`/admin/evento/${id}`); 
  };

  return (
    <div className="h-full flex flex-col gap-6 animate-fade-in relative">
      
      <div className="shrink-0">
        <PageHeader
          title="Gestión de eventos"
          subtitle="Panel principal para la creación y control de macro-eventos deportivos."
          buttonLabel="Nuevo evento"
          buttonIcon={<Plus size={20} />}
          onButtonClick={() => navigate('/admin/evento/nuevo')} 
        />
      </div>

      <div className="flex-1 min-h-0">
        <EventList
          events={EVENTS_MOCK} 
          onEdit={handleEditClick} 
          onDelete={handleDeleteClick}
          onSelectEvent={handleEventClick}
        />
      </div>

      <div className="shrink-0 bg-white border border-light p-3 rounded-xl flex items-center gap-3">
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
          <LayoutGrid size={16} />
        </div>
        <p className="text-[11px] text-dark/60 font-medium leading-tight">
          <span className="font-bold text-dark block text-xs">Arquitectura OLIMPYX:</span>
          Los eventos son los contenedores de torneos. Crea un evento para empezar a organizar disciplinas.
        </p>
      </div>
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="¿Eliminar evento?"
        message="Esta acción no se puede deshacer. Todos los torneos, partidos y equipos asociados a este evento también podrían verse afectados."
        onConfirm={confirmDelete}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setEventToDelete(null);
        }}
      />

      <EditEventModal
        isOpen={isEditModalOpen}
        event={eventToEdit}
        onSave={handleSaveEdit}
        onClose={() => {
          setIsEditModalOpen(false);
          setEventToEdit(null);
        }}
      />
    </div>
  );
};

export default EventManagementScreen;