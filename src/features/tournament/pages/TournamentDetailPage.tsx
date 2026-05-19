/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Users,
  Settings,
  Power,
  Pencil,
  ArrowLeft,
  Plus,
  Trash2,
  Shield,
  Info,
  CheckCircle2,
  Dices, // <-- Importamos el ícono para el sorteo
} from "lucide-react";
import { useTournament } from "../hooks/useTournament";
import { useMatch } from "../../match/hooks/useMatch"; // <-- Importamos tu nuevo hook de partidos
import { LoadingState } from "@atoms/LoadingState";
import { Button } from "@atoms/Button";
import BaseModal from "@atoms/BaseModal";
import { type Tournament } from "@models/tournament.model";
import {
  type TournamentStatus,
  type TeamInTournamentDTO,
} from "../models/tournament-api.model";
import { TournamentParser } from "@utils/tournament.util";

// IMPORTAMOS LAS VISTAS DE LOS FORMATOS
import { KnockoutBracket } from "../components/formats/KnockoutBracket";
import { LeagueTable } from "../components/formats/LeagueTable";
import { GroupStageView } from "../components/formats/GroupStageView";

const TournamentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    getTournamentDetail,
    changeTournamentStatus,
    fetchTournamentTeams,
    enrollTeams,
    removeTeam,
    registeredTeams,
    availableTeams,
    isLoading: isLoadingTournament,
  } = useTournament();

  // Instanciamos el hook de partidos para manejar el sorteo
  const { generateDraw, getDashboard, matches, leaderboard, groups, isLoading: isDrawing } = useMatch();

  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isTeamsModalOpen, setIsTeamsModalOpen] = useState(false);
  const [teamToRemove, setTeamToRemove] = useState<TeamInTournamentDTO | null>(null);
  const [selectedTeamIds, setSelectedTeamIds] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      const loadData = async () => {
      const detail = await getTournamentDetail(id);
      if (detail) {
        setTournament(detail);
        await getDashboard(id);
                  }
  await fetchTournamentTeams(id);
};
      loadData();
    }
  }, [id]);

  const handleChangeStatus = async (status: TournamentStatus) => {
    if (!id) return;
    const success = await changeTournamentStatus(id, status);
    if (success && tournament) {
      setTournament({ ...tournament, status });
    }
  };

  const handleOpenEnrollment = () => {
    if (!id) return;
    setIsTeamsModalOpen(true);
    fetchTournamentTeams(id);
  };

  const handleEnroll = async () => {
    if (!id || selectedTeamIds.length === 0) return;
    const success = await enrollTeams(id, selectedTeamIds);
    if (success) {
      setSelectedTeamIds([]);
      setIsTeamsModalOpen(false);
    }
  };

  const handleConfirmRemove = async () => {
    if (id && teamToRemove) {
      const success = await removeTeam(id, teamToRemove.id);
      if (success) setTeamToRemove(null);
    }
  };

  // Función interactiva para disparar el endpoint del sorteo
  const handleSorteo = async () => {
    if (tournament) {
      await generateDraw(tournament.id);
    }
  };

  if (isLoadingTournament && !tournament) return <LoadingState text="Cargando centro de mando" />;
  if (!tournament) return <div className="text-center p-20 text-gray">Torneo no encontrado</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* HEADER */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-4">
          <button
            onClick={() => navigate(`/admin/torneos?eventId=${tournament.eventId}`)}
            className="flex items-center gap-2 text-gray/40 hover:text-primary transition-colors text-[10px] font-black uppercase tracking-widest cursor-pointer"
          >
            <ArrowLeft size={14} /> Volver al workspace
          </button>
          <div className="flex items-center gap-4">
            <h2 className="text-3xl md:text-4xl font-bold text-light tracking-tighter leading-none">
              {tournament.name}
            </h2>
            <div
              className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase border
              ${
                tournament.status === "ACTIVE"
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                  : tournament.status === "PLANNING"
                    ? "bg-amber-500/10 border-amber-500/20 text-amber-500"
                    : "bg-red-500/10 border-red-500/20 text-red-500"
              }`}
            >
              {tournament.status}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" icon={Pencil} onClick={() => navigate("editar")}>
            Editar
          </Button>
          <Button icon={Power} onClick={() => setIsStatusModalOpen(true)}>
            Estado
          </Button>
        </div>
      </header>

      {/* BLOQUE SUPERIOR (Equipos y Config) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-[#1A1A1A] border border-white/5 rounded-lg overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="text-primary" size={20} />
                <h3 className="text-sm font-black uppercase text-light tracking-widest">
                  Equipos Inscritos
                </h3>
              </div>
              <Button variant="outline" icon={Plus} onClick={handleOpenEnrollment}>
                Inscribir
              </Button>
            </div>
            <div className="p-6">
              {registeredTeams.length === 0 ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <Shield size={40} className="text-gray/10 mb-4" />
                  <p className="text-gray/40 text-sm font-medium">
                    No hay equipos en este torneo.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {registeredTeams.map((team) => (
                    <div
                      key={team.id}
                      className="flex items-center justify-between p-4 bg-white/2 border border-white/5 rounded-lg group hover:border-white/20 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-[10px] font-black text-primary">
                          {team.name.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="text-sm font-bold text-light/80">
                          {team.name}
                        </span>
                      </div>
                      <button
                        onClick={() => setTeamToRemove(team)}
                        className="p-2 text-gray/20 hover:text-red-500 transition-colors cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
        
        <div className="space-y-6">
          <div className="bg-[#1A1A1A] border border-white/5 p-6 rounded-lg space-y-6 shadow-2xl">
            <div className="flex items-center gap-3">
              <Settings className="text-primary" size={18} />
              <h4 className="text-xs font-black uppercase text-light tracking-widest">
                Configuración
              </h4>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between text-xs">
                <span className="text-gray/40 uppercase font-bold tracking-tighter">Deporte</span>
                <span className="text-light font-black">{tournament.sportName}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray/40 uppercase font-bold tracking-tighter">Formato</span>
                <span className="text-light font-black">
                  {TournamentParser.formatToLabel(tournament.format)}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray/40 uppercase font-bold tracking-tighter">Victoria</span>
                <span className="text-emerald-500 font-black">
                  {tournament.pointsPerWin} Puntos
                </span>
              </div>
            </div>
          </div>
          <div className="p-6 bg-primary/5 border border-primary/10 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Info size={16} className="text-primary" />
              <h4 className="text-[10px] font-black uppercase text-primary tracking-widest">
                Nota de Control
              </h4>
            </div>
            <p className="text-[11px] text-gray/40 leading-relaxed">
              Mientras el torneo esté en <strong>PLANNING</strong>, puedes
              inscribir y retirar equipos libremente. Al pasar a{" "}
              <strong>ACTIVE</strong>, el fixture se bloqueará para proteger la
              integridad de los resultados.
            </p>
          </div>
        </div>
      </div>

      {/* DESARROLLO DE LA COMPETICIÓN */}
      <section className="pt-8 mt-12 border-t border-white/5 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h3 className="text-xl font-black uppercase text-light tracking-widest">
            Desarrollo de la Competición
          </h3>

          {/* BOTÓN INTERACTIVO PARA DISPARAR EL SORTEO EN EL BACKEND */}
          {tournament.status === "PLANNING" && (
            <Button
              onClick={handleSorteo}
              disabled={isDrawing || registeredTeams.length === 0}
              icon={Dices}
            >
              {isDrawing ? "Generando Sorteo..." : "Realizar Sorteo"}
            </Button>
          )}
        </div>

        {tournament.format === 'ELIMINATION' && (
          <KnockoutBracket tournamentId={tournament.id} 
          matches={matches}/>
        )}
        
        {tournament.format === 'ROUND_ROBIN' && (
          <LeagueTable tournamentId={tournament.id}
          leaderboard={leaderboard} />
        )}
        
        {tournament.format === 'GROUP_STAGE' && (
          <GroupStageView tournamentId={tournament.id} 
          matches={matches} groups={groups}/>
        )}
      </section>

      {/* MODALES */}
      <BaseModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        title="Estado del Torneo"
        description="Selecciona la fase actual de la competición. Esto afecta la visibilidad pública."
      >
        <div className="grid grid-cols-2 gap-3">
          {(
            [
              "PLANNING",
              "ACTIVE",
              "COMPLETED",
              "INACTIVE",
            ] as TournamentStatus[]
          ).map((status) => (
            <button
              key={status}
              onClick={() => {
                handleChangeStatus(status);
                setIsStatusModalOpen(false);
              }}
              className={`p-4 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer
                ${
                  tournament.status === status
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-white/5 bg-white/5 text-gray hover:border-white/20 hover:text-light"
                }`}
            >
              {status}
            </button>
          ))}
        </div>
      </BaseModal>
      
      <BaseModal
        isOpen={isTeamsModalOpen}
        onClose={() => {
          setIsTeamsModalOpen(false);
          setSelectedTeamIds([]);
        }}
        onConfirm={handleEnroll}
        title="Inscribir Clubes"
        description="Selecciona los equipos de tu organización."
        confirmText="Confirmar Inscripción"
      >
        <div className="max-h-60 overflow-y-auto custom-scrollbar space-y-2 pr-2 min-h-37.5">
          {isLoadingTournament ? (
            <div className="space-y-2 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-full h-12 bg-white/5 rounded-lg border border-white/5"
                />
              ))}
              <p className="text-[10px] text-center text-gray/20 font-black uppercase tracking-widest pt-2">
                Sincronizando...
              </p>
            </div>
          ) : availableTeams.length === 0 ? (
            <div className="py-10 flex flex-col items-center opacity-50">
              <Shield size={24} className="text-gray/20 mb-2" />
              <p className="text-center text-xs text-gray/40 font-bold uppercase">
                No hay equipos disponibles
              </p>
            </div>
          ) : (
            availableTeams.map((team) => {
              const isSelected = selectedTeamIds.includes(team.id);
              return (
                <button
                  key={team.id}
                  type="button"
                  onClick={() => {
                    setSelectedTeamIds((prev) =>
                      isSelected
                        ? prev.filter((id) => id !== team.id)
                        : [...prev, team.id],
                    );
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-200 cursor-pointer
                    ${
                      isSelected
                        ? "border-primary bg-primary/10"
                        : "border-white/5 bg-white/5 hover:border-white/20"
                    }`}
                >
                  <span
                    className={`text-xs font-bold transition-colors ${isSelected ? "text-primary" : "text-light/60"}`}
                  >
                    {team.name}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all
                    ${isSelected ? "border-primary bg-primary" : "border-white/10 bg-transparent"}`}
                  >
                    {isSelected && (
                      <CheckCircle2 size={12} className="text-white" />
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </BaseModal>
      
      <BaseModal
        isOpen={!!teamToRemove}
        onClose={() => setTeamToRemove(null)}
        onConfirm={handleConfirmRemove}
        title="Retirar Equipo"
        description={`¿Estás seguro de que deseas retirar a "${teamToRemove?.name}" de este torneo? Esta acción no se puede deshacer.`}
        confirmText="Retirar Equipo"
        variant="danger"
      />
    </div>
  );
};

export default TournamentDetailPage;