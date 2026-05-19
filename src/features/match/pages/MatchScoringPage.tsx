import { useState, useMemo } from "react";
import { ArrowLeft, RotateCcw, ArrowRightLeft, CheckCircle, Shield } from "lucide-react";

const SPORT_IDS = {
  FUTBOL: "deporte-001-futbol",
  BASQUET: "deporte-002-basket",
  VOLEY: "deporte-003-voley",
} as const;

const MOCK_MATCH_DETAIL = {
  id: "match-uuid-123",
  tournamentId: "b57631ce-4dd9-47f9-9ea7-f3e30bae52aa",
  sportId: SPORT_IDS.VOLEY, 
  team1: { id: "team-a", name: "Ing. Sistemas" },
  team2: { id: "team-b", name: "Administración" },
};

interface ScoreSnapshot {
  scoreTeam1: number;
  scoreTeam2: number;
  setsTeam1: number;
  setsTeam2: number;
  setNumber: number;
}

export const MatchScoringPage = () => {
  const [sportId, setSportId] = useState<string>(MOCK_MATCH_DETAIL.sportId);
  const [scoreTeam1, setScoreTeam1] = useState(0);
  const [scoreTeam2, setScoreTeam2] = useState(0);
  const [setsTeam1, setSetsTeam1] = useState(0);
  const [setsTeam2, setSetsTeam2] = useState(0);
  const [setNumber, setSetNumber] = useState(1);
  const [isSwapped, setIsSwapped] = useState(false);
  const [history, setHistory] = useState<ScoreSnapshot[]>([]);

  const saveSnapshot = () => {
    setHistory((prev) => [
      ...prev,
      { scoreTeam1, scoreTeam2, setsTeam1, setsTeam2, setNumber },
    ]);
  };

  const handleScoreUpdate = (targetTeam: "team1" | "team2", points: number, operation: "INCREMENT" | "DECREMENT") => {
    saveSnapshot();
    const multiplier = operation === "INCREMENT" ? 1 : -1;
    const delta = points * multiplier;

    if (targetTeam === "team1") {
      setScoreTeam1((prev) => Math.max(0, prev + delta));
    } else {
      setScoreTeam2((prev) => Math.max(0, prev + delta));
    }

    console.log("POST /competition/match/score", {
      tournamentId: MOCK_MATCH_DETAIL.tournamentId,
      matchId: MOCK_MATCH_DETAIL.id,
      teamId: targetTeam === "team1" ? MOCK_MATCH_DETAIL.team1.id : MOCK_MATCH_DETAIL.team2.id,
      points,
      operation,
      ...(sportId !== SPORT_IDS.FUTBOL && { setNumber }),
    });
  };

  const handleAddSet = (targetTeam: "team1" | "team2") => {
    saveSnapshot();
    if (targetTeam === "team1") {
      setSetsTeam1((prev) => prev + 1);
    } else {
      setSetsTeam2((prev) => prev + 1);
    }
    setScoreTeam1(0);
    setScoreTeam2(0);
    setSetNumber((prev) => prev + 1);

    console.log("Set finalizado. Iniciando siguiente periodo/set:", setNumber + 1);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setScoreTeam1(last.scoreTeam1);
    setScoreTeam2(last.scoreTeam2);
    setSetsTeam1(last.setsTeam1);
    setSetsTeam2(last.setsTeam2);
    setSetNumber(last.setNumber);
    setHistory((prev) => prev.slice(0, -1));
    console.log("Acción revertida localmente");
  };

  const handleFinalizeMatch = () => {
    console.log("POST /competition/match/finalize", {
      tournamentId: MOCK_MATCH_DETAIL.tournamentId,
      matchId: MOCK_MATCH_DETAIL.id,
    });
  };

  const currentSportLabel = useMemo(() => {
    if (sportId === SPORT_IDS.FUTBOL) return "Fútbol";
    if (sportId === SPORT_IDS.BASQUET) return "Básquetbol";
    return "Vóleibol";
  }, [sportId]);

  const leftData = useMemo(() => {
    return isSwapped
      ? { label: "team2", name: MOCK_MATCH_DETAIL.team2.name, score: scoreTeam2, sets: setsTeam2 }
      : { label: "team1", name: MOCK_MATCH_DETAIL.team1.name, score: scoreTeam1, sets: setsTeam1 };
  }, [isSwapped, scoreTeam1, scoreTeam2, setsTeam1, setsTeam2]);

  const rightData = useMemo(() => {
    return isSwapped
      ? { label: "team1", name: MOCK_MATCH_DETAIL.team1.name, score: scoreTeam1, sets: setsTeam1 }
      : { label: "team2", name: MOCK_MATCH_DETAIL.team2.name, score: scoreTeam2, sets: setsTeam2 };
  }, [isSwapped, scoreTeam1, scoreTeam2, setsTeam1, setsTeam2]);

  return (
    <div className="min-h-screen bg-[#0A0F24] text-white flex flex-col font-sans select-none overflow-x-hidden md:p-6">
      <header className="bg-white/5 border-b border-white/10 p-4 md:rounded-2xl flex justify-between items-center shrink-0 gap-4">
        <button 
          onClick={() => console.log("Redirigir a listado")} 
          className="flex items-center gap-2 text-white/60 hover:text-white font-bold text-sm px-3 py-2 rounded-xl hover:bg-white/5 transition-all"
        >
          <ArrowLeft size={18} />
          <span className="hidden sm:inline">Salir</span>
        </button>

        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-2 py-1">
          <select 
            value={sportId} 
            onChange={(e) => { setSportId(e.target.value); setHistory([]); }}
            className="bg-transparent text-xs font-black uppercase tracking-wider text-center text-white focus:outline-none cursor-pointer py-1 px-2"
          >
            <option value={SPORT_IDS.FUTBOL} className="bg-[#0A0F24]">Fútbol</option>
            <option value={SPORT_IDS.BASQUET} className="bg-[#0A0F24]">Básquetbol</option>
            <option value={SPORT_IDS.VOLEY} className="bg-[#0A0F24]">Vóleibol</option>
          </select>
        </div>

        <button 
          onClick={handleFinalizeMatch}
          className="flex items-center gap-2 bg-emerald-600 text-white font-black text-xs md:text-sm px-4 py-2.5 rounded-xl hover:bg-emerald-500 shadow-lg shadow-emerald-900/20 active:scale-95 transition-all"
        >
          <CheckCircle size={16} />
          <span>Finalizar</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col justify-between p-4 md:p-8 max-w-7xl w-full mx-auto gap-6">
        <section className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-4 md:p-8 flex flex-col justify-center items-center gap-6 shadow-2xl">
          <div className="w-full flex items-center justify-between text-center gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="text-blue-400 shrink-0" size={18} />
                <h2 className="text-lg md:text-3xl font-black tracking-tight truncate text-white/90">{leftData.name}</h2>
              </div>
              {sportId === SPORT_IDS.VOLEY && (
                <div className="inline-flex flex-col items-center bg-white/5 border border-white/10 rounded-2xl p-2 min-w-[90px]">
                  <span className="text-[9px] font-black tracking-widest text-white/40 uppercase">Sets</span>
                  <span className="text-2xl font-black text-blue-400">{leftData.sets}</span>
                </div>
              )}
            </div>

            <div className="px-4 shrink-0 flex flex-col items-center justify-center">
              <span className="text-xs font-black tracking-widest text-white/20 italic bg-white/5 px-3 py-1 rounded-full border border-white/5">
                {sportId === SPORT_IDS.VOLEY ? `SET ${setNumber}` : sportId === SPORT_IDS.BASQUET ? `C${setNumber}` : "TR"}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="text-rose-400 shrink-0" size={18} />
                <h2 className="text-lg md:text-3xl font-black tracking-tight truncate text-white/90">{rightData.name}</h2>
              </div>
              {sportId === SPORT_IDS.VOLEY && (
                <div className="inline-flex flex-col items-center bg-white/5 border border-white/10 rounded-2xl p-2 min-w-[90px]">
                  <span className="text-[9px] font-black tracking-widest text-white/40 uppercase">Sets</span>
                  <span className="text-2xl font-black text-rose-400">{rightData.sets}</span>
                </div>
              )}
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row items-center justify-center md:gap-12 gap-8 my-auto">
            <div className="flex-1 flex flex-col items-center w-full">
              <div className="text-8xl sm:text-9xl lg:text-[13rem] font-black leading-none tracking-tighter tabular-nums text-white drop-shadow-2xl">
                {leftData.score}
              </div>
              <div className="w-full max-w-xs mt-6 flex flex-col gap-2">
                {sportId === SPORT_IDS.BASQUET ? (
                  <div className="grid grid-cols-3 gap-2">
                    <button onClick={() => handleScoreUpdate(leftData.label as any, 1, "INCREMENT")} className="bg-white/5 border border-white/10 text-white py-3.5 rounded-xl font-black text-lg hover:bg-white/10 active:scale-95 transition-all">+1</button>
                    <button onClick={() => handleScoreUpdate(leftData.label as any, 2, "INCREMENT")} className="bg-white/5 border border-white/10 text-white py-3.5 rounded-xl font-black text-lg hover:bg-white/10 active:scale-95 transition-all">+2</button>
                    <button onClick={() => handleScoreUpdate(leftData.label as any, 3, "INCREMENT")} className="bg-blue-600 text-white py-3.5 rounded-xl font-black text-lg hover:bg-blue-500 active:scale-95 transition-all">+3</button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleScoreUpdate(leftData.label as any, 1, "DECREMENT")} 
                      disabled={leftData.score === 0}
                      className="w-14 bg-white/5 border border-white/10 text-white/50 rounded-xl font-black text-xl flex items-center justify-center hover:bg-white/10 disabled:opacity-10 transition-all"
                    >
                      -
                    </button>
                    <button onClick={() => handleScoreUpdate(leftData.label as any, 1, "INCREMENT")} className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-black text-sm tracking-wider hover:bg-blue-500 active:scale-95 transition-all">
                      +1 {sportId === SPORT_IDS.VOLEY ? "PUNTO" : "GOL"}
                    </button>
                  </div>
                )}
                {sportId === SPORT_IDS.VOLEY && (
                  <button onClick={() => handleAddSet(leftData.label as any)} className="w-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-black uppercase tracking-widest py-2.5 rounded-xl hover:bg-blue-500 hover:text-white transition-all">
                    Ganar Set
                  </button>
                )}
              </div>
            </div>

            <div className="hidden md:flex flex-col items-center gap-4 shrink-0">
              <button 
                onClick={handleUndo}
                disabled={history.length === 0}
                className="w-12 h-12 bg-white/5 border border-white/10 text-white/70 rounded-xl flex items-center justify-center hover:bg-white/10 active:scale-95 disabled:opacity-20 disabled:pointer-events-none transition-all"
              >
                <RotateCcw size={18} />
              </button>
              <button 
                onClick={() => setIsSwapped(!isSwapped)}
                className="w-12 h-12 bg-white/5 border border-white/10 text-white/70 rounded-xl flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all"
              >
                <ArrowRightLeft size={18} />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center w-full">
              <div className="text-8xl sm:text-9xl lg:text-[13rem] font-black leading-none tracking-tighter tabular-nums text-white drop-shadow-2xl">
                {rightData.score}
              </div>
              <div className="w-full max-w-xs mt-6 flex flex-col gap-2">
                {sportId === SPORT_IDS.BASQUET ? (
                  <div className="grid grid-cols-3 gap-2">
                    <button onClick={() => handleScoreUpdate(rightData.label as any, 1, "INCREMENT")} className="bg-white/5 border border-white/10 text-white py-3.5 rounded-xl font-black text-lg hover:bg-white/10 active:scale-95 transition-all">+1</button>
                    <button onClick={() => handleScoreUpdate(rightData.label as any, 2, "INCREMENT")} className="bg-white/5 border border-white/10 text-white py-3.5 rounded-xl font-black text-lg hover:bg-white/10 active:scale-95 transition-all">+2</button>
                    <button onClick={() => handleScoreUpdate(rightData.label as any, 3, "INCREMENT")} className="bg-rose-600 text-white py-3.5 rounded-xl font-black text-lg hover:bg-rose-500 active:scale-95 transition-all">+3</button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleScoreUpdate(rightData.label as any, 1, "DECREMENT")} 
                      disabled={rightData.score === 0}
                      className="w-14 bg-white/5 border border-white/10 text-white/50 rounded-xl font-black text-xl flex items-center justify-center hover:bg-white/10 disabled:opacity-10 transition-all"
                    >
                      -
                    </button>
                    <button onClick={() => handleScoreUpdate(rightData.label as any, 1, "INCREMENT")} className="flex-1 bg-rose-600 text-white py-4 rounded-xl font-black text-sm tracking-wider hover:bg-rose-500 active:scale-95 transition-all">
                      +1 {sportId === SPORT_IDS.VOLEY ? "PUNTO" : "GOL"}
                    </button>
                  </div>
                )}
                {sportId === SPORT_IDS.VOLEY && (
                  <button onClick={() => handleAddSet(rightData.label as any)} className="w-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-black uppercase tracking-widest py-2.5 rounded-xl hover:bg-rose-500 hover:text-white transition-all">
                    Ganar Set
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="flex md:hidden items-center justify-center gap-4 bg-white/5 border border-white/10 p-3 rounded-2xl w-full max-w-xs mx-auto shrink-0">
          <button 
            onClick={handleUndo}
            disabled={history.length === 0}
            className="flex-1 py-3 bg-white/5 text-white/80 border border-white/10 rounded-xl flex items-center justify-center gap-2 text-xs font-bold hover:bg-white/10 disabled:opacity-20 transition-all"
          >
            <RotateCcw size={16} />
            <span>Deshacer</span>
          </button>
          <button 
            onClick={() => setIsSwapped(!isSwapped)}
            className="flex-1 py-3 bg-white/5 text-white/80 border border-white/10 rounded-xl flex items-center justify-center gap-2 text-xs font-bold hover:bg-white/10 transition-all"
          >
            <ArrowRightLeft size={16} />
            <span>Invertir Lado</span>
          </button>
        </section>
      </main>
    </div>
  );
};

export default MatchScoringPage;