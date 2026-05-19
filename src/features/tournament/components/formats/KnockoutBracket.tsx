import { useMemo, useState, useEffect } from "react";
import { type Match } from "@models/match.model";

interface BracketMatch {
  id: string;
  team1: string | null;
  team2: string | null;
  score1?: number;
  score2?: number;
}

interface Round {
  name: string;
  matches: BracketMatch[];
}

interface KnockoutBracketProps {
  tournamentId: string;
  matches: Match[];
}

export const KnockoutBracket = ({ tournamentId, matches }: KnockoutBracketProps) => {
  console.log("Montando llaves para el torneo:", tournamentId);

  // 1. Reemplazamos el useEffect por un useMemo puro y libre de re-renders infinitos
  const computedBracketData = useMemo<Round[]>(() => {
    if (matches.length === 0) return [];

    const roundsMap: { [key: string]: BracketMatch[] } = {};

    matches.forEach((m) => {
      const roundKey = m.roundName || "Ronda Inicial";
      if (!roundsMap[roundKey]) {
        roundsMap[roundKey] = [];
      }
      roundsMap[roundKey].push({
        id: m.id,
        team1: m.team1?.name || null,
        team2: m.team2?.name || null,
        score1: m.scoreTeam1,
        score2: m.scoreTeam2,
      });
    });

    return Object.keys(roundsMap).map((key) => ({
      name: key,
      matches: roundsMap[key],
    }));
  }, [matches]);

  // 2. Mantenemos un estado local EXCLUSIVO para manejar los movimientos visuales del Drag & Drop
  const [bracketData, setBracketData] = useState<Round[]>([]);

  // Sincronizamos el estado local de drag solo cuando cambian los partidos originales calculados
  useEffect(() => {
    setBracketData(computedBracketData);
  }, [computedBracketData]);

  // --- LÓGICA DE DRAG AND DROP (Se queda idéntica) ---
  const handleDragStart = (e: React.DragEvent, rIndex: number, mIndex: number, slot: "team1" | "team2") => {
    e.dataTransfer.setData("application/json", JSON.stringify({ rIndex, mIndex, slot }));
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetRIndex: number, targetMIndex: number, targetSlot: "team1" | "team2") => {
    e.preventDefault();
    const origin = JSON.parse(e.dataTransfer.getData("application/json")) as {
      rIndex: number;
      mIndex: number;
      slot: "team1" | "team2";
    };

    const newData = JSON.parse(JSON.stringify(bracketData)) as Round[];

    const originTeam = newData[origin.rIndex].matches[origin.mIndex][origin.slot];
    const targetTeam = newData[targetRIndex].matches[targetMIndex][targetSlot];

    newData[origin.rIndex].matches[origin.mIndex][origin.slot] = targetTeam;
    newData[targetRIndex].matches[targetMIndex][targetSlot] = originTeam;

    setBracketData(newData);

    console.log("🔄 INTERCAMBIO DE EQUIPOS DETECTADO:", {
      torneo: tournamentId,
      movimiento: {
        equipoArrastrado: originTeam,
        equipoReemplazado: targetTeam,
        origen: { ronda: origin.rIndex, partido: origin.mIndex, posicion: origin.slot },
        destino: { ronda: targetRIndex, partido: targetMIndex, posicion: targetSlot },
      },
    });
  };

  if (matches.length === 0) {
    return (
      <div className="py-16 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-xl bg-white/1 text-center">
        <p className="text-gray/40 text-sm font-medium max-w-sm leading-relaxed">
          El fixture de eliminatorias aún no ha sido generado. Haz clic en <strong>Realizar Sorteo</strong> para armar las llaves de competición.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto custom-scrollbar pb-8">
      <div className="flex gap-12 min-w-max p-4">
        {bracketData.map((round, rIndex) => (
          <div key={rIndex} className="flex flex-col gap-6 justify-around">
            <div className="flex flex-col justify-around h-full gap-4">
              {round.matches.map((match, mIndex) => (
                <div
                  key={match.id}
                  className="bg-[#1A1A1A] border border-white/10 rounded-lg w-64 shadow-xl flex flex-col overflow-hidden"
                >
                  <div
                    draggable
                    onDragStart={(e) => handleDragStart(e, rIndex, mIndex, "team1")}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDrop={(e) => handleDrop(e, rIndex, mIndex, "team1")}
                    style={{ touchAction: "none" }}
                    className="flex justify-between items-center p-3 border-b border-white/5 bg-white/5 cursor-grab active:cursor-grabbing hover:bg-white/10 transition-colors"
                  >
                    <span className="text-sm font-bold text-light truncate pr-2 select-none pointer-events-none">
                      {match.team1 || <span className="text-gray/40 italic">Pase Directo / TBD</span>}
                    </span>
                    <span className="text-sm font-black text-primary">{match.score1 ?? "-"}</span>
                  </div>

                  <div
                    draggable
                    onDragStart={(e) => handleDragStart(e, rIndex, mIndex, "team2")}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDrop={(e) => handleDrop(e, rIndex, mIndex, "team2")}
                    style={{ touchAction: "none" }}
                    className="flex justify-between items-center p-3 cursor-grab active:cursor-grabbing hover:bg-white/5 transition-colors"
                  >
                    <span className="text-sm font-bold text-light truncate pr-2 select-none pointer-events-none">
                      {match.team2 || <span className="text-gray/40 italic">Pase Directo / TBD</span>}
                    </span>
                    <span className="text-sm font-black text-primary">{match.score2 ?? "-"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};