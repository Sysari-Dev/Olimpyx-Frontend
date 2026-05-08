import EventCard from "src/shared/components/molecules/EventCard"; 
import type { SportEvent } from "src/shared/models/event.model";

const EVENTS_MOCK: SportEvent[] = [
  { 
    id: "evt-1", 
    name: "Intercarreras UNAMBA", 
    description: "Las olimpiadas generales de la Universidad Nacional Micaela Bastidas. Todas las facultades compiten por la copa general.", 
    status: "ACTIVE",
    startDate: "15 Mar", 
    endDate: "30 Mar",
    tournamentCount: 8
  },
  { 
    id: "evt-2", 
    name: "Intercódigos Ing Sistemas 26-1", 
    description: "Campeonato interno de confraternidad para los estudiantes de la carrera de Ingeniería de Sistemas.", 
    status: "PLANNED", 
    startDate: "10 Abr", 
    endDate: "15 Abr",
    tournamentCount: 3
  },
  { 
    id: "evt-3", 
    name: "Intercarreras UTEA", 
    description: "Juegos deportivos interfacultades de la Universidad Tecnológica de los Andes sede central.", 
    status: "FINISHED", 
    startDate: "01 Feb", 
    endDate: "28 Feb",
    tournamentCount: 6
  }
];

export const EventsSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 animate-fade-in">
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-black text-dark tracking-tighter">
          Explora los <span className="text-accent">Eventos</span>
        </h1>
        <p className="text-dark/50 mt-2 font-medium max-w-2xl">
          Descubre todas las competiciones institucionales, sigue a tus facultades favoritas y revisa los torneos disponibles.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {EVENTS_MOCK.map((evento) => (
          <EventCard 
            key={evento.id}
            {...evento}
            tournamentCount={evento.tournamentCount || 0}
            description={evento.description || ""}
            startDate={evento.startDate || ""}
            endDate={evento.endDate || ""}
          />
        ))}
      </div>
    </section>
  );
};