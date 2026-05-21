import { useNavigate } from "react-router-dom";
import { type PublicEvent } from "../models/public-api.model";
import EventCard from "@molecules/EventCard";

interface EventsSectionProps {
  events: PublicEvent[];
}

export const EventsSection = ({ events }: EventsSectionProps) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
      {events.map((evento) => (
        <EventCard 
          key={evento.id}
          id={evento.id}
          name={evento.name}
          description={evento.description}
          status={evento.status}
          startDate={new Date(evento.start_date).toLocaleDateString()}
          endDate={new Date(evento.end_date).toLocaleDateString()}
          tournamentCount={evento.tournaments?.length || 0}
          onClick={(eventId) => navigate(`/evento/${eventId}`)}
        />
      ))}
    </div>
  );
};

export default EventsSection;