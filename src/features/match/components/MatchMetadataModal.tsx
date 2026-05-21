import { useState } from "react";
import { Calendar, Activity } from "lucide-react";
import BaseModal from "@atoms/BaseModal";
import { SelectCustom } from "@atoms/SelectCustom";
import { type MatchStatus } from "@models/match.model";

interface MatchMetadataModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStatus: MatchStatus;
  currentDate: string | null;
  onSave: (payload: { matchDate: string | null; status: MatchStatus }) => Promise<void>;
}

export const MatchMetadataModal = ({
  isOpen,
  onClose,
  currentStatus,
  currentDate,
  onSave,
}: MatchMetadataModalProps) => {
  const [status, setStatus] = useState<MatchStatus>(currentStatus);
  const [date, setDate] = useState<string>(
    currentDate ? new Date(currentDate).toISOString().slice(0, 16) : ""
  );
  const [isSaving, setIsSaving] = useState(false);

  const statusOptions = [
    { id: "PENDING", name: "PENDIENTE (Programado)" },
    { id: "IN_PROGRESS", name: "EN VIVO (En progreso)" },
    { id: "SUSPENDED", name: "SUSPENDIDO (Pausado)" },
  ];

  const handleConfirm = async () => {
    setIsSaving(true);
    await onSave({
      matchDate: date ? new Date(date).toISOString() : null,
      status,
    });
    setIsSaving(false);
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Editar"
      description="Modifica la programación temporal o el estado de control operativo del encuentro."
      confirmText={isSaving ? "Guardando..." : "Actualizar"}
    >
      <div className="space-y-5 text-left w-full">
        <div className="space-y-2 w-full">
          <p className="text-[10px] font-black uppercase text-gray/40 tracking-[0.15em] px-1">
            Fecha y Hora del Partido
          </p>
          <div className="relative w-full group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center transition-colors group-focus-within:bg-primary group-focus-within:text-white pointer-events-none">
              <Calendar size={16} />
            </div>
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full h-14 pl-14 pr-4 bg-white/5 border border-white/5 rounded-xl text-sm font-bold text-light focus:outline-none focus:border-primary/40 focus:bg-white/8 transition-all scheme-dark cursor-pointer"
            />
          </div>
        </div>

        <div className="space-y-2 w-full">
          <p className="text-[10px] font-black uppercase text-gray/40 tracking-[0.15em] px-1">
            Estado Operativo del Control
          </p>
          <div className="w-full [&>div]:md:w-full">
            <SelectCustom
              options={statusOptions}
              selectedId={status}
              onSelect={(id) => setStatus(id as MatchStatus)}
              icon={Activity}
              placeholder="Seleccionar Estado"
            />
          </div>
        </div>
      </div>
    </BaseModal>
  );
};