// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Plus, LayoutGrid, Loader2 } from "lucide-react";
// import type { SportEvent } from "src/shared/models/event.model";
// import PageHeader from "../components/PageHeader";
// import EventList from "../components/EventList";
// import { ConfirmModal } from "../components/ConfirmModal"; 
// import { EditEventModal } from "../components/EditEventModal"; 
// import { EventService } from "src/core/services/event.service";

// const EventManagementScreen = () => {
//   const navigate = useNavigate();
  
//   // 2. Estados para la data real
//   const [events, setEvents] = useState<SportEvent[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // Estados de los modales (intactos)
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [eventToDelete, setEventToDelete] = useState<string | null>(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [eventToEdit, setEventToEdit] = useState<SportEvent | null>(null);

//   // 3. Obtenemos la organización activa desde Zustand
//   const activeOrg = useState(true);

//   // 4. Efecto para cargar eventos reales
//   useEffect(() => {
//     const fetchEvents = async () => {
//       // Si no hay organización seleccionada en el sidebar, limpiamos la lista
//       if (!activeOrg?.id) {
//         setEvents([]);
//         setIsLoading(false);
//         return;
//       }

//       try {
//         setIsLoading(true);
//         // Le pasamos el ID de la organización activa a tu servicio modificado
//         const response = await EventService.getAll(activeOrg.id); 
        
//         // Entramos a los niveles de 'data' que vimos en Postman
//         const rawEvents = response.data?.data || response.data;
        
//         if (Array.isArray(rawEvents)) {
//           // Formateamos los datos para que coincidan con SportEvent y EventCard
//           const formattedEvents = rawEvents.map(e => ({
//             id: e.id,
//             name: e.name,
//             description: e.description,
//             // Formateamos la fecha ISO a algo legible, ej: "27 abr"
//             startDate: new Date(e.start_date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }),
//             endDate: new Date(e.end_date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }),
//             status: e.status || "PLANNED",
//             organizationId: e.organizationId
//           }));
          
//           setEvents(formattedEvents);
//         }
//       } catch (error) {
//         console.error("Error al cargar eventos:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchEvents();
//   }, [activeOrg]); // <--- Si cambias de org en el sidebar, este useEffect se vuelve a ejecutar automáticamente

//   // Ajuste: Ahora buscamos en el estado 'events' real en vez de EVENTS_MOCK
//   const handleEditClick = (id: string) => {
//     const eventData = events.find(e => e.id === id);
//     if (eventData) {
//       setEventToEdit(eventData);
//       setIsEditModalOpen(true);
//     }
//   };

//   const handleSaveEdit = (updatedData: unknown) => {
//     console.log("Guardando cambios del evento:", eventToEdit?.id, updatedData);
//     setIsEditModalOpen(false);
//     setEventToEdit(null);
//   };

//   const handleDeleteClick = (id: string) => {
//     setEventToDelete(id);
//     setIsDeleteModalOpen(true);
//   };

//   const confirmDelete = () => {
//     console.log("Eliminando evento ID:", eventToDelete);
//     setIsDeleteModalOpen(false);
//     setEventToDelete(null);
//   };

//   const handleEventClick = (id: string) => {
//     navigate(`/admin/evento/${id}`); 
//   };

//   return (
//     <div className="h-full flex flex-col gap-6 animate-fade-in relative">
      
//       <div className="shrink-0">
//         <PageHeader
//           title="Gestión de eventos"
//           subtitle={
//             activeOrg 
//               ? `Eventos organizados por: ${activeOrg.name}` 
//               : "Selecciona una organización para ver sus eventos."
//           }
//           buttonLabel="Nuevo evento"
//           buttonIcon={<Plus size={20} />}
//           onButtonClick={() => navigate('/admin/evento/nuevo')} 
//         />
//       </div>

//       <div className="flex-1 min-h-0 relative">
//         {/* Renderizado condicional según el estado */}
//         {isLoading ? (
//           <div className="absolute inset-0 flex flex-col items-center justify-center text-dark/40 bg-light/10 rounded-2xl">
//             <Loader2 size={32} className="animate-spin mb-4 text-accent" />
//             <p className="font-bold">Cargando eventos...</p>
//           </div>
//         ) : !activeOrg ? (
//           <div className="absolute inset-0 flex flex-col items-center justify-center text-dark/40 bg-light/10 rounded-2xl border-2 border-dashed border-light">
//             <p className="font-bold">Ninguna organización seleccionada</p>
//             <p className="text-sm">Usa el menú lateral para elegir una organización.</p>
//           </div>
//         ) : events.length === 0 ? (
//           <div className="absolute inset-0 flex flex-col items-center justify-center text-dark/40 bg-light/10 rounded-2xl border-2 border-dashed border-light">
//             <p className="font-bold text-lg mb-2">No hay eventos registrados</p>
//             <p className="text-sm mb-6">Comienza creando el primer evento para esta organización.</p>
//             <button 
//               onClick={() => navigate('/admin/evento/nuevo')}
//               className="bg-dark text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-accent transition-colors cursor-pointer"
//             >
//               <Plus size={18} /> Crear Evento
//             </button>
//           </div>
//         ) : (
//           <EventList
//             events={events} // <-- Pasamos la data real al componente
//             onEdit={handleEditClick} 
//             onDelete={handleDeleteClick}
//             onSelectEvent={handleEventClick}
//           />
//         )}
//       </div>

//       <div className="shrink-0 bg-white border border-light p-3 rounded-xl flex items-center gap-3">
//         <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
//           <LayoutGrid size={16} />
//         </div>
//         <p className="text-[11px] text-dark/60 font-medium leading-tight">
//           <span className="font-bold text-dark block text-xs">Arquitectura OLIMPYX:</span>
//           Los eventos son los contenedores de torneos. Crea un evento para empezar a organizar disciplinas.
//         </p>
//       </div>

//       <ConfirmModal
//         isOpen={isDeleteModalOpen}
//         title="¿Eliminar evento?"
//         message="Esta acción no se puede deshacer. Todos los torneos, partidos y equipos asociados a este evento también podrían verse afectados."
//         onConfirm={confirmDelete}
//         onCancel={() => {
//           setIsDeleteModalOpen(false);
//           setEventToDelete(null);
//         }}
//       />

//       <EditEventModal
//         isOpen={isEditModalOpen}
//         event={eventToEdit}
//         onSave={handleSaveEdit}
//         onClose={() => {
//           setIsEditModalOpen(false);
//           setEventToEdit(null);
//         }}
//       />
//     </div>
//   );
// };

// export default EventManagementScreen;

import React from 'react'

function EventManagementScreen() {
  return (
    <div>EventManagementScreen</div>
  )
}

export default EventManagementScreen