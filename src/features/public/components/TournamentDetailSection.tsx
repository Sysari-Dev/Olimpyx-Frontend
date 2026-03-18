import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, LayoutGrid } from "lucide-react";
import MatchCard from "@molecules/MatchCard";
import { GroupStandingsTable } from "@molecules/GroupStandingsTable";
import { KnockoutSummary } from "@molecules/KnockoutSummary";

// --- MOCKS ACTUALIZADOS ---
const TOURNAMENTS_MOCK = [
  { id: "t1", name: "Futsal Varones", event: "Intercarreras UNAMBA", format: "Eliminación Directa" },
  { id: "t2", name: "Vóley Femenino", event: "Intercarreras UNAMBA", format: "Fase de Grupos" },
  { id: "t3", name: "Básquet Mixto", event: "Intercodigos", format: "Todos contra Todos" }
];

const MATCHES_MOCK = [
  { id: "m1", event: "Intercarreras UNAMBA", sport: "Futsal", team1: "Minas", team2: "Civil", score1: 2, score2: 2, currentPeriod: "2do Tiempo", status: "LIVE" },
  { id: "m2", event: "Intercarreras UNAMBA", sport: "Futsal", team1: "Sistemas", team2: "Derecho", score1: 5, score2: 1, currentPeriod: "Final", status: "FINISHED" },
  { id: "m3", event: "Intercarreras UNAMBA", sport: "Futsal", team1: "Medicina", team2: "Agro", score1: 0, score2: 0, currentPeriod: "Por empezar", status: "UPCOMING" },
];

// 1. MOCK PARA LIGA (10 Equipos)
const LIGA_TEAMS_MOCK = [
  { id: "l1", name: "Ing. Sistemas", played: 9, won: 7, drawn: 1, lost: 1, points: 22 },
  { id: "l2", name: "Medicina", played: 9, won: 6, drawn: 2, lost: 1, points: 20 },
  { id: "l3", name: "Derecho", played: 9, won: 6, drawn: 1, lost: 2, points: 19 },
  { id: "l4", name: "Ing. Civil", played: 9, won: 5, drawn: 2, lost: 2, points: 17 },
  { id: "l5", name: "Administración", played: 9, won: 4, drawn: 3, lost: 2, points: 15 },
  { id: "l6", name: "Contabilidad", played: 9, won: 4, drawn: 1, lost: 4, points: 13 },
  { id: "l7", name: "Enfermería", played: 9, won: 3, drawn: 2, lost: 4, points: 11 },
  { id: "l8", name: "Educación", played: 9, won: 2, drawn: 1, lost: 6, points: 7 },
  { id: "l9", name: "Turismo", played: 9, won: 1, drawn: 1, lost: 7, points: 4 },
  { id: "l10", name: "Agronomía", played: 9, won: 0, drawn: 0, lost: 9, points: 0 },
];

// 2. MOCK PARA GRUPOS (2 Grupos de 4)
const GROUP_A_MOCK = [
  { id: "ga1", name: "Sistemas", played: 3, won: 3, drawn: 0, lost: 0, points: 9 },
  { id: "ga2", name: "Derecho", played: 3, won: 1, drawn: 1, lost: 1, points: 4 },
  { id: "ga3", name: "Minas", played: 3, won: 1, drawn: 0, lost: 2, points: 3 },
  { id: "ga4", name: "Civil", played: 3, won: 0, drawn: 1, lost: 2, points: 1 },
];

const GROUP_B_MOCK = [
  { id: "gb1", name: "Medicina", played: 3, won: 2, drawn: 1, lost: 0, points: 7 },
  { id: "gb2", name: "Agro", played: 3, won: 2, drawn: 0, lost: 1, points: 6 },
  { id: "gb3", name: "Administración", played: 3, won: 1, drawn: 1, lost: 1, points: 4 },
  { id: "gb4", name: "Educación", played: 3, won: 0, drawn: 0, lost: 3, points: 0 },
];

// 3. MOCK PARA LLAVES (Expandido a Cuartos de final)
const BRACKET_MOCK = [
  { 
    stageName: "Final", 
    matchups: [{ id: "f1", team1: "Sistemas", team2: "Por definir", status: "PENDING" as const }]
  },
  { 
    stageName: "Semifinales", 
    matchups: [
      { id: "s1", team1: "Sistemas", team2: "Medicina", score1: 3, score2: 1, status: "FINISHED" as const },
      { id: "s2", team1: "Derecho", team2: "Agro", status: "PENDING" as const }
    ]
  },
  { 
    stageName: "Cuartos de Final", 
    matchups: [
      { id: "q1", team1: "Sistemas", team2: "Contabilidad", score1: 4, score2: 0, status: "FINISHED" as const },
      { id: "q2", team1: "Medicina", team2: "Educación", score1: 2, score2: 1, status: "FINISHED" as const },
      { id: "q3", team1: "Derecho", team2: "Turismo", score1: 3, score2: 2, status: "FINISHED" as const },
      { id: "q4", team1: "Agro", team2: "Civil", score1: 1, score2: 0, status: "FINISHED" as const },
    ]
  }
];

