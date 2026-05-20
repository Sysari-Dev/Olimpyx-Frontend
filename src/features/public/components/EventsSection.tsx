import EventCard from "src/shared/components/molecules/EventCard"; 
import { type PublicEvent } from "../models/public-api.model";

interface EventsSectionProps {
  events: PublicEvent[];
}

export const EventsSection = ({ events }: EventsSectionProps) => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 animate-fade-in">
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-black text-dark tracking-tighter">
          Explora los <span className="text-accent">Eventos</span>
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((evento) => (
          <EventCard 
            key={evento.id}
            id={evento.id}
            name={evento.name}
            description={evento.description}
            status={evento.status}
            // Formateamos las fechas reales (ISO string a algo legible)
            startDate={new Date(evento.start_date).toLocaleDateString()}
            endDate={new Date(evento.end_date).toLocaleDateString()}
            tournamentCount={evento.tournaments?.length || 0}
          />
        ))}
      </div>
    </section>
  );
};