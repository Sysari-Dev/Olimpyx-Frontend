import { Trophy } from "lucide-react";
import type { WizardFormData } from "./wizard.types";

const SPORTS = ["Fútbol", "Fulbito", "Vóley", "Básquet"];

interface Props {
  data: WizardFormData;
  updateData: (updates: Partial<WizardFormData>) => void;
}

export const Step1BasicData = ({ data, updateData }: Props) => (
  <div className="space-y-8 animate-slide-up max-w-2xl mx-auto">
    <div className="text-center mb-8">
      <Trophy size={48} className="text-accent mx-auto mb-4" />
      <h2 className="text-3xl font-black text-dark tracking-tight">Datos del Torneo</h2>
    </div>
    <div className="space-y-4">
      <label className="text-sm font-black text-dark">Nombre del Torneo *</label>
      <input 
        type="text" value={data.name} 
        onChange={e => updateData({ name: e.target.value })} 
        className="w-full bg-white border border-light rounded-2xl px-6 py-4 font-bold text-lg outline-none focus:border-accent" 
      />
    </div>
    <div className="space-y-4">
      <label className="text-sm font-black text-dark">Selecciona el Deporte *</label>
      <div className="grid grid-cols-2 gap-4">
        {SPORTS.map(sport => (
          <button 
            key={sport} onClick={() => updateData({ sport })} 
            className={`p-6 rounded-2xl border-2 font-black transition-all ${data.sport === sport ? 'border-accent bg-accent/5 text-accent' : 'border-light bg-white text-dark/60'}`}
          >
            {sport}
          </button>
        ))}
      </div>
    </div>
  </div>
);