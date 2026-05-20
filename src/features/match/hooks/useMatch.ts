import { useState, useCallback } from "react";
import { type Match } from "@models/match.model";
import { MatchService } from "../services/match.service";
import { MatchMapper } from "@mappers/match.mapper";
import { ToastService } from "@services/toast.service";
import { 
  type UpdateMatchMetadataRequestDTO, 
  type UpdateMatchScoreRequestDTO, 
  type FinalizeMatchRequestDTO 
} from "../models/match-api.model";

export const useMatch = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchMatches = useCallback(async (tournamentId: string): Promise<Match[] | null> => {
    setIsLoading(true);
    try {
      const response = await MatchService.getByTournament(tournamentId);
      if (response && response.success) {
        const domainMatches = MatchMapper.toDomainList(response.data);
        setMatches(domainMatches);
        return domainMatches;
      }
      return null;
    } catch (error) {
      console.error(error);
      ToastService.error("Error al cargar los partidos");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getMatchDetail = useCallback(async (matchId: string): Promise<Match | null> => {
    setIsLoading(true);
    try {
      const response = await MatchService.getById(matchId);
      if (response.success && response.data) {
        return MatchMapper.toDomain(response.data);
      }
      return null;
    } catch (error) {
      console.error(error);
      ToastService.error("No se pudo obtener el detalle del partido");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateMatchMetadata = useCallback(async (matchId: string, payload: UpdateMatchMetadataRequestDTO): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await MatchService.updateMetadata(matchId, payload);
      if (response.success && response.data) {
        const updated = MatchMapper.toDomain(response.data);
        setMatches((prev) => prev.map((m) => m.id === matchId ? updated : m));
        ToastService.success("Datos actualizados correctamente");
        return true;
      }
    } catch (error) {
      console.error(error);
      ToastService.error("Error al actualizar la configuración del partido");
    } finally {
      setIsLoading(false);
    }
    return false;
  }, []);

  const updateMatchScore = useCallback(async (payload: UpdateMatchScoreRequestDTO): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await MatchService.updateScore(payload);
      if (response.success && response.data) {
        const updated = MatchMapper.toDomain(response.data);
        setMatches((prev) => prev.map((m) => m.id === payload.matchId ? updated : m));
        return true;
      }
    } catch (error) {
      console.error(error);
      ToastService.error("No se pudo actualizar el marcador");
    } finally {
      setIsLoading(false);
    }
    return false;
  }, []);

  const finalizeMatch = useCallback(async (payload: FinalizeMatchRequestDTO) => {
    setIsLoading(true);
    try {
      const response = await MatchService.finalize(payload);
      if (response.success && response.data) {
        setMatches((prev) => prev.map((m) => m.id === payload.matchId ? { ...m, status: "FINISHED" } : m));
        ToastService.success("Partido finalizado y tablas actualizadas");
        return response.data;
      }
    } catch (error) {
      console.error(error);
      ToastService.error("Error al procesar la finalización del encuentro");
    } finally {
      setIsLoading(false);
    }
    return null;
  }, []);

  return {
    matches,
    isLoading,
    fetchMatches,
    getMatchDetail,
    updateMatchMetadata,
    updateMatchScore,
    finalizeMatch,
  };
};