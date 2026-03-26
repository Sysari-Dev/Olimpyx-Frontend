import { Users } from "lucide-react";
import type { WizardFormData, PreviewTeam } from "./wizard.types";

interface Props {
  data: WizardFormData;
  updateData: (updates: Partial<WizardFormData>) => void;
  availableTeams: PreviewTeam[]; // Recibimos los equipos de la Base de Datos
}

export const Step3Teams = ({ data, updateData, availableTeams }: Props) => {
  
  const toggleTeam = (teamId: string) => {
    const isSelected = data.selectedTeams.includes(teamId);
    updateData({
      selectedTeams: isSelected 
        ? data.selectedTeams.filter(id => id !== teamId) 
        : [...data.selectedTeams, teamId]
    });
  };

  return (
    <div className="space-y-8 animate-slide-up max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <Users size={48} className="text-accent mx-auto mb-4" />
        <h2 className="text-3xl font-black text-dark tracking-tight">Equipos Participantes</h2>
        <p className="text-dark/60 font-medium mt-2">Equipos seleccionados: <span className="font-black text-accent">{data.selectedTeams.length}</span></p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {availableTeams.map(team => (
          <button 
            key={team.id} 
            onClick={() => toggleTeam(team.id)} 
            className={`p-4 rounded-2xl border-2 font-bold text-sm text-left transition-all ${data.selectedTeams.includes(team.id) ? 'border-accent bg-accent text-white shadow-lg shadow-accent/20' : 'border-light bg-white text-dark/70 hover:border-accent/40'}`}
          >
            {team.name}
          </button>
        ))}
      </div>
    </div>
  );
};