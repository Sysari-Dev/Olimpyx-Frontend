import { Shield } from "lucide-react";

interface TeamScorePanelProps {
  name: string;
  score: number;
  sets: number;
  color: string;
  btnColor: string;
  isVoley: boolean;
  isBasquet: boolean;
  disabled: boolean;
  isSetWinDisabled?: boolean;
  onScoreChange: (points: number, operation: "INCREMENT" | "DECREMENT") => void;
  onSetWin?: () => void;
}

export const TeamScorePanel = ({
  name,
  score,
  sets,
  color,
  btnColor,
  isVoley,
  isBasquet,
  disabled,
  isSetWinDisabled = false,
  onScoreChange,
  onSetWin,
}: TeamScorePanelProps) => {
  
  const disabledClasses = disabled ? "opacity-30 cursor-not-allowed grayscale" : "hover:brightness-110 active:scale-95 cursor-pointer";

  return (
    <div className="flex-1 flex flex-col items-center w-full">
      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Shield className={color} size={18} />
          <h2 className="text-lg md:text-3xl font-black tracking-tight truncate max-w-50 sm:max-w-xs text-white/90">
            {name}
          </h2>
        </div>
        {isVoley && (
          <div className="inline-flex flex-col items-center bg-white/5 border border-white/10 rounded-2xl p-2 min-w-22.5">
            <span className="text-[9px] font-black tracking-widest text-white/40 uppercase">Sets</span>
            <span className={`text-2xl font-black ${color}`}>{sets}</span>
          </div>
        )}
      </div>
      <div className="text-8xl sm:text-9xl lg:text-[13rem] font-black leading-none tracking-tighter tabular-nums text-white drop-shadow-2xl">
        {score}
      </div>
      <div className="w-full max-w-xs mt-6 flex flex-col gap-2">
        {isBasquet ? (
          <div className="grid grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => onScoreChange(1, "DECREMENT")}
              disabled={disabled || score === 0}
              className={`bg-white/5 border border-white/10 text-white/50 rounded-xl font-black text-xl flex items-center justify-center transition-all ${disabled || score === 0 ? "opacity-20 cursor-not-allowed" : "hover:bg-white/10 cursor-pointer"}`}
            >
              -
            </button>
            {[1, 2, 3].map((pts) => (
              <button 
                key={pts}
                type="button"
                onClick={() => onScoreChange(pts, "INCREMENT")} 
                disabled={disabled}
                className={`bg-white/5 border border-white/10 text-white py-3.5 rounded-xl font-black text-lg transition-all ${pts === 3 ? btnColor : ''} ${disabledClasses}`}
              >
                +{pts}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onScoreChange(1, "DECREMENT")}
              disabled={disabled || score === 0}
              className={`w-14 bg-white/5 border border-white/10 text-white/50 rounded-xl font-black text-xl flex items-center justify-center transition-all ${disabled || score === 0 ? "opacity-20 cursor-not-allowed" : "hover:bg-white/10 cursor-pointer"}`}
            >
              -
            </button>
            <button 
              type="button"
              onClick={() => onScoreChange(1, "INCREMENT")} 
              disabled={disabled}
              className={`flex-1 ${btnColor} text-white py-4 rounded-xl font-black text-sm tracking-wider transition-all ${disabledClasses}`}
            >
              +1 {isVoley ? "PUNTO" : "GOL"}
            </button>
          </div>
        )}
        {isVoley && onSetWin && (
          <button 
            type="button"
            onClick={onSetWin} 
            disabled={disabled || isSetWinDisabled}
            className={`w-full bg-white/5 border border-white/10 ${color} text-[10px] font-black uppercase tracking-widest py-2.5 rounded-xl transition-all ${disabled || isSetWinDisabled ? "opacity-20 cursor-not-allowed grayscale" : "hover:bg-white/10 cursor-pointer"}`}
          >
            Ganar Set
          </button>
        )}
      </div>
    </div>
  );
};