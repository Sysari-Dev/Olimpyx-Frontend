import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMatch } from "../hooks/useMatch";
import { LoadingState } from "@atoms/LoadingState";
import BaseModal from "@atoms/BaseModal";
import { type Match, type MatchStatus } from "@models/match.model";
import { ScoringHeader } from "../components/ScoringHeader";
import { TeamScorePanel } from "../components/TeamScorePanel";
import { SPORT_IDS } from "@constants/sport-ids.constant";

export const MatchScoringPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getMatchDetail, updateMatchScore, updateMatchMetadata, finalizeMatch } = useMatch();

  const [match, setMatch] = useState<Match | null>(null);
  const [scoreTeam1, setScoreTeam1] = useState(0);
  const [scoreTeam2, setScoreTeam2] = useState(0);
  const [setsTeam1, setSetsTeam1] = useState(0);
  const [setsTeam2, setSetsTeam2] = useState(0);
  const [period, setPeriod] = useState(1);
  const [isFinalizeModalOpen, setIsFinalizeModalOpen] = useState(false);
  const [isScoringRequestActive, setIsScoringRequestActive] = useState(false);

  useEffect(() => {
    if (id) {
      getMatchDetail(id).then((data) => {
        if (data) {
          setMatch(data);
          setScoreTeam1(data.scoreTeam1);
          setScoreTeam2(data.scoreTeam2);
        }
      });
    }
  }, [id, getMatchDetail]);

  const sportId = match?.tournament.sportId || "";
  const isVoley = sportId === SPORT_IDS.VOLEY;
  const isBasquet = sportId === SPORT_IDS.BASQUET;

  const sportLabel = useMemo(() => {
    if (sportId === SPORT_IDS.FUTBOL) return "Fútbol";
    if (sportId === SPORT_IDS.FUTSAL) return "Futsal / Fulbito";
    if (sportId === SPORT_IDS.BASQUET) return "Básquetbol";
    if (sportId === SPORT_IDS.VOLEY) return "Vóleibol";
    return "Deporte";
  }, [sportId]);

  const isSetWinDisabled = useMemo(() => {
    return scoreTeam1 === scoreTeam2;
  }, [scoreTeam1, scoreTeam2]);

  const handleScoreExecution = async (
    targetTeam: "team1" | "team2",
    points: number,
    operation: "INCREMENT" | "DECREMENT"
  ) => {
    if (!match || isScoringRequestActive) return;

    setIsScoringRequestActive(true);
    const multiplier = operation === "INCREMENT" ? 1 : -1;
    const delta = points * multiplier;
    const isTeam1 = targetTeam === "team1";

    if (isTeam1) {
      setScoreTeam1((prev) => Math.max(0, prev + delta));
    } else {
      setScoreTeam2((prev) => Math.max(0, prev + delta));
    }

    const success = await updateMatchScore({
      tournamentId: match.tournament.id,
      matchId: match.id,
      teamId: isTeam1 ? match.team1.id : match.team2.id,
      points,
      operation,
      ...((isVoley || isBasquet) && { setNumber: period }),
    });

    if (!success) {
      if (isTeam1) {
        setScoreTeam1((prev) => Math.max(0, prev - delta));
      } else {
        setScoreTeam2((prev) => Math.max(0, prev - delta));
      }
    }

    setIsScoringRequestActive(false);
  };

  const handlePeriodTransition = async (targetTeam: "team1" | "team2") => {
    if (!match || isScoringRequestActive) return;

    setIsScoringRequestActive(true);
    if (targetTeam === "team1") {
      setSetsTeam1((prev) => prev + 1);
    } else {
      setSetsTeam2((prev) => prev + 1);
    }

    setScoreTeam1(0);
    setScoreTeam2(0);
    setPeriod((prev) => prev + 1);
    setIsScoringRequestActive(false);
  };

  const handleMetadataPatch = async (payload: { matchDate: string | null; status: MatchStatus }) => {
    if (!match) return;
    const success = await updateMatchMetadata(match.id, payload);
    if (success) {
      setMatch({ ...match, ...payload, matchDate: payload.matchDate ?? undefined });
    }
  };

  const handleConfirmFinalize = async () => {
    if (!match) return;
    await finalizeMatch({
      tournamentId: match.tournament.id,
      matchId: match.id,
    });
    navigate(-1);
  };

  if (!match) return <LoadingState text="Estableciendo conexión con mesa de control..." />;

  const isControlDisabled = match.status === "PENDING" || isScoringRequestActive;

  return (
    <div className="text-white flex flex-col font-sans select-none overflow-x-hidden">
      <ScoringHeader
        matchId={match.id}
        sportLabel={sportLabel}
        status={match.status}
        matchDate={match.matchDate ?? null}
        onNavigateBack={() => navigate(-1)}
        onFinalizeTrigger={() => setIsFinalizeModalOpen(true)}
        onMetadataUpdate={handleMetadataPatch}
      />

      <main className="flex-1 flex flex-col justify-between p-4 md:p-8 max-w-7xl w-full mx-auto gap-6">
        <section className="bg-white/2 border border-white/5 rounded-3xl p-4 md:p-8 flex flex-col justify-center items-center gap-6 shadow-2xl grow">
          <div className="w-full flex items-center justify-center">
            <span className="text-xs font-black tracking-widest text-white/20 italic bg-white/5 px-3 py-1 rounded-full border border-white/5">
              {isVoley ? `SET ${period}` : isBasquet ? `C${period}` : "TR"}
            </span>
          </div>
          <div className="w-full flex flex-col md:flex-row items-center justify-center md:gap-12 gap-8 my-auto">
            <TeamScorePanel
              name={match.team1.name}
              score={scoreTeam1}
              sets={setsTeam1}
              color="text-blue-400"
              btnColor="bg-blue-600"
              isVoley={isVoley}
              isBasquet={isBasquet}
              disabled={isControlDisabled}
              isSetWinDisabled={isSetWinDisabled}
              onScoreChange={(points, op) => handleScoreExecution("team1", points, op)}
              onSetWin={() => handlePeriodTransition("team1")}
            />
            <div className="hidden md:block w-px h-48 bg-white/5 shrink-0" />
            <TeamScorePanel
              name={match.team2.name}
              score={scoreTeam2}
              sets={setsTeam2}
              color="text-rose-400"
              btnColor="bg-rose-600"
              isVoley={isVoley}
              isBasquet={isBasquet}
              disabled={isControlDisabled}
              isSetWinDisabled={isSetWinDisabled}
              onScoreChange={(points, op) => handleScoreExecution("team2", points, op)}
              onSetWin={() => handlePeriodTransition("team2")}
            />
          </div>
        </section>
      </main>
      <BaseModal
        isOpen={isFinalizeModalOpen}
        onClose={() => setIsFinalizeModalOpen(false)}
        onConfirm={handleConfirmFinalize}
        title="Finalizar Encuentro"
        description="¿Estás seguro de cerrar el partido de forma definitiva? Los puntajes se congelarán y se actualizarán las tablas de posiciones generales inmediatamente."
        confirmText="Concluir Partido"
      />
    </div>
  );
};

export default MatchScoringPage;