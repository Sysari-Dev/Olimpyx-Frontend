import { useState } from "react";
import { CompetitionService } from "../services/Competition.service";
import { MatchMapper } from "@mappers/match.mapper";
import { ToastService } from "@services/toast.service";
import { type Match } from "@models/match.model";
import type { GroupDTO, LeaderboardEntryDTO } from "../models/match-api.model";

export const useMatch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [matches, setMatches] = useState<Match[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntryDTO[]>([]); // 👈 NUEVO
  const [groups, setGroups] = useState<GroupDTO[]>([]);           // 👈 NUEVO

  const generateDraw = async (tournamentId: string) => {
    setIsLoading(true);
    try {
      const response = await CompetitionService.generateDraw(tournamentId);
      if (response.success && response.data) {
        const mappedMatches = MatchMapper.toDomainList(response.data);
        setMatches(mappedMatches);
        ToastService.success("¡El sorteo se ha realizado con éxito!");
        // 👇 Refresca el dashboard inmediatamente después del sorteo
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

  // 👇 NUEVO
  const getDashboard = async (tournamentId: string) => {
    setIsLoading(true);
    try {
      const response = await CompetitionService.getDashboard(tournamentId);
      if (response.success && response.data) {
        const { format, matches, leaderboard, groups } = response.data;

        if (format === "ELIMINATION" && matches) {
          setMatches(MatchMapper.toDomainList(matches));
        }
        
        if (format === "ROUND_ROBIN" && leaderboard) {
          setLeaderboard(leaderboard);
        }

        // 👇 MEJORA AQUÍ: Si es GROUP_STAGE, extraemos también los partidos de los grupos
        if (format === "GROUP_STAGE" && groups) {
          setGroups(groups);
          
          // Extraemos todos los MatchResponseDTO de todos los grupos y los unificamos en un solo array plano
          const allGroupMatches = groups.flatMap(g => g.matches || []);
          if (allGroupMatches.length > 0) {
            setMatches(MatchMapper.toDomainList(allGroupMatches));
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
    leaderboard, // 👈 NUEVO
    groups,      // 👈 NUEVO
    isLoading,
    generateDraw,
    getDashboard  // 👈 NUEVO
  };
};