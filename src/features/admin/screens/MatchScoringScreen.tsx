import { useState } from "react";
import { ArrowLeft, RotateCcw, ArrowRightLeft, CheckCircle, Trophy } from "lucide-react";

const MATCH_DATA = {
  sport: "Basket", 
  teamA: "Ing. Sistemas",
  teamB: "Administración",
};

// Interfaz para la "foto" del historial
interface ScoreSnapshot {
  scoreA: number;
  scoreB: number;
  setsA: number;
  setsB: number;
}

export const MatchScoringScreen = () => {
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [setsA, setSetsA] = useState(0);
  const [setsB, setSetsB] = useState(0);
  const [isSwapped, setIsSwapped] = useState(false);
  
  const [history, setHistory] = useState<ScoreSnapshot[]>([]);
  const saveSnapshot = () => {
    setHistory(prev => [...prev, { scoreA, scoreB, setsA, setsB }]);
  };

  const addScore = (team: 'A'|'B', points: number) => {
    saveSnapshot();
    if (team === 'A') setScoreA(prev => Math.max(0, prev + points));
    else setScoreB(prev => Math.max(0, prev + points));
  };

  const addSet = (team: 'A'|'B') => {
    saveSnapshot();
    if (team === 'A') setSetsA(prev => prev + 1);
    else setSetsB(prev => prev + 1);
    setScoreA(0);
    setScoreB(0);
  };

  const undoLastAction = () => {
    if (history.length === 0) return;
    const lastSnapshot = history[history.length - 1];
    
    setScoreA(lastSnapshot.scoreA);
    setScoreB(lastSnapshot.scoreB);
    setSetsA(lastSnapshot.setsA);
    setSetsB(lastSnapshot.setsB);
    
    setHistory(prev => prev.slice(0, -1));
  };
  const leftTeam = isSwapped ? MATCH_DATA.teamB : MATCH_DATA.teamA;
  const rightTeam = isSwapped ? MATCH_DATA.teamA : MATCH_DATA.teamB;
  const leftScore = isSwapped ? scoreB : scoreA;
  const rightScore = isSwapped ? scoreA : scoreB;
  const leftSets = isSwapped ? setsB : setsA;
  const rightSets = isSwapped ? setsA : setsB;
  const leftId = isSwapped ? 'B' : 'A';
  const rightId = isSwapped ? 'A' : 'B';

  const isVoley = MATCH_DATA.sport === "Vóley";

  const renderSportControls = (team: 'A'|'B') => {
    if (MATCH_DATA.sport === "Basket") {
      return (
        <div className="flex gap-2 w-full max-w-xs mt-4">
          <button onClick={() => addScore(team, 1)} className="flex-1 bg-accent text-white py-4 rounded-2xl font-black text-xl hover:bg-accent/80 active:scale-95 transition-all">+1</button>
          <button onClick={() => addScore(team, 2)} className="flex-1 bg-accent text-white py-4 rounded-2xl font-black text-xl hover:bg-accent/80 active:scale-95 transition-all">+2</button>
          <button onClick={() => addScore(team, 3)} className="flex-1 bg-accent text-white py-4 rounded-2xl font-black text-xl hover:bg-accent/80 active:scale-95 transition-all">+3</button>
        </div>
      );
    }
    
    return (
      <div className="flex gap-2 w-full max-w-xs mt-4">
        <button onClick={() => addScore(team, -1)} disabled={team === 'A' ? scoreA === 0 : scoreB === 0} className="w-16 bg-white/5 text-white/50 py-6 rounded-3xl font-black text-2xl hover:bg-white/10 active:scale-95 transition-all disabled:opacity-20">-</button>
        <button onClick={() => addScore(team, 1)} className="flex-1 bg-accent text-white py-6 rounded-3xl font-black text-2xl hover:bg-accent/90 shadow-lg shadow-accent/20 active:scale-95 transition-all">
          +1 {isVoley ? "PUNTO" : "GOL"}
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0A0F24] text-white flex flex-col font-sans select-none overflow-hidden">
      
      <div className="bg-white/5 border-b border-white/10 p-4 flex justify-between items-center shrink-0">
        <button className="flex items-center gap-2 text-white/50 hover:text-white font-bold px-4 py-2 rounded-lg transition-colors">
          <ArrowLeft size={20} /> Salir
        </button>
        <div className="text-center">
          <span className="bg-white/10 text-white/80 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2">
            {isVoley && <Trophy size={14} className="text-accent"/>}
            {MATCH_DATA.sport}
          </span>
        </div>
        <button className="flex items-center gap-2 bg-accent text-white font-black px-6 py-2 rounded-xl hover:bg-accent/90 transition-colors">
          <CheckCircle size={18} /> Finalizar
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center px-8 lg:px-24 py-8">
        
        <div className="flex justify-between items-end mb-8 relative">
          
          <div className="flex-1 text-center">
            <h2 className="text-3xl lg:text-5xl font-black truncate w-full px-4 mb-4">{leftTeam}</h2>
            {isVoley && (
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs font-bold text-white/40 tracking-widest">SETS GANADOS</span>
                <div className="bg-white/10 border border-white/20 text-white font-black text-5xl px-8 py-3 rounded-2xl">
                  {leftSets}
                </div>
                <button onClick={() => addSet(leftId)} className="text-[10px] font-black uppercase tracking-widest bg-tertiary/20 text-tertiary border border-tertiary/30 px-4 py-1.5 rounded-lg hover:bg-tertiary hover:text-white transition-colors mt-2">
                  +1 Set
                </button>
              </div>
            )}
          </div>

          <div className="w-32 shrink-0 flex flex-col items-center justify-end pb-12">
            <div className="text-white/20 font-black text-3xl italic">VS</div>
          </div>

          <div className="flex-1 text-center">
            <h2 className="text-3xl lg:text-5xl font-black truncate w-full px-4 mb-4">{rightTeam}</h2>
            {isVoley && (
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs font-bold text-white/40 tracking-widest">SETS GANADOS</span>
                <div className="bg-white/10 border border-white/20 text-white font-black text-5xl px-8 py-3 rounded-2xl">
                  {rightSets}
                </div>
                <button onClick={() => addSet(rightId)} className="text-[10px] font-black uppercase tracking-widest bg-tertiary/20 text-tertiary border border-tertiary/30 px-4 py-1.5 rounded-lg hover:bg-tertiary hover:text-white transition-colors mt-2">
                  +1 Set
                </button>
              </div>
            )}
          </div>

        </div>

        <div className="flex items-center justify-between">
          
          <div className="flex-1 flex flex-col items-center">
            <div className="text-[10rem] lg:text-[16rem] font-black leading-none tracking-tighter tabular-nums text-white drop-shadow-2xl">
              {leftScore}
            </div>
            {renderSportControls(leftId)}
          </div>

          <div className="w-32 flex flex-col items-center gap-6 shrink-0 mt-8">
            <button 
              onClick={undoLastAction}
              disabled={history.length === 0}
              className="w-16 h-16 bg-white/10 text-white border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
              title="Deshacer última acción"
            >
              <RotateCcw size={24} />
            </button>
            
            <button 
              onClick={() => setIsSwapped(!isSwapped)}
              className="w-16 h-16 bg-white/10 text-white border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all"
              title="Cambiar de lado de cancha"
            >
              <ArrowRightLeft size={24} />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center">
            <div className="text-[10rem] lg:text-[16rem] font-black leading-none tracking-tighter tabular-nums text-white drop-shadow-2xl">
              {rightScore}
            </div>
            {renderSportControls(rightId)}
          </div>

        </div>

      </div>
    </div>
  );
};