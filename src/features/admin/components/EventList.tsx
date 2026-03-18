import type { SportEvent } from "src/shared/models/event.model";
import EventCard from "@molecules/EventCard";

interface EventListProps {
  events: SportEvent[];
  onSelectEvent: (id: string) => void;
}

const EventList = ({ events, onSelectEvent }: EventListProps) => {
  return (
    <div className="h-full overflow-y-auto pr-2 custom-scrollbar space-y-4 pb-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} onClick={onSelectEvent} />
      ))}
    </div>
  );
};

export default EventList;