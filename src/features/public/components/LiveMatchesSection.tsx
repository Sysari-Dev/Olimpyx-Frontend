import MatchCard from "@molecules/MatchCard";
import { useLiveMatches } from "../hooks/useLiveMatches";
import { LoadingState } from "@atoms/LoadingState";

export const LiveMatchesSection = () => {
  const { matches, isLoading } = useLiveMatches();

  if (isLoading) return <LoadingState variant="tertiary" text="Buscando partidos en vivo..." />;

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 animate-fade-in">
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-black text-dark tracking-tighter">
          Partidos <span className="text-accent">en Vivo</span>
        </h1>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches?.map((m) => (
          <MatchCard 
            key={m.id}
            id={m.id}
            event={m.tournament.name}
            sport={m.tournament.sport.name}
            team1={m.team1.name}
            team2={m.team2.name}
            score1={m.scoreTeam1}
            score2={m.scoreTeam2}
            currentPeriod={m.roundName}
            sets={m.sets}
            status="IN_PROGRESS"
          />
        ))}
      </div>
    </section>
  );
};

export default LiveMatchesSection;