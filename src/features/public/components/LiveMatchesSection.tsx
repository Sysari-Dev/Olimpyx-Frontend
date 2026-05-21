import { MatchCard } from "@molecules/MatchCard";
import { type LiveMatch } from "../models/public-api.model";

interface LiveMatchesSectionProps {
  matches: LiveMatch[];
}

export const LiveMatchesSection = ({ matches }: LiveMatchesSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {matches.map((m) => (
        <MatchCard 
          key={m.id}
          id={m.id}
          event={m.tournament.name}
          sport={m.tournament.sport.name}
          sportId={m.tournament.sport.id}
          team1={m.team1?.name || "Por definir"}
          team2={m.team2?.name || "Por definir"}
          score1={m.scoreTeam1}
          score2={m.scoreTeam2}
          currentPeriod={m.roundName || ""}
          sets={m.sets}
          status={m.status}
        />
      ))}
    </div>
  );
};

export default LiveMatchesSection;