import { useState, useCallback } from "react";
import { TeamService } from "../services/team.service";
import { TeamMapper } from "@mappers/team.mapper";
import { ToastService } from "@services/toast.service";
import { type Team } from "@models/team.model";

export const useTeam = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [teams, setTeams] = useState<Team[]>([]);

  const fetchTeams = useCallback(async (organizationId: string) => {
    setIsLoading(true);
    try {
      const response = await TeamService.getAll(organizationId);
      if (response.success && response.data) {
        setTeams(TeamMapper.toDomainList(response.data.items));
      }
    } catch {
      ToastService.error("Error al listar los equipos");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTeam = async (organizationId: string, name: string) => {
    setIsLoading(true);
    try {
      const response = await TeamService.create({ organizationId, name });
      if (response.success && response.data) {
        const newTeam = TeamMapper.toDomain(response.data);
        setTeams((prev) => [...prev, newTeam]);
        ToastService.success("Equipo registrado");
        return true;
      }
      return false;
    } catch {
      ToastService.error("No se pudo crear el equipo");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTeam = async (id: string, name: string) => {
    setIsLoading(true);
    try {
      const response = await TeamService.update(id, { name });
      if (response.success && response.data) {
        const updatedTeam = TeamMapper.toDomain(response.data);
        setTeams((prev) => prev.map(t => t.id === id ? { ...t, name: updatedTeam.name } : t));
        ToastService.success("Nombre actualizado");
        return true;
      }
      return false;
    } catch {
      ToastService.error("Error al actualizar");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const toggleStatus = async (id: string, currentStatus: 'ACTIVE' | 'INACTIVE') => {
    setIsLoading(true);
    const newStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    try {
      const response = await TeamService.changeStatus(id, newStatus);
      if (response.success && response.data) {
        setTeams((prev) => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
        ToastService.success(`Equipo ${newStatus === 'ACTIVE' ? 'activado' : 'desactivado'}`);
        return true;
      }
      return false;
    } catch {
      ToastService.error("Error al cambiar el estado");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    teams,
    isLoading,
    fetchTeams,
    createTeam,
    updateTeam,
    toggleStatus
  };
};