export const TournamentDetailSection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"ALL" | "LIVE" | "FINISHED" | "UPCOMING">("ALL");

  const tournament = TOURNAMENTS_MOCK.find(t => t.id === id);

  if (!tournament) {
    return (
      <div className="p-20 text-center">
        <h1 className="text-2xl font-bold text-dark">Torneo no encontrado</h1>
        <button onClick={() => navigate(-1)} className="mt-4 text-accent font-bold underline">Volver atrás</button>
      </div>
    );
  }

  const filteredMatches = MATCHES_MOCK.filter(match => filter === "ALL" || match.status === filter);

  const renderRightColumn = () => {
    switch (tournament.format) {
      case "Todos contra Todos":
        // Renderiza la tabla gigante de 10 equipos
        return <GroupStandingsTable groupName="Tabla General - Liga" teams={LIGA_TEAMS_MOCK} qualifiedCount={3} />;
      
      case "Fase de Grupos":
        return (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              {/* Renderiza los 2 grupos de 4 equipos */}
              <GroupStandingsTable groupName="Grupo A" teams={GROUP_A_MOCK} />
              <GroupStandingsTable groupName="Grupo B" teams={GROUP_B_MOCK} />
            </div>
            
            {/* Como sugeriste: Reutilizamos las llaves debajo de los grupos para mostrar los Playoffs */}
            <div className="border-t border-light pt-8 mt-2">
              <h3 className="text-xl font-black text-dark tracking-tight mb-4 text-center">Fase Final (Playoffs)</h3>
              <div className="flex flex-col gap-4">
                {BRACKET_MOCK.map((stage, idx) => (
                  <KnockoutSummary key={`playoff-${idx}`} stageName={stage.stageName} matchups={stage.matchups} />
                ))}
              </div>
            </div>
          </div>
        );

      case "Eliminación Directa":
        return (
          <div className="flex flex-col gap-4">
            {/* Solo renderiza las llaves */}
            {BRACKET_MOCK.map((stage, idx) => (
              <KnockoutSummary key={idx} stageName={stage.stageName} matchups={stage.matchups} />
            ))}
          </div>
        );

      default:
        return <div className="p-4 bg-light rounded-xl text-center text-sm font-bold text-dark/40">Formato no soportado</div>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-8 pb-20">
      <div className="mb-6 flex">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-dark/60 hover:text-accent font-bold text-sm">
          <ArrowLeft size={18} /> Volver al evento
        </button>
      </div>

      <div className="mb-10">
        <span className="text-accent text-xs font-black uppercase tracking-widest">{tournament.event}</span>
        <h1 className="text-4xl md:text-5xl font-black text-dark tracking-tighter mt-1 mb-2">
          {tournament.name}
        </h1>
        <div className="inline-flex items-center gap-2 bg-light px-3 py-1 rounded-full text-xs font-bold text-dark/60">
          <LayoutGrid size={14} /> {tournament.format}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* COLUMNA IZQUIERDA: PARTIDOS Y FILTROS */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-light pb-4">
            <h3 className="text-2xl font-black text-dark tracking-tight">Partidos</h3>
            
            <div className="flex bg-light/50 p-1 rounded-xl w-fit overflow-x-auto">
              {(["ALL", "LIVE", "UPCOMING", "FINISHED"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-all whitespace-nowrap ${
                    filter === f ? "bg-white text-accent shadow-sm" : "text-dark/40 hover:text-dark"
                  }`}
                >
                  {f === "ALL" ? "Todos" : f === "LIVE" ? "En Vivo" : f === "UPCOMING" ? "Próximos" : "Finalizados"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredMatches.length > 0 ? (
              filteredMatches.map(match => (
                <MatchCard 
                  key={match.id} 
                  id={match.id}
                  event={match.event}
                  sport={match.sport}
                  team1={match.team1}
                  team2={match.team2}
                  score1={match.score1}
                  score2={match.score2}
                  currentPeriod={match.currentPeriod}
                />
              ))
            ) : (
              <div className="col-span-full py-10 text-center text-dark/40 font-bold bg-white border border-light rounded-2xl">
                No hay partidos para este filtro.
              </div>
            )}
          </div>
        </div>

        {/* COLUMNA DERECHA: DINÁMICA SEGÚN EL FORMATO */}
        <div className="space-y-6">
          <h3 className="text-2xl font-black text-dark tracking-tight border-b border-light pb-4">
            {tournament.format === "Eliminación Directa" ? "Llaves" : "Posiciones e Información"}
          </h3>
          {renderRightColumn()}
        </div>
      </div>
    </div>
  );
};