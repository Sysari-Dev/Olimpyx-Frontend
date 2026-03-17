import { Plus, LayoutGrid } from "lucide-react";
import type { SportEvent } from "src/shared/models/event.model";
import PageHeader from "../components/PageHeader";
import EventList from "../components/EventList";

const MOCK_EVENTS: SportEvent[] = [
  {
    id: "e1",
    title: "Aniversario Tamburco 2026",
    location: "Estadio de Tamburco",
    dateRange: "15 Mar - 25 Mar",
    status: "ACTIVE",
    tournamentCount: 4
  },
  {
    id: "e2",
    title: "Copa Verano Abancay",
    location: "Complejo Olivo",
    dateRange: "01 Feb - 28 Feb",
    status: "COMPLETED",
    tournamentCount: 2
  },
  {
    id: "e3",
    title: "Inter-Facultades UNAMBA",
    location: "Campus Universitario",
    dateRange: "10 May - 20 May",
    status: "PLANNING",
    tournamentCount: 8
  }
];

const EventManagementScreen = () => {
  return (
    <div className="h-full flex flex-col gap-6 animate-fade-in">
      <div className="shrink-0">
        <PageHeader
          title="Gestión de eventos"
          subtitle="Panel principal para la creación y control de macro-eventos deportivos."
          buttonLabel="Nuevo evento"
          buttonIcon={<Plus size={20} />}
          onButtonClick={() => console.log("Nuevo Evento")}
        />
      </div>
      <div className="flex-1 min-h-0">
        <EventList
          events={MOCK_EVENTS} 
          onSelectEvent={(id) => console.log("Evento:", id)} 
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
    </div>
  );
};

export default EventManagementScreen;