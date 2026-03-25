import type { SportEvent } from "src/shared/models/event.model";
import EventCard from "src/shared/components/molecules/EventCard";

interface EventListProps {
  events: SportEvent[];
}

const EventList = ({ events }: EventListProps) => {
  return (
    <div className="h-full overflow-y-auto pr-2 custom-scrollbar space-y-4 pb-6">
      {events.map((event) => (
        <EventCard 
          key={event.id} 
          {...event} 
          // 1. Blindamos el campo virtual
          tournamentCount={event.tournamentCount || 0}
          // 2. Blindamos los campos opcionales de la BD para que la tarjeta no explote
          description={event.description || "Sin descripción disponible"}
          startDate={event.startDate || "Por definir"}
          endDate={event.endDate || "Por definir"}
        />
      ))}
    </div>
  );
};

export default EventList;