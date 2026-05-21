import { useParams } from "react-router-dom";
import { useTournamentResults } from "../hooks/useTournamentResults";
import { LoadingState } from "@atoms/LoadingState";
import { GroupStandingsTable } from "@molecules/GroupStandingsTable";
import { KnockoutSummary } from "@molecules/KnockoutSummary";
import { MatchCard } from "@molecules/MatchCard";
import { Trophy, Activity, Calendar, Award } from "lucide-react";

export const TournamentDetailSection = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useTournamentResults(id!);

  const FORMAT_TRANSLATION: Record<string, string> = {
    ROUND_ROBIN: "Todos contra Todos (Liga)",
    GROUP_STAGE: "Fase de Grupos",
    ELIMINATION: "Eliminación Directa (Playoffs)",
  };

  if (isLoading) return <LoadingState variant="tertiary" text="Cargando fixture y estadísticas oficiales..." />;
  if (!data) return <div className="p-20 text-center font-bold text-dark">Torneo no encontrado</div>;

  const firstMatch = data.matches?.[0];
  const tournamentName = firstMatch?.tournament?.name || "Resultados del Torneo";
  const sportName = firstMatch?.tournament?.sport?.name || "Disciplina General";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-20 space-y-10 animate-in fade-in duration-500 text-dark">
      <header className="bg-white border border-dark/10 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-primary/5 to-transparent pointer-events-none" />
        <div className="space-y-2">
          <div className="flex items-center gap-2 select-none">
            <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
              <Trophy size={14} />
            </div>
            <span className="text-[10px] font-black uppercase text-primary tracking-widest">
              {sportName}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tighter">
            {tournamentName}
          </h1>
        </div>
        <div className="flex flex-wrap gap-3 mt-1 md:mt-0">
          <div className="bg-dark/2 border border-dark/5 px-3 py-1.5 rounded-xl flex items-center gap-2">
            <Award size={14} className="text-tertiary" />
            <span className="text-xs font-bold text-dark/70">
              {FORMAT_TRANSLATION[data.format] || data.format}
            </span>
          </div>
          <div className="bg-dark/2 border border-dark/5 px-3 py-1.5 rounded-xl flex items-center gap-2">
            <Calendar size={14} className="text-accent" />
            <span className="text-xs font-bold text-dark/70">
              {data.matches?.length || 0} Partidos
            </span>
          </div>
        </div>
      </header>

      {data.format !== "ELIMINATION" && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <Activity size={16} className="text-primary" />
            <h3 className="text-xs font-black uppercase tracking-wider text-dark/60">
              Tabla de Posiciones
            </h3>
          </div>
          {data.format === "ROUND_ROBIN" && data.leaderboard && (
            <GroupStandingsTable
              groupName="Tabla General"
              teams={data.leaderboard.map((t) => ({
                id: t.teamId, name: t.teamName, played: t.played,
                won: t.wins, drawn: t.draws, lost: t.losses,
                goalsFor: t.goalsFor, goalsAgainst: t.goalsAgainst,
                goalDifference: t.goalDifference, points: t.points,
              }))}
            />
          )}
          {data.format === "GROUP_STAGE" && (
            <div className="flex flex-col gap-8">
              {data.groups?.map((g) => (
                <GroupStandingsTable
                  key={g.id}
                  groupName={g.name || "Grupo"}
                  teams={g.leaderboard.map((t) => ({
                    id: t.teamId, name: t.teamName, played: t.played,
                    won: t.wins, drawn: t.draws, lost: t.losses,
                    goalsFor: t.goalsFor, goalsAgainst: t.goalsAgainst,
                    goalDifference: t.goalDifference, points: t.points,
                  }))}
                />
              ))}
            </div>
          )}
        </section>
      )}
      {data.format === "ELIMINATION" && data.matches && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <Trophy size={16} className="text-primary" />
            <h3 className="text-xs font-black uppercase tracking-wider text-dark/60">
              Cuadro Eliminatorio
            </h3>
          </div>
          {(() => {
            const roundsMap = new Map<string, typeof data.matches>();
            data.matches.forEach((m) => {
              const rName = m.roundName || "Ronda";
              if (!roundsMap.has(rName)) roundsMap.set(rName, []);
              roundsMap.get(rName)!.push(m);
            });
            const rounds = Array.from(roundsMap.entries()).map(([stageName, matches]) => ({
              stageName,
              matchups: matches.map((m) => ({
                id: m.id,
                team1: m.team1?.name ?? "TBD",
                team2: m.team2?.name ?? "TBD",
                score1: m.scoreTeam1,
                score2: m.scoreTeam2,
                status: (m.status === "FINISHED" ? "FINISHED" : "PENDING") as "FINISHED" | "PENDING",
              })),
            }));
            return <KnockoutSummary rounds={rounds} />;
          })()}
        </section>
      )}
      <section className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <Calendar size={16} className="text-primary" />
          <h3 className="text-xs font-black uppercase tracking-wider text-dark/60">
            Calendario de Partidos (Fixture)
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.matches?.map((m) => (
            <MatchCard
              key={m.id}
              id={m.id}
              event={m.group?.name || m.stage?.name || "Fase de Juego"}
              sport={m.tournament?.sport?.name || ""}
              sportId={m.tournament?.sport?.id || ""}
              team1={m.team1?.name ?? "Por definir"}
              team2={m.team2?.name ?? "Por definir"}
              score1={m.scoreTeam1 ?? 0}
              score2={m.scoreTeam2 ?? 0}
              currentPeriod={m.roundName || ""}
              sets={m.sets}
              status={m.status}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default TournamentDetailSection;