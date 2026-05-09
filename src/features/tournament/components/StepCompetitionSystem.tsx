import { Settings, CheckCircle2 } from 'lucide-react';
import { InputText } from '@atoms/InputText';
import type { Tournament } from '../models/tournament.interface';

interface StepProps {
  data: Tournament;
  onUpdate: (data: Partial<Tournament>) => void;
}

export const StepCompetitionSystem = ({ data, onUpdate }: StepProps) => {
  const systems = [
    { id: 'groups', label: 'Fase de Grupos' },
    { id: 'league', label: 'Liga (Todos vs Todos)' },
    { id: 'knockout', label: 'Eliminación Directa' },
  ];

  return (
    <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-primary mb-4">
        <Settings size={48} />
      </div>
      <h2 className="text-3xl font-black text-dark mb-8 text-center">Sistema de Competición</h2>

      <div className="w-full max-w-2xl space-y-4">
        {systems.map((sys) => (
          <button
            key={sys.id}
            onClick={() => onUpdate({ system: sys.id as any })}
            className={`w-full p-6 rounded-2xl border-2 flex justify-between items-center transition-all font-bold cursor-pointer ${
              data.system === sys.id
                ? 'border-primary bg-primary/5 text-primary shadow-md'
                : 'border-light bg-background text-dark hover:border-secondary'
            }`}
          >
            <span>{sys.label}</span>
            {data.system === sys.id && <CheckCircle2 className="text-primary" />}
          </button>
        ))}
        {data.system && (
          <div className="pt-6 space-y-6 animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center p-6 bg-light/10 rounded-2xl border border-light">
              <div>
                <p className="font-bold text-dark">Partidos de Ida y Vuelta</p>
                <p className="text-xs text-gray-400">Si está inactivo, jugarán a partido único.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={data.isDoubleMatch}
                  onChange={(e) => onUpdate({ isDoubleMatch: e.target.checked })}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            {data.system === 'groups' && (
              <div className="grid grid-cols-2 gap-4">
                <InputText
                  label="CANT. DE GRUPOS"
                  type="number"
                  placeholder="2"
                  value={data.groupCount}
                  onChange={(e) => onUpdate({ groupCount: Number(e.target.value) })}
                />
                <InputText
                  label="CLASIFICAN POR GRUPO"
                  type="number"
                  placeholder="2"
                  value={data.qualifiersPerGroup}
                  onChange={(e) => onUpdate({ qualifiersPerGroup: Number(e.target.value) })}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};