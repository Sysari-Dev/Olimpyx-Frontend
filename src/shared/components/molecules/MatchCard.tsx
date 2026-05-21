import { Link } from "react-router-dom";
import LiveBadge from "@atoms/LiveBadge";
import { useVoleyScore } from "@hooks/useVoleyScore";

interface MatchCardProps {
  id: string;
  event: string;
  sport: string;
  team1: string;
  team2: string;
  score1: number;
  score2: number;
  currentPeriod: string;
  sets?: { pointsTeam1: number; pointsTeam2: number }[];
  status: 'FINISHED' | 'PENDING' | 'IN_PROGRESS' | string; // Ampliado para evitar el error de TypeScript
  isVoley?: boolean; // <-- NUEVA PROPIEDAD
}

const STATUS_LABELS: Record<string, string> = {
  FINISHED: "Finalizado",
  PENDING: "Por Jugar",
  LIVE: "En Vivo",
  IN_PROGRESS: "En Vivo",
};

const STATUS_COLORS: Record<string, string> = {
  FINISHED: "bg-gray-200 text-gray-600",
  PENDING: "bg-yellow-100 text-yellow-700",
  LIVE: "bg-red-500 text-white animate-pulse",
  IN_PROGRESS: "bg-red-500 text-white animate-pulse",
};

const MatchCard = ({ id, event, sport, team1, team2, score1, score2, currentPeriod, sets, status, isVoley }: MatchCardProps) => {
  const statusLabel = STATUS_LABELS[status] || status;
  const statusColor = STATUS_COLORS[status] || "bg-gray-100 text-gray-500";

  // 1. Calculamos los sets ganados usando tu nuevo hook
  const { setsTeam1, setsTeam2 } = useVoleyScore(sets);

  // 2. Decidimos qué puntuación mostrar: Sets (si es voley) o Puntos (si no lo es)
  const displayScore1 = isVoley ? setsTeam1 : score1;
  const displayScore2 = isVoley ? setsTeam2 : score2;

  return (
    <Link 
      to={`/partido/${id}`}
      draggable="false"
      style={{ touchAction: 'pan-y' }}
      className="block bg-white border border-light rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-accent/20 transition-all group relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-accent/10 group-hover:bg-accent/30 transition-colors" />
      
      <div className="mb-1">
        <span className="text-[9px] font-bold text-accent/60 uppercase tracking-[0.2em] leading-none">
          {event}
        </span>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className="w-1 h-3 bg-tertiary rounded-full" />
          <span className="text-[11px] font-black text-dark/80 uppercase tracking-wider">
            {sport}
          </span>
        </div>
        
        {/* Lógica de Badge Dinámico */}
        {status === 'IN_PROGRESS' || status === 'LIVE' ? (
          <LiveBadge />
        ) : (
          <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter ${statusColor}`}>
            {statusLabel}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 text-center">
          <div className="w-12 h-12 bg-light/50 border border-light rounded-full mx-auto mb-2 flex items-center justify-center font-black text-dark/20 text-xl group-hover:text-accent/30 transition-colors">
            {team1[0]}
          </div>
          <p className="text-xs font-bold text-dark truncate px-1">{team1}</p>
        </div>

        <div className="flex flex-col items-center px-2">
          {/* AQUÍ USAMOS displayScore1 y displayScore2 */}
          <div className="text-3xl font-black text-dark flex gap-3 italic tracking-tighter">
            <span className={displayScore1 > displayScore2 ? "text-dark" : "text-dark/40"}>{displayScore1}</span>
            <span className="text-dark/10">-</span>
            <span className={displayScore2 > displayScore1 ? "text-dark" : "text-dark/40"}>{displayScore2}</span>
          </div>
          
          <div className="mt-2">
            <span className="text-[9px] font-black text-white bg-dark px-2 py-0.5 rounded-md uppercase tracking-tighter">
              {currentPeriod}
            </span>
          </div>
        </div>

        <div className="flex-1 text-center">
          <div className="w-12 h-12 bg-light/50 border border-light rounded-full mx-auto mb-2 flex items-center justify-center font-black text-dark/20 text-xl group-hover:text-accent/30 transition-colors">
            {team2[0]}
          </div>
          <p className="text-xs font-bold text-dark truncate px-1">{team2}</p>
        </div>
      </div>

      {sets && sets.length > 0 && (
        <div className="mt-4 pt-4 border-t border-light/60">
          <div className="flex justify-center gap-2">
            {sets.map((set, i) => (
              <div key={i} className="flex flex-col items-center bg-light/50 px-2 py-1 rounded-md">
                <span className="text-[16px] font-bold text-dark/40 uppercase">S{i + 1}</span>
                <span className="text-[20px] font-black text-dark">{set.pointsTeam1}-{set.pointsTeam2}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-5 pt-4 border-t border-light/60 flex justify-between items-center">
        <span className="text-[10px] font-bold text-dark/30 uppercase italic">Olimpix Live Report</span>
      </div>
    </Link>
  );
};

export default MatchCard;