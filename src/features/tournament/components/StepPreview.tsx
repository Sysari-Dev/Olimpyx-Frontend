import {
  LayoutDashboard,
  Info,
  GitMerge,
  ListOrdered,
  Trophy,
  Users,
} from "lucide-react";
import { useTeam } from "@features/teams/hooks/useTeam";
import type { CreateTournamentRequestDTO } from "../models/tournament-api.model";

interface StepProps {
  data: CreateTournamentRequestDTO;
}

export const StepPreview = ({ data }: StepProps) => {
  const { teams } = useTeam();
  const getTeamName = (id: string) =>
    teams.find((t) => t.id === id)?.name || "Equipo Desconocido";

  const renderLeagueTable = () => (
    <div className="animate-in fade-in duration-700 space-y-4">
      <div className="flex items-center gap-2 text-primary">
        <ListOrdered size={18} />
        <h3 className="font-bold text-sm uppercase tracking-widest text-light">
          Simulación de Tabla
        </h3>
      </div>
      <div className="bg-[#1A1A1A] border border-white/5 rounded-lg overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-white/2 text-gray/40 text-[9px] uppercase font-black tracking-widest border-b border-white/5">
            <tr>
              <th className="p-4">#</th>
              <th className="p-4">Club Participante</th>
              <th className="p-4 text-center">PTS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/3">
            {data.teamIds.map((id, idx) => (
              <tr key={id} className="hover:bg-white/1 transition-colors">
                <td className="p-4 text-[10px] font-black text-gray/20">
                  {idx + 1}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-[8px] font-black text-primary">
                      {getTeamName(id).substring(0, 2).toUpperCase()}
                    </div>
                    <span className="text-xs font-bold text-light/80">
                      {getTeamName(id)}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-center text-[10px] font-black text-gray/40">
                  0
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderKnockoutBrackets = () => {
    const rounds =
      data.teamIds.length <= 4
        ? ["Semifinales", "Final"]
        : ["Cuartos", "Semis", "Final"];

    return (
      <div className="animate-in zoom-in-95 duration-700 space-y-4">
        <div className="flex items-center gap-2 text-primary">
          <GitMerge size={18} />
          <h3 className="font-bold text-sm uppercase tracking-widest text-light">
            Estructura de Playoffs
          </h3>
        </div>
        <div className="p-8 bg-white/2 border border-white/5 rounded-lg overflow-x-auto custom-scrollbar">
          <div className="flex items-start gap-12 min-w-max">
            {rounds.map((round, idx) => (
              <div key={idx} className="flex flex-col gap-8 items-center">
                <span className="text-[9px] font-black text-primary uppercase bg-primary/10 px-4 py-1 rounded-full border border-primary/20">
                  {round}
                </span>
                <div className="flex flex-col gap-6 justify-around h-full py-4">
                  {Array.from({
                    length: Math.pow(2, rounds.length - 1 - idx),
                  }).map((_, i) => (
                    <div
                      key={i}
                      className="p-3 bg-[#1A1A1A] border border-white/10 rounded-lg shadow-xl w-40 flex flex-col gap-2 relative"
                    >
                      <div className="h-3 w-3/4 bg-white/5 rounded" />
                      <div className="h-px bg-white/5" />
                      <div className="h-3 w-1/2 bg-white/5 rounded" />
                      <div className="absolute -right-6 top-1/2 w-6 h-px bg-white/10" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex flex-col items-center gap-2 pt-12">
              <Trophy className="text-primary animate-bounce" size={32} />
              <span className="text-[9px] font-black text-primary uppercase tracking-tighter">
                Campeón
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderGroups = () => {
    const groupCount = data.groupsCount || 2;
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-left-4 duration-700">
        {Array.from({ length: groupCount }).map((_, i) => (
          <div
            key={i}
            className="bg-[#1A1A1A] border border-white/5 rounded-lg overflow-hidden shadow-2xl"
          >
            <div className="bg-white/2 p-3 border-b border-white/5 flex justify-between items-center">
              <h4 className="text-light font-black text-[10px] uppercase tracking-widest">
                Grupo {String.fromCharCode(65 + i)}
              </h4>
              <Users size={12} className="text-primary/40" />
            </div>
            <div className="p-4 space-y-2">
              {data.teamIds.slice(i * 2, (i + 1) * 2).map((id, ti) => (
                <div
                  key={ti}
                  className="flex justify-between items-center p-3 bg-white/1 rounded-md border border-white/5"
                >
                  <span className="font-bold text-light/60 text-xs">
                    {getTeamName(id)}
                  </span>
                  <div className="w-1.5 h-1.5 bg-primary/40 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col animate-in fade-in duration-500 max-w-4xl mx-auto">
      <header className="mb-10 text-center md:text-left">
        <h2 className="text-3xl font-bold text-light flex items-center justify-center md:justify-start gap-3 tracking-tighter">
          <LayoutDashboard className="text-primary" size={28} /> Confirmar
          Configuración
        </h2>
        <p className="text-[10px] text-gray/40 font-black uppercase tracking-[0.2em] mt-2">
          Formato:{" "}
          <span className="text-primary/80">
            {data.format.replace("_", " ")}
          </span>{" "}
          • {data.isHomeAndAway ? "Ida y Vuelta" : "Partido Único"}
        </p>
      </header>
      <div className="flex items-start gap-4 p-5 bg-primary/5 border border-primary/10 rounded-lg mb-10 group">
        <Info
          className="text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
          size={20}
        />
        <div className="space-y-1">
          <p className="text-xs font-bold text-primary uppercase tracking-widest">
            Simulación Generada
          </p>
          <p className="text-xs text-light/60 leading-relaxed">
            Se ha proyectado la estructura para{" "}
            <span className="text-light font-bold">
              {data.teamIds.length} equipos
            </span>
            . Al finalizar, se generarán automáticamente todas las jornadas y
            cruces correspondientes.
          </p>
        </div>
      </div>
      <div className="space-y-12">
        {data.format === "ROUND_ROBIN" && renderLeagueTable()}
        {data.format === "GROUP_STAGE" && (
          <>
            {renderGroups()}
            {renderKnockoutBrackets()}
          </>
        )}
        {data.format === "ELIMINATION" && renderKnockoutBrackets()}
      </div>
    </div>
  );
};
