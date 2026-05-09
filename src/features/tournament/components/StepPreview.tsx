import { LayoutDashboard, Info, GitMerge, ListOrdered, Trophy, Calendar } from 'lucide-react';
import type { Tournament } from '../models/tournament.interface';

interface StepProps {
  data: Tournament;
}

export const StepPreview = ({ data }: StepProps) => {
  
  const renderLeagueTable = () => (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center gap-2 text-tertiary mb-4">
        <ListOrdered size={20} />
        <h3 className="font-black text-lg">Tabla de posiciones</h3>
      </div>
      <div className="bg-background border border-light rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-dark text-white text-[10px] uppercase tracking-widest">
            <tr>
              <th className="p-4">Posición</th>
              <th className="p-4">Equipo</th>
              <th className="p-4 text-center">PJ</th>
              <th className="p-4 text-center">Puntos</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-light">
            {data.teams.map((team, idx) => (
              <tr key={idx} className="hover:bg-light/5 transition-colors">
                <td className="p-4 font-bold text-gray-400 text-xs">{idx + 1}</td>
                <td className="p-4 font-bold text-dark text-sm">{team}</td>
                <td className="p-4 text-center text-gray-400 text-xs">0</td>
                <td className="p-4 text-center text-gray-400 text-xs">0</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderKnockoutBrackets = () => {
    const rounds = data.teams.length <= 4 ? ['Semifinal', 'Final'] : ['Cuartos de final', 'Semifinal', 'Final'];
    
    return (
      <div className="animate-in zoom-in-95 duration-500">
        <div className="flex items-center gap-2 text-accent mb-4">
          <GitMerge size={20} />
          <h3 className="font-black text-lg">Árbol de eliminación</h3>
        </div>
        <div className="p-8 bg-light/10 border border-light rounded-3xl overflow-x-auto">
          <div className="flex items-start gap-12 min-w-max">
            {rounds.map((round, idx) => (
              <div key={idx} className="flex flex-col gap-8 items-center">
                <span className="text-[10px] font-black text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">
                  {round}
                </span>
                <div className="flex flex-col gap-6 justify-around h-full">
                  {Array.from({ length: Math.pow(2, rounds.length - 1 - idx) }).map((_, i) => (
                    <div key={i} className="p-4 bg-background border border-light rounded-2xl shadow-sm w-44 flex flex-col gap-2">
                      <div className="h-4 bg-light/30 rounded-md" />
                      <div className="h-[1px] bg-light" />
                      <div className="h-4 bg-light/30 rounded-md" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex flex-col items-center gap-4">
               <Trophy className="text-tertiary" size={40} />
               <span className="text-[10px] font-black text-tertiary uppercase">Campeón</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderGroups = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-left-4 duration-500">
      {['Grupo A', 'Grupo B'].map((g, i) => (
        <div key={i} className="bg-background border border-light rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-dark p-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-tighter">{g}</h4>
          </div>
          <div className="p-4 space-y-2">
            {data.teams.slice(i * 2, (i + 1) * 2).map((t, ti) => (
              <div key={ti} className="flex justify-between items-center p-3 bg-light/10 rounded-xl border border-light/50">
                <span className="font-bold text-dark text-sm">{t}</span>
                <div className="w-2 h-2 bg-tertiary rounded-full" />
              </div>
            ))}
          </div>
          <div className="p-3 bg-light/5 border-t border-light flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-tighter">
             <Calendar size={12} /> Jornada 1
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-dark flex items-center gap-2">
          <LayoutDashboard className="text-primary" /> Vista previa
        </h2>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter mt-1">
          Sistema seleccionado: {data.system === 'groups' ? 'Fase de grupos' : data.system === 'league' ? 'Liga' : 'Eliminación directa'}
        </p>
      </div>

      <div className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-2xl mb-8">
        <Info className="text-primary shrink-0" size={18} />
        <p className="text-xs font-bold text-primary">
          Simulación generada para {data.teams.length} equipos participantes.
        </p>
      </div>

      <div className="space-y-10">
        {data.system === 'league' && renderLeagueTable()}
        
        {data.system === 'groups' && (
          <>
            {renderGroups()}
            {renderKnockoutBrackets()}
          </>
        )}

        {data.system === 'knockout' && renderKnockoutBrackets()}
      </div>
    </div>
  );
};