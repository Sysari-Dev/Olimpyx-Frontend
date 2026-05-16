import { useEffect, useState, useMemo } from 'react';
import { Users, Search, Shield, CheckCircle2, Info } from 'lucide-react';
import { useTeam } from '@features/teams/hooks/useTeam';
import { useAppSelector } from '@store/hooks';
import { InputText } from '@atoms/InputText';
import { LoadingState } from '@atoms/LoadingState';
import type { CreateTournamentRequestDTO } from '../models/tournament-api.model';

interface StepProps {
  data: CreateTournamentRequestDTO;
  onUpdate: (data: Partial<CreateTournamentRequestDTO>) => void;
}

export const StepParticipants = ({ data, onUpdate }: StepProps) => {
  const { activeOrg } = useAppSelector((state) => state.auth);
  const { teams, isLoading, fetchTeams } = useTeam();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (activeOrg?.id && teams.length === 0) {
      fetchTeams(activeOrg.id);
    }
  }, [activeOrg?.id, fetchTeams, teams.length]);

  const filteredTeams = useMemo(() => {
    return teams.filter(t => 
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
      t.status === 'ACTIVE'
    );
  }, [teams, searchTerm]);

  const toggleTeam = (teamId: string) => {
    const isSelected = data.teamIds.includes(teamId);
    const updatedIds = isSelected
      ? data.teamIds.filter((id) => id !== teamId)
      : [...data.teamIds, teamId];
    
    onUpdate({ teamIds: updatedIds });
  };

  if (isLoading && teams.length === 0) {
    return <LoadingState text="Sincronizando clubes..." variant="secondary" />;
  }

  return (
    <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6 shadow-lg shadow-primary/20">
        <Users size={32} />
      </div>      
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-light tracking-tighter">Participantes</h2>
        <p className="text-gray/40 text-sm mt-1">
          Has seleccionado <span className="text-secondary font-bold">{data.teamIds.length}</span> equipos para este torneo.
        </p>
      </div>
      <div className="w-full max-w-4xl space-y-6">
        <div className="relative max-w-md mx-auto w-full">
          <InputText
            placeholder="Filtrar por nombre de club..."
            icon={Search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {filteredTeams.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-lg bg-white/1">
            <Shield size={40} className="text-gray/10 mb-4" />
            <p className="text-gray/40 text-xs font-black uppercase tracking-widest">No se encontraron equipos activos</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTeams.map((team) => {
              const isSelected = data.teamIds.includes(team.id);              
              return (
                <button
                  key={team.id}
                  type="button"
                  onClick={() => toggleTeam(team.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all duration-300 cursor-pointer flex items-center gap-4 group relative overflow-hidden
                    ${isSelected
                      ? 'border-primary bg-primary/10 shadow-lg shadow-primary/5'
                      : 'border-white/5 bg-white/2 hover:border-white/20'
                    }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-[10px] shrink-0 transition-colors
                    ${isSelected ? 'bg-primary text-white' : 'bg-white/5 text-gray/40 group-hover:bg-white/10'}`}>
                    {team.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-bold truncate transition-colors ${isSelected ? 'text-light' : 'text-gray group-hover:text-light'}`}>
                      {team.name}
                    </p>
                    <p className="text-[9px] font-black text-gray/40 uppercase tracking-tighter">Club Afiliado</p>
                  </div>
                  {isSelected && (
                    <div className="text-primary animate-in zoom-in duration-300">
                      <CheckCircle2 size={18} />
                    </div>
                  )}
                  {isSelected && (
                    <div className="absolute -right-2 -bottom-2 opacity-10 pointer-events-none">
                      <Users size={60} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
        <div className="flex items-start gap-3 p-4 bg-white/2 border border-white/5 rounded-lg mt-8">
          <Info size={16} className="text-primary/60 shrink-0 mt-0.5" />
          <p className="text-[11px] text-gray/40 leading-relaxed">
            Solo se muestran los equipos con estado <strong className="text-emerald-500/60 uppercase">Activo</strong>. Si no encuentras un club, asegúrate de que esté habilitado en la sección de Gestión de Equipos.
          </p>
        </div>
      </div>
    </div>
  );
};