import { Trophy } from "lucide-react";

interface Matchup {
  id: string;
  team1: string;
  team2: string;
  score1?: number;
  score2?: number;
  status: "PENDING" | "FINISHED";
}

interface Round {
  stageName: string;
  matchups: Matchup[];
}

interface KnockoutBracketProps {
  rounds: Round[];
}

// Tarjeta individual de un enfrentamiento
const MatchupCard = ({ match }: { match: Matchup }) => {
  const team1Wins =
    match.status === "FINISHED" &&
    match.score1 !== undefined &&
    match.score2 !== undefined &&
    match.score1 > match.score2;

  const team2Wins =
    match.status === "FINISHED" &&
    match.score1 !== undefined &&
    match.score2 !== undefined &&
    match.score2 > match.score1;

  return (
    <div className="flex flex-col w-36 min-w-[9rem] rounded overflow-hidden border border-white/10 shadow-lg text-xs font-bold">
      {/* Team 1 */}
      <div
        className={`flex justify-between items-center px-2 py-1.5 border-b border-white/10 ${
          team1Wins ? "bg-primary/20 text-primary" : "bg-[#1e1e1e] text-light"
        }`}
      >
        <span className="truncate pr-1">{match.team1 || "TBD"}</span>
        <span className={`ml-auto shrink-0 ${team1Wins ? "text-primary" : "text-white/40"}`}>
          {match.status === "FINISHED" }
        </span>
      </div>
      {/* Team 2 */}
      <div
        className={`flex justify-between items-center px-2 py-1.5 ${
          team2Wins ? "bg-primary/20 text-primary" : "bg-[#1e1e1e] text-light"
        }`}
      >
        <span className="truncate pr-1">{match.team2 || "TBD"}</span>
        <span className={`ml-auto shrink-0 ${team2Wins ? "text-primary" : "text-white/40"}`}>
          {match.status === "FINISHED" }
        </span>
      </div>
    </div>
  );
};

// Columna de una ronda con sus partidos espaciados
const RoundColumn = ({
  round,
  totalRounds,
  roundIndex,
}: {
  round: Round;
  totalRounds: number;
  roundIndex: number;
}) => {
  const isFinal = roundIndex === totalRounds - 1;

  return (
    <div className="flex flex-col items-center gap-0 relative">
      {/* Título de la ronda */}
      <div className="flex items-center gap-1 mb-4 text-[10px] font-black uppercase tracking-widest text-dark/40">
        {isFinal && <Trophy size={10} className="text-accent" />}
        <span>{round.stageName}</span>
      </div>

      {/* Partidos con espaciado exponencial */}
      <div
        className="flex flex-col items-center justify-center"
        style={{ gap: `${Math.pow(2, roundIndex) * 1.5}rem` }}
      >

        {round.matchups.map((match) => (
          <div key={match.id} className="flex items-center">
            <MatchupCard match={match} />
          </div>
        ))}
      </div>
    </div>
  );
};

export const KnockoutSummary = ({ rounds }: KnockoutBracketProps) => {
  if (!rounds || rounds.length === 0) return null;

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex items-center min-w-max mx-auto w-fit">
        {rounds.map((round, rIdx) => (
          <div key={rIdx} className="flex items-start">
            {/* Columna de la ronda */}
            <RoundColumn
              round={round}
              totalRounds={rounds.length}
              roundIndex={rIdx}
            />

            {/* Conector SVG entre rondas */}
            {rIdx < rounds.length - 1 && (
              <BracketConnector
                matchCount={round.matchups.length}
                roundIndex={rIdx}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Conector de llaves entre dos rondas
const BracketConnector = ({
  matchCount,
  roundIndex,
}: {
  matchCount: number;
  roundIndex: number;
}) => {
  const cardHeight = 56; // px aprox de cada tarjeta
  const gap = Math.pow(2, roundIndex) * 24; // gap en px (1.5rem * factor)
  const pairHeight = cardHeight * 2 + gap;
  const connectorHeight = pairHeight;
  const pairs = Math.ceil(matchCount / 2);

  return (
    <div
      className="flex flex-col"
      style={{ marginTop: "2rem" /* offset del título */ }}
    >
      <div
        className="flex flex-col"
        style={{ gap: `${Math.pow(2, roundIndex) * 1.5}rem` }}
      >
        {Array.from({ length: pairs }).map((_, i) => (
          <svg
            key={i}
            width="32"
            height={connectorHeight}
            viewBox={`0 0 32 ${connectorHeight}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Línea saliendo del primer equipo del par */}
            <line
              x1="0"
              y1={cardHeight / 2}
              x2="16"
              y2={cardHeight / 2}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1.5"
            />
            {/* Línea saliendo del segundo equipo del par */}
            <line
              x1="0"
              y1={connectorHeight - cardHeight / 2}
              x2="16"
              y2={connectorHeight - cardHeight / 2}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1.5"
            />
            {/* Línea vertical que une ambos */}
            <line
              x1="16"
              y1={cardHeight / 2}
              x2="16"
              y2={connectorHeight - cardHeight / 2}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1.5"
            />
            {/* Línea horizontal hacia la siguiente ronda */}
            <line
              x1="16"
              y1={connectorHeight / 2}
              x2="32"
              y2={connectorHeight / 2}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1.5"
            />
          </svg>
        ))}
      </div>
    </div>
  );
};