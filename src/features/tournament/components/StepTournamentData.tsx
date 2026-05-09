import { Trophy } from 'lucide-react';
import { InputText } from '@atoms/InputText';
import type { Tournament } from '../models/tournament.interface';

interface StepProps {
  data: Tournament;
  onUpdate: (data: Partial<Tournament>) => void;
}

export const StepTournamentData = ({ data, onUpdate }: StepProps) => {
  const sports = ["Fútbol", "Fulbito", "Vóley", "Básquet"];

  return (
    <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-primary mb-4">
        <Trophy size={48} />
      </div>
      <h2 className="text-3xl font-black text-dark mb-8 text-center">Datos del Torneo</h2>

      <div className="w-full max-w-md space-y-8">
        <InputText
          label="Nombre del Torneo"
          placeholder="Ej: Copa Amistad 2026"
          required
          value={data.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
        />

        <div className="space-y-3">
          <label className="text-sm font-bold text-dark ml-1">Selecciona el Deporte *</label>
          <div className="grid grid-cols-2 gap-4">
            {sports.map((sport) => (
              <button
                key={sport}
                onClick={() => onUpdate({ sport })}
                className={`py-4 px-6 rounded-2xl border-2 transition-all font-bold cursor-pointer ${
                  data.sport === sport
                    ? 'border-primary bg-primary/5 text-primary shadow-md'
                    : 'border-light bg-background text-gray-400 hover:border-secondary'
                }`}
              >
                {sport}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};