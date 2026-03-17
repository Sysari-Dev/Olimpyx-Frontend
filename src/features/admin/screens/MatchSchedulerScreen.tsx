import {
  Plus,
  Clock,
  MoreVertical,
  Activity,
  Swords,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import FilterBar from "../components/FilterBar";
import { useState } from "react";

const MATCHES = [
  {
    id: "1",
    tournament: "Copa Inter-Comunidades",
    sport: "Fútbol",
    team1: "Santos FC",
    team2: "Abancay United",
    time: "14:00",
    date: "17 Mar, 2026",
    status: "LIVE",
    score: "2 - 1",
  },
  {
    id: "2",
    tournament: "Torneo Femenino Vóley",
    sport: "Vóley",
    team1: "Las Poderosas",
    team2: "Club Victoria",
    time: "16:30",
    date: "17 Mar, 2026",
    status: "PENDING",
    score: "0 - 0",
  },
];

const MatchManagementScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTournamentId, setSelectedTournamentId] = useState<string | number>(1);

  const tournamentOptions = [
    { id: 1, label: "Copa Inter-Comunidades" },
    { id: 2, label: "Torneo Femenino Vóley" },
    { id: 3, label: "Liga Distrital Abancay" },
  ];

  const handleCreateMatch = () => {
    console.log("Abriendo modal de nuevo partido...");
  };

  const handleTournament = (id: string | number) => {
    setSelectedTournamentId(id);
    console.log("Filtrando por torneo ID:", id);
  };

  const resetAll = () => {
    setSearchTerm("");
    setSelectedDate(new Date());
    setSelectedTournamentId(1);
    console.log("Filtros limpiados");
  };

  const currentTournamentName = tournamentOptions.find(
    (t) => t.id === selectedTournamentId
  )?.label || "Seleccionar Torneo";

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title="Gestión de partidos"
        subtitle="Organiza y controla los encuentros en tiempo real."
        buttonLabel="Nuevo partido"
        buttonIcon={<Plus size={20} />}
        onButtonClick={handleCreateMatch}
      />

      <FilterBar
        currentTournament={currentTournamentName}
        currentDate={selectedDate}
        searchValue={searchTerm}
        onSearch={(val) => setSearchTerm(val)}
        onDateChange={(date) => setSelectedDate(date)}
        onTournamentChange={handleTournament}
        onClearFilters={resetAll}
      />

      <div className="space-y-4">
        <h2 className="text-sm font-black text-dark/40 uppercase tracking-widest px-2">
          Partidos Programados
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {MATCHES.map((match) => (
            <div
              key={match.id}
              className="bg-white p-6 rounded-[2rem] border border-light shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-center justify-between gap-6 group"
            >
              {/* Info del Torneo y Deporte */}
              <div className="flex items-center gap-4 w-full md:w-1/4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  {match.sport === "Vóley" ? (
                    <Activity size={24} />
                  ) : (
                    <Swords size={24} />
                  )}
                </div>
                <div>
                  <p className="text-xs font-black text-primary uppercase tracking-tighter">
                    {match.sport}
                  </p>
                  <p className="text-sm font-bold text-dark truncate max-w-[150px]">
                    {match.tournament}
                  </p>
                </div>
              </div>

              {/* VERSUS (EQUIPOS) */}
              <div className="flex items-center justify-center gap-8 flex-grow">
                <div className="text-right w-32">
                  <p className="text-lg font-black text-dark tracking-tighter">
                    {match.team1}
                  </p>
                  <p className="text-xs text-dark/40 font-bold uppercase">
                    Local
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <div
                    className={`
                    px-4 py-2 rounded-2xl font-black text-xl mb-1
                    ${match.status === "LIVE" ? "bg-tertiary text-white animate-pulse" : "bg-light text-dark/60"}
                  `}
                  >
                    {match.score}
                  </div>
                  {match.status === "LIVE" && (
                    <span className="text-[10px] font-black text-tertiary uppercase tracking-widest">
                      En Vivo
                    </span>
                  )}
                </div>

                <div className="text-left w-32">
                  <p className="text-lg font-black text-dark tracking-tighter">
                    {match.team2}
                  </p>
                  <p className="text-xs text-dark/40 font-bold uppercase">
                    Visitante
                  </p>
                </div>
              </div>

              {/* ACCIONES Y TIEMPO */}
              <div className="flex items-center justify-end gap-6 w-full md:w-1/4 border-t md:border-t-0 pt-4 md:pt-0">
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-2 text-dark/60 font-bold text-sm">
                    <Clock size={16} />
                    {match.time}
                  </div>
                  <p className="text-xs text-dark/30">{match.date}</p>
                </div>

                <button className="p-2 hover:bg-light rounded-xl transition-colors cursor-pointer text-dark/40">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER DE AYUDA (Opcional) */}
      <div className="bg-primary/5 border border-primary/10 p-6 rounded-3xl flex items-center gap-4">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">
          <Clock size={20} />
        </div>
        <div>
          <p className="text-sm font-bold text-dark">Tip de Administrador</p>
          <p className="text-xs text-dark/60">
            Haz clic en el marcador de un partido "En Vivo" para actualizar los
            puntos instantáneamente.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MatchManagementScreen;
