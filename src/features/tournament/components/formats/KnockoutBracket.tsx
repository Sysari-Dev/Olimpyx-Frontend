import { useState } from "react";

interface Match {
  id: string;
  team1: string | null;
  team2: string | null;
  score1?: number;
  score2?: number;
}

interface Round {
  matches: Match[];
}

export const KnockoutBracket = ({ tournamentId }: { tournamentId: string }) => {
  console.log("Montando llaves para el torneo:", tournamentId);

  const initialData: Round[] = [
    {
      matches: [
        { id: "m1", team1: "Chankas", team2: "COD 22-1", score1: 0, score2: 0 },
        { id: "m2", team1: "Ciclo 1 - Voler", team2: "COD 21-1" }, // Bye
        { id: "m3", team1: "Ing. Sistemas", team2: "Medicina", score1: 0, score2: 0 },
        { id: "m4", team1: "Derecho", team2: "Educación", score1: 0, score2: 0 },
      ],
    },
    {
      matches: [
        { id: "m5", team1: null, team2: null }, 
        { id: "m6", team1: null, team2: null }, 
      ],
    },
    {
      matches: [
        { id: "m7", team1: null, team2: null }, 
      ],
    },
  ];

  const [bracketData, setBracketData] = useState<Round[]>(initialData);
  const handleDragStart = (e: React.DragEvent, rIndex: number, mIndex: number, slot: "team1" | "team2") => {
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ rIndex, mIndex, slot })
    );
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
        destino: { ronda: targetRIndex, partido: targetMIndex, posicion: targetSlot }
      }
    });
  };

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