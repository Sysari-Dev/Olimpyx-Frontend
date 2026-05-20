import { useState } from "react";
import { CompetitionMapper } from "@mappers/competition.mapper";
import { ToastService } from "@services/toast.service";
import { type Match } from "@models/match.model";
import type { GroupDTO, LeaderboardEntryDTO } from "../models/competition-api.model";
import { CompetitionService } from "../services/Competition.service";

export const useCompetition = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [matches, setMatches] = useState<Match[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntryDTO[]>([]);
  const [groups, setGroups] = useState<GroupDTO[]>([]);

  const generateDraw = async (tournamentId: string) => {
    setIsLoading(true);
    try {
      const response = await CompetitionService.generateDraw(tournamentId);
      if (response.success && response.data) {
        const mappedMatches = CompetitionMapper.toDomainList(response.data);
        setMatches(mappedMatches);
        ToastService.success("¡El sorteo se ha realizado con éxito!");
        await getDashboard(tournamentId);
        return true;
      }
    } catch {
      ToastService.error("Ocurrió un error al intentar generar el sorteo.");
    } finally {
      setIsLoading(false);
    }
    return false;
  };

  const getDashboard = async (tournamentId: string) => {
    setIsLoading(true);
    try {
      const response = await CompetitionService.getDashboard(tournamentId);
      if (response.success && response.data) {
        const { format, matches, leaderboard, groups } = response.data;

        if (format === "ELIMINATION" && matches) {
          setMatches(CompetitionMapper.toDomainList(matches));
        }
        
        if (format === "ROUND_ROBIN" && leaderboard) {
          setLeaderboard(leaderboard);
        }

        if (format === "GROUP_STAGE" && groups) {
          setGroups(groups);
          const allGroupMatches = groups.flatMap(g => g.matches || []);
          if (allGroupMatches.length > 0) {
            setMatches(CompetitionMapper.toDomainList(allGroupMatches));
          }
        }
      }
    } catch {
      ToastService.error("Error al cargar el dashboard del torneo.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    matches,
    leaderboard,
    groups, 
    isLoading,
    generateDraw,
    getDashboard
  };
};