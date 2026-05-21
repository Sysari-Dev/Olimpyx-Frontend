import { Trophy, Activity, Disc, Target } from 'lucide-react';
import { InputText } from '@atoms/InputText';
import type { CreateTournamentRequestDTO } from '../models/tournament-api.model';
import { SPORT_IDS } from '@constants/sport-ids.constant';

interface StepProps {
  data: CreateTournamentRequestDTO;
  onUpdate: (data: Partial<CreateTournamentRequestDTO>) => void;
}

export const StepTournamentData = ({ data, onUpdate }: StepProps) => {
  const sports = [
    { id: SPORT_IDS.FUTBOL, name: "Fútbol", icon: Activity },
    { id: SPORT_IDS.BASQUET, name: "Baloncesto", icon: Disc },
    { id: SPORT_IDS.VOLEY, name: "Vóley", icon: Target },
    { id: SPORT_IDS.FUTSAL, name: "Futsal", icon: Activity },
  ];

  return (
    <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 shadow-lg shadow-primary/20">
        <Trophy size={32} />
      </div>      
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-light tracking-tighter">Datos Primordiales</h2>
        <p className="text-gray/40 text-sm mt-1">Define la identidad y disciplina de tu competición.</p>
      </div>
      <div className="w-full max-w-lg space-y-10">
        <InputText
          label="Nombre del Torneo"
          placeholder="Ej: Champions League Abancay"
          required
          icon={Trophy}
          value={data.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
        />
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <label className="text-[10px] font-black uppercase text-gray/40 tracking-[0.2em]">
              Disciplina Deportiva
            </label>
            <span className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">Requerido</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {sports.map((sport) => {
              const isSelected = data.sportId === sport.id;
              const Icon = sport.icon;
              return (
                <button
                  key={sport.id}
                  type="button"
                  onClick={() => onUpdate({ sportId: sport.id })}
                  className={`relative p-5 rounded-lg border-2 transition-all duration-300 flex flex-col items-center gap-3 group cursor-pointer
                    ${isSelected
                      ? 'border-primary bg-primary/10 text-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)]'
                      : 'border-white/5 bg-white/2 text-gray/40 hover:border-white/20 hover:bg-white/5'
                    }`}
                >
                  <Icon 
                    size={24} 
                    className={`transition-transform duration-500 ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`} 
                  />
                  <span className={`text-xs font-black uppercase tracking-widest transition-colors ${isSelected ? 'text-light' : 'group-hover:text-light'}`}>
                    {sport.name}
                  </span>
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};