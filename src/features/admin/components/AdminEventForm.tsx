import { useState } from "react";
import { Save, X, Calendar, MapPin, AlignLeft, Trophy } from "lucide-react";
import type { SportEvent } from "src/shared/models/event.model";
interface AdminEventFormProps {
  initialData?: Partial<SportEvent>; 
  onSubmit: (data: unknown) => void;
  onCancel: () => void;
}

export const AdminEventForm = ({ initialData, onSubmit, onCancel }: AdminEventFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    location: initialData?.location || "",
    startDate: initialData?.startDate || "",
    endDate: initialData?.endDate || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  return (
    <div className="bg-white border border-light rounded-2xl p-6 shadow-sm">
      <form onSubmit={handleLocalSubmit} className="flex flex-col gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-black text-dark flex items-center gap-2">
            <Trophy size={16} className="text-accent" /> Nombre del Evento *
          </label>
          <input
            type="text" id="name" name="name" required
            placeholder="Ej. Olimpiadas Intercarreras 2026"
            value={formData.name} onChange={handleChange}
            className="w-full bg-light/30 border border-light rounded-xl px-4 py-3 text-dark focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all font-medium"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-black text-dark flex items-center gap-2">
            <AlignLeft size={16} className="text-dark/40" /> Descripción
          </label>
          <textarea
            id="description" name="description" rows={3}
            placeholder="Describe el propósito del evento, reglas generales o dedicatorias..."
            value={formData.description} onChange={handleChange}
            className="w-full bg-light/30 border border-light rounded-xl px-4 py-3 text-dark focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all font-medium resize-none"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-black text-dark flex items-center gap-2">
              <MapPin size={16} className="text-dark/40" /> Ubicación
            </label>
            <input
              type="text" id="location" name="location"
              placeholder="Ej. Campus Central UNAMBA"
              value={formData.location} onChange={handleChange}
              className="w-full bg-light/30 border border-light rounded-xl px-4 py-3 text-dark focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all font-medium"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="startDate" className="text-sm font-black text-dark flex items-center gap-2">
              <Calendar size={16} className="text-dark/40" /> Fecha de Inicio *
            </label>
            <input
              type="date" id="startDate" name="startDate" required
              value={formData.startDate} onChange={handleChange}
              className="w-full bg-light/30 border border-light rounded-xl px-4 py-3 text-dark focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all font-medium"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="endDate" className="text-sm font-black text-dark flex items-center gap-2">
              <Calendar size={16} className="text-dark/40" /> Fecha de Fin *
            </label>
            <input
              type="date" id="endDate" name="endDate" required
              value={formData.endDate} onChange={handleChange}
              className="w-full bg-light/30 border border-light rounded-xl px-4 py-3 text-dark focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all font-medium"
            />
          </div>
        </div>

        <div className="h-px w-full bg-light my-2"></div>
        <div className="flex items-center justify-end gap-4">
          <button
            type="button" onClick={onCancel}
            className="px-6 py-3 rounded-xl font-bold text-dark/60 hover:bg-light hover:text-dark transition-colors flex items-center gap-2"
          >
            <X size={18} /> Cancelar
          </button>
          <button
            type="submit"
            className="px-8 py-3 rounded-xl font-black bg-accent text-white hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20 transition-all flex items-center gap-2 active:scale-95"
          >
            <Save size={18} /> Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};