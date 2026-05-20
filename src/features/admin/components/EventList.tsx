import type { SportEvent } from "src/shared/models/event.model";
import { AdminEventCard } from "./AdminEventCard"; 

interface EventListProps {
  events: SportEvent[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSelectEvent: (id: string) => void;
}

const EventList = ({ events, onEdit, onDelete, onSelectEvent}: EventListProps) => {
  return (
    <div className="h-full overflow-y-auto pr-2 custom-scrollbar space-y-4 pb-6">
      {events.map((event) => (
        <AdminEventCard 
          key={event.id} 
          {...event} 
          tournamentCount={event.tournamentCount || 0}
          description={event.description || "Sin descripción disponible"}
          startDate={event.startDate || "Por definir"}
          endDate={event.endDate || "Por definir"}
          onEdit={onEdit}
          onDelete={onDelete}
          onClick={onSelectEvent}
        />
      ))}
    </div>
  );
};

export default EventList;