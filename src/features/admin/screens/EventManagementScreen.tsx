import { Plus, LayoutGrid } from "lucide-react";
import type { SportEvent } from "src/shared/models/event.model";
import PageHeader from "../components/PageHeader";
import EventList from "../components/EventList";

const EVENTS_MOCK: SportEvent[] = [
  { id: "evt-1", name: "Intercarreras UNAMBA", description: "Olimpiadas generales de la Universidad.", startDate: "15 Mar", endDate: "30 Mar", status: "ACTIVE" },
  { id: "evt-2", name: "Intercódigos Ing Sistemas 26-1", description: "Campeonato interno de confraternidad.", startDate: "10 Abr", endDate: "15 Abr", status: "PLANNED" }
];

const EventManagementScreen = () => {
  // 1. Quitamos useParams y el .find() porque aquí queremos mostrar TODOS los eventos

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
        {/* 2. Le pasamos el array completo de MOCKS */}
        <EventList events={EVENTS_MOCK} />
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