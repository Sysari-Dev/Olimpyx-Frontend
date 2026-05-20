import { Trophy } from "lucide-react";
import { type Event } from "@models/event.model";
import { SelectCustom } from "@atoms/SelectCustom";

interface Props {
  events: Event[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export const EventSwitcher = ({ events, selectedId, onSelect }: Props) => {
  return (
    <SelectCustom
      options={events}
      selectedId={selectedId}
      onSelect={onSelect}
      label="Evento Seleccionado"
      placeholder="Elegir evento..."
      icon={Trophy}
    />
  );
};