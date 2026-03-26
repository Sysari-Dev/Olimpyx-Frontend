import { Layout, AlertCircle, RefreshCw, CalendarDays, GitMerge, Trophy } from "lucide-react";
import type { WizardFormData, PreviewGroup, PreviewTeam, GeneratedPreview } from "./wizard.types";

interface Props {
  data: WizardFormData;
  preview: GeneratedPreview | null; 
  onReshuffle: () => void;
}

export const Step4Preview = ({ data, preview, onReshuffle }: Props) => {
  if (!preview) return null;

  return (
    <div className="space-y-8 animate-slide-up w-full">
      <div className="flex justify-between items-end border-b border-light pb-6 mb-8">
        <div>
          <h2 className="text-3xl font-black text-dark tracking-tight flex items-center gap-3"><Layout size={32} className="text-accent" /> Vista Previa</h2>
          <p className="text-dark/60 font-medium mt-1">Configuración para {data.selectedTeams.length} equipos.</p>
        </div>
        <button onClick={onReshuffle} className="bg-dark text-white font-bold px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-dark/80 transition-colors active:scale-95">
          <RefreshCw size={16} /> Volver a Sortear
        </button>
      </div>

      {preview.type === "groups" && (
        <div className="space-y-10">
          {data.selectedTeams.length % data.groupsCount !== 0 && (
            <div className="bg-blue-50 text-blue-600 p-4 rounded-xl flex gap-3 items-start text-sm font-bold">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <p>El sistema ha distribuido el sobrante de equipos automáticamente.</p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(preview.data as PreviewGroup[]).map((grupo) => (
              <div key={grupo.name} className="bg-white border border-light rounded-3xl overflow-hidden shadow-sm">
                <div className="bg-dark text-white px-6 py-4"><h4 className="font-black text-lg">{grupo.name}</h4></div>
                <div className="divide-y divide-light">
                  {grupo.teams.map((t, idx) => (<div key={t.id} className="px-6 py-3 flex gap-4 text-sm"><span className="text-dark/20 font-black">{idx + 1}</span><span className="font-bold">{t.name}</span></div>))}
                </div>
                <div className="bg-light/30 p-4 border-t border-light">
                  <p className="text-[10px] font-black uppercase tracking-widest text-dark/40 mb-2 flex items-center gap-1"><CalendarDays size={12}/> Jornada 1</p>
                  {grupo.fixtures.map((f, i) => (
                    <div key={i} className="flex justify-between text-xs font-bold text-dark/70 mb-1">
                      <span>{f[0]?.name}</span><span className="text-accent px-2">vs</span><span>{f[1]?.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-xl font-black text-dark mb-4 border-b border-light pb-2 flex items-center gap-2"><GitMerge size={20} className="text-accent" /> Proyección</h3>
            <div className="bg-white border border-light rounded-3xl p-8 flex overflow-x-auto gap-8 custom-scrollbar">
              <div className="flex flex-col gap-4 justify-around min-w-[200px]">
                <div className="bg-light/30 border border-light p-3 rounded-xl text-center text-sm font-bold text-dark/50">1ro Grupo A <br/>vs<br/> 2do Grupo B</div>
                <div className="bg-light/30 border border-light p-3 rounded-xl text-center text-sm font-bold text-dark/50">1ro Grupo B <br/>vs<br/> 2do Grupo C</div>
              </div>
              <div className="flex flex-col justify-around min-w-[200px]"><div className="bg-light border-2 border-dashed border-dark/10 h-24 rounded-xl flex items-center justify-center font-black text-dark/30">SEMIFINAL</div></div>
            </div>
          </div>
        </div>
      )}

      {preview.type === "league" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-light rounded-3xl overflow-hidden h-fit">
            <div className="bg-dark text-white px-6 py-4"><h4 className="font-black text-lg">Tabla General</h4></div>
            <div className="divide-y divide-light">{(preview.data as PreviewTeam[]).map((t, idx) => (<div key={t.id} className="px-6 py-3 flex gap-4"><span className="text-dark/20 font-black">{idx + 1}</span><span className="font-bold">{t.name}</span></div>))}</div>
          </div>
          <div className="bg-white border border-light rounded-3xl overflow-hidden h-fit">
            <div className="bg-accent text-white px-6 py-4 flex items-center gap-2"><CalendarDays size={20}/> <h4 className="font-black text-lg">Fixtures</h4></div>
            <div className="divide-y divide-light p-4">
              {(preview.fixtures as PreviewTeam[][]).map((match, idx) => (
                <div key={idx} className="py-3 flex justify-between items-center font-bold"><span className="w-1/3 text-right">{match[0].name}</span><span className="text-[10px] bg-light px-2 py-1 rounded-md text-dark/40">VS</span><span className="w-1/3 text-left">{match[1]?.name || 'Descansa'}</span></div>
              ))}
            </div>
          </div>
        </div>
      )}

      {preview.type === "knockout" && (
        <div className="bg-white border border-light rounded-3xl p-8 overflow-x-auto custom-scrollbar">
          <div className="flex gap-12 min-w-[600px]">
            <div className="flex flex-col justify-around gap-6 w-64 shrink-0 relative">
              {(preview.data as PreviewTeam[][]).map((match, idx) => (
                <div key={idx} className="bg-white border-2 border-light rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-light/30 px-3 py-1 text-[10px] font-black uppercase text-dark/40 border-b border-light">Llave {idx + 1}</div>
                  <div className="p-3 font-bold text-sm border-b border-light">{match[0].name}</div>
                  <div className="p-3 font-bold text-sm">{match[1].name}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-around gap-20 w-64 shrink-0 border-l-2 border-dashed border-light pl-12"><div className="bg-light/30 border border-light h-24 rounded-xl flex items-center justify-center font-black text-dark/30 text-sm">Ganador 1 vs 2</div><div className="bg-light/30 border border-light h-24 rounded-xl flex items-center justify-center font-black text-dark/30 text-sm">Ganador 3 vs 4</div></div>
            <div className="flex flex-col justify-center w-64 shrink-0 border-l-2 border-dashed border-light pl-12"><div className="bg-accent/10 border-2 border-accent text-accent h-32 rounded-xl flex flex-col items-center justify-center"><Trophy size={32} className="mb-2" /><span className="font-black uppercase">Gran Final</span></div></div>
          </div>
        </div>
      )}
    </div>
  );
};