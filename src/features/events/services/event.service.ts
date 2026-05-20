import { api } from "@api/HttpInterceptor";
import { 
  type EventApiResponse, 
  type EventListApiResponse,
  type EventStatsApiResponse,
  type CreateEventRequestDTO,
  type UpdateEventRequestDTO,
  type EventStatus
} from "../models/event-api.model";

export const EventService = {
  getAll: async (organizationId: string, status?: EventStatus): Promise<EventListApiResponse> => {
    const { data } = await api.get<EventListApiResponse>("/event", {
      params: { organizationId, status }
    });
    return data;
  },

  getById: async (id: string): Promise<EventApiResponse> => {
    const { data } = await api.get<EventApiResponse>(`/event/${id}`);
    return data;
  },

  create: async (payload: CreateEventRequestDTO): Promise<EventApiResponse> => {
    const { data } = await api.post<EventApiResponse>("/event", payload);
    return data;
  },

  update: async (id: string, payload: UpdateEventRequestDTO): Promise<EventApiResponse> => {
    const { data } = await api.patch<EventApiResponse>(`/event/${id}`, payload);
    return data;
  },

  changeStatus: async (id: string, status: EventStatus): Promise<EventApiResponse> => {
    const { data } = await api.patch<EventApiResponse>(`/event/${id}/status`, { status });
    return data;
  },

  getStats: async (id: string): Promise<EventStatsApiResponse> => {
    const { data } = await api.get<EventStatsApiResponse>(`/event/${id}/stats`);
    return data;
  }
};