import { X } from "lucide-react";
import { AdminEventForm } from "./AdminEventForm";
import type { SportEvent } from "src/shared/models/event.model";

interface EditEventModalProps {
  isOpen: boolean;
  event: SportEvent | null;
  onClose: () => void;
  onSave: (data: unknown) => void;
}

export const EditEventModal = ({ isOpen, event, onClose, onSave }: EditEventModalProps) => {
  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-slide-up custom-scrollbar">
        <div className="sticky top-0 bg-white/90 backdrop-blur-md z-10 px-8 py-6 border-b border-light flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-dark tracking-tight">Editar Evento</h2>
            <p className="text-xs font-bold text-dark/40 uppercase tracking-widest mt-1">ID: {event.id}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-dark/40 hover:text-dark hover:bg-light/50 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-8">
          <AdminEventForm 
            initialData={event} 
            onSubmit={onSave} 
            onCancel={onClose} 
          />
        </div>

      </div>
    </div>
  );
};