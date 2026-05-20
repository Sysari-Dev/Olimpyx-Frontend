import { useParams } from "react-router-dom";
import { useTournamentResults } from "../hooks/useTournamentResults";
import { LoadingState } from "@atoms/LoadingState";
import { GroupStandingsTable } from "@molecules/GroupStandingsTable";
import { KnockoutSummary } from "@molecules/KnockoutSummary";
import MatchCard from "@molecules/MatchCard"; 

export const TournamentDetailSection = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useTournamentResults(id!);

  if (isLoading) return <LoadingState text="Cargando datos..." />;
  if (!data) return <div className="p-20 text-center">Torneo no encontrado</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 pt-8 pb-20 animate-fade-in">
      <h1 className="text-4xl font-black text-dark mb-10 tracking-tighter">
        Formato: <span className="text-accent">{data.format}</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* COLUMNA DERECHA (Ahora Izquierda): TABLAS O LLAVES */}
        <div className="lg:col-span-1 space-y-6">
          <h3 className="text-2xl font-black text-dark mb-6 tracking-tight">Posiciones</h3>
          
          {data.format === "ROUND_ROBIN" && data.leaderboard && (
            <GroupStandingsTable 
              groupName="Tabla General" 
              teams={data.leaderboard.map(t => ({ 
                id: t.teamId, name: t.teamName, played: t.played, 
                won: t.wins, drawn: t.draws, lost: t.losses, points: t.points 
              }))} 
            />
          )}

          {data.format === "GROUP_STAGE" && data.groups?.map(g => (
            <GroupStandingsTable 
              key={g.id} 
              groupName={g.name} 
              teams={g.leaderboard.map(t => ({ 
                id: t.teamId, name: t.teamName, played: t.played, 
                won: t.wins, drawn: t.draws, lost: t.losses, points: t.points 
              }))} 
            />
          ))}

          {data.format === "ELIMINATION" && data.matches?.map(m => (
            <KnockoutSummary 
              key={m.id} 
              stageName={m.roundName} 
              matchups={[{
                id: m.id,
                team1: m.team1?.name ?? "N/A",
                team2: m.team2?.name ?? "N/A",
                status: m.status === "FINISHED" ? "FINISHED" : "PENDING"
              }]} 
            />
          ))}
        </div>

        {/* COLUMNA IZQUIERDA (Ahora Derecha): PARTIDOS */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-2xl font-black text-dark mb-6 tracking-tight">Partidos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.matches?.map((m) => (
              <MatchCard 
                key={m.id}
                id={m.id}
                event="Torneo"
                sport="General"
                team1={m.team1?.name ?? "TBD"}
                team2={m.team2?.name ?? "TBD"}
                score1={0}
                score2={0}
                currentPeriod={m.roundName}
                // Si el MatchCard da error por 'status', eliminalo de aquí
                // o asegúrate de que exista en 'src/shared/components/molecules/MatchCard.tsx'
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};