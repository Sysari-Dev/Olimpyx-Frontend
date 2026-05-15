import { useState, useCallback } from "react";
import { EventService } from "../services/event.service";
import { EventMapper } from "@mappers/event.mapper";
import { ToastService } from "@services/toast.service";
import { type Event, type EventStats } from "@models/event.model";
import { type EventStatus, type CreateEventRequestDTO, type UpdateEventRequestDTO } from "../models/event-api.model";

export const useEvent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  const fetchEvents = useCallback(async (organizationId: string, status?: EventStatus) => {
    setIsLoading(true);
    try {
      const response = await EventService.getAll(organizationId, status);
      if (response.success && response.data) {
        setEvents(EventMapper.toDomainList(response.data));
      }
    } catch {
      ToastService.error("No se pudieron cargar los eventos");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getEventDetail = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await EventService.getById(id);
      if (response.success && response.data) {
        return EventMapper.toDomain(response.data);
      }
    } catch {
      ToastService.error("Error al obtener el detalle del evento");
    } finally {
      setIsLoading(false);
    }
    return null;
  };

  const createEvent = async (payload: CreateEventRequestDTO) => {
    setIsLoading(true);
    try {
      const response = await EventService.create(payload);
      if (response.success && response.data) {
        const newEvent = EventMapper.toDomain(response.data);
        setEvents((prev) => [newEvent, ...prev]);
        ToastService.success("Evento creado correctamente");
        return true;
      }
    } catch {
      ToastService.error("No se pudo crear el evento");
    } finally {
      setIsLoading(false);
    }
    return false;
  };

  const updateEvent = async (id: string, payload: UpdateEventRequestDTO) => {
    setIsLoading(true);
    try {
      const response = await EventService.update(id, payload);
      if (response.success && response.data) {
        const updated = EventMapper.toDomain(response.data);
        setEvents((prev) => prev.map(e => e.id === id ? { ...e, ...updated } : e));
        ToastService.success("Evento actualizado");
        return true;
      }
    } catch {
      ToastService.error("Error al actualizar el evento");
    } finally {
      setIsLoading(false);
    }
    return false;
  };

  const updateStatus = async (id: string, status: EventStatus) => {
    setIsLoading(true);
    try {
      const response = await EventService.changeStatus(id, status);
      if (response.success && response.data) {
        setEvents((prev) => prev.map(e => e.id === id ? { ...e, status } : e));
        const statusText = status === 'ACTIVE' ? 'Activo' : 'Planeación';
        ToastService.success(`Estado actualizado a ${statusText}`);
        return true;
      }
    } catch {
      ToastService.error("No se pudo cambiar el estado");
    } finally {
      setIsLoading(false);
    }
    return false;
  };

  const fetchEventStats = async (id: string): Promise<EventStats | null> => {
    try {
      const response = await EventService.getStats(id);
      if (response.success && response.data) {
        const stats = EventMapper.toStatsDomain(response.data);
        setEvents((prev) => prev.map(e => e.id === id ? { ...e, stats } : e));
        return stats;
      }
    } catch {
      console.error("Error fetching stats");
    }
    return null;
  };

  return {
    events,
    isLoading,
    fetchEvents,
    getEventDetail,
    createEvent,
    updateEvent,
    updateStatus,
    fetchEventStats
  };
};