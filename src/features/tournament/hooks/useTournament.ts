import { useState, useCallback } from "react";
import { TournamentService } from "../services/tournament.service";
import { TournamentMapper } from "@mappers/tournament.mapper";
import { ToastService } from "@services/toast.service";
import { type Tournament } from "@models/tournament.model";
import { 
  type TournamentStatus, 
  type CreateTournamentRequestDTO, 
  type UpdateTournamentRequestDTO,
  type TeamInTournamentDTO
} from "../models/tournament-api.model";

export const useTournament = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [registeredTeams, setRegisteredTeams] = useState<TeamInTournamentDTO[]>([]);
  const [availableTeams, setAvailableTeams] = useState<TeamInTournamentDTO[]>([]);

  const fetchTournamentsByEvent = useCallback(async (eventId: string) => {
    setIsLoading(true);
    try {
      const response = await TournamentService.getByEvent(eventId);
      if (response.success && response.data) {
        setTournaments(TournamentMapper.toDomainList(response.data));
      }
    } catch {
      ToastService.error("Error al cargar los torneos");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getTournamentDetail = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await TournamentService.getById(id);
      if (response.success && response.data) {
        return TournamentMapper.toDomain(response.data);
      }
    } catch {
      ToastService.error("No se pudo obtener el detalle del torneo");
    } finally {
      setIsLoading(false);
    }
    return null;
  };

  const createTournament = async (payload: CreateTournamentRequestDTO) => {
    setIsLoading(true);
    try {
      const response = await TournamentService.create(payload);
      if (response.success && response.data) {
        const newTournament = TournamentMapper.toDomain(response.data);
        setTournaments((prev) => [newTournament, ...prev]);
        ToastService.success("Torneo creado exitosamente");
        return true;
      }
    } catch {
      ToastService.error("Error al crear el torneo");
    } finally {
      setIsLoading(false);
    }
    return false;
  };

  const updateTournamentConfig = async (id: string, payload: UpdateTournamentRequestDTO) => {
    setIsLoading(true);
    try {
      const response = await TournamentService.update(id, payload);
      if (response.success && response.data) {
        const updated = TournamentMapper.toDomain(response.data);
        setTournaments((prev) => prev.map(t => t.id === id ? { ...t, ...updated } : t));
        ToastService.success("Configuración actualizada");
        return true;
      }
    } catch {
      ToastService.error("No se pudo actualizar el torneo");
    } finally {
      setIsLoading(false);
    }
    return false;
  };

  const changeTournamentStatus = async (id: string, status: TournamentStatus) => {
    setIsLoading(true);
    try {
      const response = await TournamentService.changeStatus(id, status);
      if (response.success) {
        setTournaments((prev) => prev.map(t => t.id === id ? { ...t, status } : t));
        ToastService.success(`Torneo actualizado a ${status}`);
        return true;
      }
    } catch {
      ToastService.error("Error al cambiar el estado");
    } finally {
      setIsLoading(false);
    }
    return false;
  };

  const fetchTournamentTeams = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const [registered, available] = await Promise.all([
        TournamentService.getRegisteredTeams(id),
        TournamentService.getAvailableTeams(id)
      ]);
      
      if (registered.success) setRegisteredTeams(registered.data || []);
      if (available.success) setAvailableTeams(available.data || []);
    } catch {
      ToastService.error("Error al sincronizar equipos");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const enrollTeams = async (tournamentId: string, teamIds: string[]) => {
    setIsLoading(true);
    try {
      const response = await TournamentService.registerTeams(tournamentId, { teamIds });
      if (response.success) {
        ToastService.success("Equipos inscritos exitosamente");
        await fetchTournamentTeams(tournamentId);
        return true;
      }
    } catch {
      ToastService.error("Error en la inscripción");
    } finally {
      setIsLoading(false);
    }
    return false;
  };

  const removeTeam = async (tournamentId: string, teamId: string) => {
    setIsLoading(true);
    try {
      const response = await TournamentService.unregisterTeam(tournamentId, teamId);
      if (response.success) {
        setRegisteredTeams((prev) => prev.filter(t => t.id !== teamId));
        ToastService.success("Equipo retirado");
        return true;
      }
    } catch {
      ToastService.error("No se pudo retirar al equipo");
    } finally {
      setIsLoading(false);
    }
    return false;
  };

  return {
    tournaments,
    registeredTeams,
    availableTeams,
    isLoading,
    fetchTournamentsByEvent,
    getTournamentDetail,
    createTournament,
    updateTournamentConfig,
    changeTournamentStatus,
    fetchTournamentTeams,
    enrollTeams,
    removeTeam
  };
};