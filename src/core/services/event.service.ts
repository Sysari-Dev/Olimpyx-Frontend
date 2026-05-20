import { api } from '../api/HttpInterceptor';

export interface CreateEventPayload {
  organizationId: string;
  name: string;
  description?: string;
  location?: string;
  start_date: string;
  end_date: string;
}

export const EventService = {
  create: async (data: CreateEventPayload) => {
    return await api.post('/event', data);
  },

  getAll: async (organizationId: string) => {
    return await api.get('/event', {
      params: { 
        organizationId: organizationId 
      }
    }); 
  },

  getById: async (id: string) => {
    return await api.get(`/event/${id}`);
  } 
};