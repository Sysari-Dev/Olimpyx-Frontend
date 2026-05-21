import { useParams } from "react-router-dom";
import { useTournamentResults } from "../hooks/useTournamentResults";
import { LoadingState } from "@atoms/LoadingState";
import { GroupStandingsTable } from "@molecules/GroupStandingsTable";
import { KnockoutSummary } from "@molecules/KnockoutSummary";
import MatchCard from "@molecules/MatchCard";

export const TournamentDetailSection = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useTournamentResults(id!);

  const FORMAT_TRANSLATION: Record<string, string> = {
    ROUND_ROBIN: "Todos contra Todos",
    GROUP_STAGE: "Fase de Grupos",
    ELIMINATION: "Eliminación Directa",
  };

  if (isLoading) return <LoadingState text="Cargando datos..." />;
  if (!data) return <div className="p-20 text-center">Torneo no encontrado</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 pt-8 pb-20 animate-fade-in">
      {/* Título Principal */}
      <h1 className="text-4xl font-black text-dark mb-10 tracking-tighter">
        Formato:{" "}
        <span className="text-accent">
          {FORMAT_TRANSLATION[data.format] || data.format}
        </span>
      </h1>

      {/* --- SECCIÓN SUPERIOR: POSICIONES --- */}
      <section className="mb-16">
        <h3 className="text-2xl font-black text-dark mb-6 tracking-tight">Posiciones</h3>

        {/* ROUND_ROBIN: tabla única */}
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

        {/* GROUP_STAGE: una tabla por grupo, apiladas */}
        {data.format === "GROUP_STAGE" && (
          <div className="flex flex-col gap-8">
            {data.groups?.map((g) => (
              <GroupStandingsTable
                key={g.id}
                groupName={g.name}
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

        {/* ELIMINATION: bracket, ancho completo */}
        {data.format === "ELIMINATION" && data.matches && (() => {
          const roundsMap = new Map<string, typeof data.matches>();
          data.matches.forEach((m) => {
            if (!roundsMap.has(m.roundName)) roundsMap.set(m.roundName, []);
            roundsMap.get(m.roundName)!.push(m);
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

      {/* --- SECCIÓN INFERIOR: PARTIDOS --- */}
      <section>
        <h3 className="text-2xl font-black text-dark mb-6 tracking-tight">Partidos</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.matches?.map((m) => (
            <MatchCard
              key={m.id}
              id={m.id}
              event="Torneo"
              sport=""
              team1={m.team1?.name ?? "TBD"}
              team2={m.team2?.name ?? "TBD"}
              score1={m.scoreTeam1 ?? 0}
              score2={m.scoreTeam2 ?? 0}
              currentPeriod={m.roundName}
              sets={m.sets}
              status={m.status as "FINISHED" | "PENDING" | "IN_PROGRESS"}
              isVoley={true}
            />
          ))}
        </div>
      </section>
    </div>
  );
};