import { Settings, CheckCircle2 } from "lucide-react";
import type { WizardFormData } from "./wizard.types";

const FORMATS = ["Fase de Grupos", "Liga (Todos vs Todos)", "Eliminación Directa"];

interface Props {
  data: WizardFormData;
  updateData: (updates: Partial<WizardFormData>) => void;
}

export const Step2Format = ({ data, updateData }: Props) => (
  <div className="space-y-8 animate-slide-up max-w-2xl mx-auto">
    <div className="text-center mb-8">
      <Settings size={48} className="text-accent mx-auto mb-4" />
      <h2 className="text-3xl font-black text-dark tracking-tight">Sistema de Competición</h2>
    </div>

    <div className="grid grid-cols-1 gap-4 mb-8">
      {FORMATS.map(format => (
        <button key={format} onClick={() => updateData({ format })} className={`p-6 rounded-2xl border-2 font-black text-left flex justify-between ${data.format === format ? 'border-accent bg-accent/5 text-accent' : 'border-light bg-white text-dark hover:border-accent/30'}`}>
          {format} {data.format === format && <CheckCircle2 size={24} />}
        </button>
      ))}
    </div>

    {(data.format === "Liga (Todos vs Todos)" || data.format === "Fase de Grupos") && (
      <div className="bg-white p-6 rounded-2xl border border-light flex items-center justify-between animate-fade-in">
        <div>
          <h4 className="font-black text-dark">Partidos de Ida y Vuelta</h4>
          <p className="text-xs text-dark/60 font-medium">Si está inactivo, jugarán a partido único.</p>
        </div>
        <button onClick={() => updateData({ isHomeAway: !data.isHomeAway })} className={`w-14 h-8 rounded-full flex items-center p-1 transition-colors ${data.isHomeAway ? 'bg-accent' : 'bg-light'}`}>
          <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${data.isHomeAway ? 'translate-x-6' : 'translate-x-0'}`} />
        </button>
      </div>
    )}

    {data.format === "Fase de Grupos" && (
      <div className="grid grid-cols-2 gap-6 animate-fade-in">
        <div className="bg-white p-6 rounded-2xl border border-light">
          <label className="text-xs font-black text-dark uppercase tracking-widest block mb-2">Cant. de Grupos</label>
          <input type="number" min="2" max="10" value={data.groupsCount} onChange={e => updateData({ groupsCount: parseInt(e.target.value) || 2 })} className="w-full text-3xl font-black text-accent bg-transparent outline-none" />
        </div>
        <div className="bg-white p-6 rounded-2xl border border-light">
          <label className="text-xs font-black text-dark uppercase tracking-widest block mb-2">Clasifican por grupo</label>
          <input type="number" min="1" max="4" value={data.advancingPerGroup} onChange={e => updateData({ advancingPerGroup: parseInt(e.target.value) || 2 })} className="w-full text-3xl font-black text-accent bg-transparent outline-none" />
        </div>
      </div>
    )}
  </div>
);