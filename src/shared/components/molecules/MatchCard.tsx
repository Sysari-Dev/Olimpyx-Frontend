import { Link } from "react-router-dom";
import { Trophy, Dribbble } from "lucide-react";
import LiveBadge from "@atoms/LiveBadge";
import { SPORT_IDS } from "@constants/sport-ids.constant";

interface MatchCardProps {
  id: string;
  event: string;
  sport: string;
  sportId: string;
  team1: string;
  team2: string;
  score1: number;
  score2: number;
  currentPeriod: string;
  sets?: { pointsTeam1: number | null; pointsTeam2: number | null }[];
  status: string;
}

const STATUS_LABELS: Record<string, string> = {
  FINISHED: "Finalizado",
  PENDING: "Por Jugar",
  SUSPENDED: "Suspendido",
  IN_PROGRESS: "En Vivo",
};

const STATUS_COLORS: Record<string, string> = {
  FINISHED: "bg-dark/5 text-dark/40 border-dark/10",
  PENDING: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  SUSPENDED: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  IN_PROGRESS: "bg-red-500 text-white border-transparent",
};

export const MatchCard = ({
  id,
  event,
  sport,
  sportId,
  team1,
  team2,
  score1,
  score2,
  currentPeriod,
  sets,
  status,
}: MatchCardProps) => {
  const statusLabel = STATUS_LABELS[status] || status;
  const statusColor = STATUS_COLORS[status] || "bg-dark/5 text-dark/40";

  const isVoley = sportId === SPORT_IDS.VOLEY;
  const isBasquet = sportId === SPORT_IDS.BASQUET;
  const isFutbol = sportId === SPORT_IDS.FUTBOL;
  const isFutsal = sportId === SPORT_IDS.FUTSAL;

  const voleySetsTeam1 = isVoley
    ? sets?.filter((s) => (s.pointsTeam1 ?? 0) > (s.pointsTeam2 ?? 0)).length || 0
    : 0;
  const voleySetsTeam2 = isVoley
    ? sets?.filter((s) => (s.pointsTeam2 ?? 0) > (s.pointsTeam1 ?? 0)).length || 0
    : 0;

  const displayScore1 = isVoley ? voleySetsTeam1 : score1;
  const displayScore2 = isVoley ? voleySetsTeam2 : score2;

  const getSportIcon = () => {
    if (isBasquet) {
      return <Dribbble size={15} className="text-orange-500 fill-orange-500/10" />;
    }
    if (isVoley) {
      return <Dribbble size={15} className="text-sky-400 fill-sky-400/10 -rotate-45" />;
    }
    if (isFutbol) {
      return <Dribbble size={15} className="text-green-500 fill-green-500/10 rotate-12" />;
    }
    if (isFutsal) {
      return <Dribbble size={15} className="text-teal-400 fill-teal-400/10 rotate-45" />;
    }
    return <Trophy size={14} className="text-dark/40" />;
  };

  return (
    <Link
      to={`/partido/${id}`}
      draggable="false"
      style={{ touchAction: "pan-y" }}
      className="block bg-white border border-dark/10 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-primary transition-all group relative overflow-hidden text-dark"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-primary/10 group-hover:bg-primary transition-colors" />

      <div className="mb-1 truncate pr-16">
        <span className="text-[9px] font-black text-primary uppercase tracking-widest block truncate">
          {event}
        </span>
      </div>

      <div className="flex justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-2 min-w-0">
          <div className="shrink-0 flex items-center justify-center">
            {getSportIcon()}
          </div>
          <span className="text-[11px] font-black text-dark/60 uppercase tracking-wider truncate">
            {sport}
          </span>
        </div>

        <div className="shrink-0">
          {status === "IN_PROGRESS" ? (
            <LiveBadge />
          ) : (
            <span className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider border ${statusColor}`}>
              {statusLabel}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 w-full">
        <div className="flex-1 min-w-0 text-center flex flex-col items-center">
          <div className="w-12 h-12 bg-dark/5 border border-dark/5 rounded-full flex items-center justify-center font-black text-dark/20 text-xl group-hover:text-primary/30 transition-colors mb-2 shrink-0">
            {team1[0] || "?"}
          </div>
          <p className="text-xs font-bold text-dark truncate w-full px-1">{team1}</p>
        </div>

        <div className="flex flex-col items-center shrink-0 px-2 min-w-25]">
          <div className="text-3xl font-black text-dark flex gap-2.5 italic tracking-tighter tabular-nums">
            <span className={displayScore1 >= displayScore2 ? "text-dark" : "text-dark/30"}>
              {displayScore1}
            </span>
            <span className="text-dark/10 not-italic">-</span>
            <span className={displayScore2 >= displayScore1 ? "text-dark" : "text-dark/30"}>
              {displayScore2}
            </span>
          </div>

          {currentPeriod && (
            <div className="mt-2 shrink-0">
              <span className="text-[9px] font-black text-white bg-dark px-2 py-0.5 rounded-md uppercase tracking-wider">
                {currentPeriod}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 text-center flex flex-col items-center">
          <div className="w-12 h-12 bg-dark/5 border border-dark/5 rounded-full flex items-center justify-center font-black text-dark/20 text-xl group-hover:text-primary/30 transition-colors mb-2 shrink-0">
            {team2[0] || "?"}
          </div>
          <p className="text-xs font-bold text-dark truncate w-full px-1">{team2}</p>
        </div>
      </div>

      {sets && sets.length > 0 && (isVoley || isBasquet) && (
        <div className="mt-4 pt-4 border-t border-dark/5">
          <div className="flex justify-center gap-1.5 flex-wrap">
            {sets.map((set, i) => (
              <div key={i} className="flex flex-col items-center bg-dark/2 border border-dark/5 px-2 py-1 rounded-lg min-w-10.5 max-w-12.5">
                <span className="text-[8px] font-black text-dark/30 uppercase tracking-wider">
                  {isVoley ? `S${i + 1}` : `C${i + 1}`}
                </span>
                <span className="text-xs font-black text-dark/70 tabular-nums">
                  {set.pointsTeam1 ?? 0}-{set.pointsTeam2 ?? 0}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-5 pt-3 border-t border-dark/5 flex justify-between items-center select-none">
        <span className="text-[9px] font-bold text-dark/30 uppercase tracking-wider italic">Olimpix Live Report</span>
      </div>
    </Link>
  );
};

export default MatchCard;