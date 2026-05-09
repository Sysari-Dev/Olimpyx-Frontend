import { Users } from 'lucide-react';
import type { Tournament } from '../models/tournament.interface';

interface StepProps {
  data: Tournament;
  onUpdate: (data: Partial<Tournament>) => void;
}

export const StepParticipants = ({ data, onUpdate }: StepProps) => {
  const availableTeams = [
    { id: '1', name: 'Chankas' },
    { id: '2', name: 'Chankas Voley' },
    { id: '3', name: 'Ciclo 1 - Voler' },
    { id: '4', name: 'XD' },
    { id: '5', name: 'Alianza Abancay' },
    { id: '6', name: 'Poderoso Apurímac' }
  ];

  const toggleTeam = (teamName: string) => {
    const isSelected = data.teams.includes(teamName);
    const updatedTeams = isSelected
      ? data.teams.filter((t) => t !== teamName)
      : [...data.teams, teamName];
    
    onUpdate({ teams: updatedTeams });
  };

  return (
    <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-primary mb-4">
        <Users size={48} />
      </div>
      
      <h2 className="text-3xl font-black text-dark mb-2 text-center">Equipos Participantes</h2>
      <p className="text-sm font-bold text-gray-400 mb-8">
        Equipos seleccionados: <span className="text-primary">{data.teams.length}</span>
      </p>

      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableTeams.map((team) => {
            const isSelected = data.teams.includes(team.name);
            
            return (
              <button
                key={team.id}
                onClick={() => toggleTeam(team.name)}
                className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                  isSelected
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-light bg-background hover:border-secondary'
                }`}
              >
                <span className={`font-bold transition-colors ${
                  isSelected ? 'text-primary' : 'text-dark group-hover:text-secondary'
                }`}>
                  {team.name}
                </span>
                
                {isSelected && (
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center animate-in zoom-in duration-200">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};