import { api } from '../api/HttpInterceptor';

export interface CreateTeamPayload {
  organizationId: string;
  name: string;
}

export const TeamService = {
  getAll: async (organizationId: string) => {
    return await api.get('/team', {
      params: { organizationId }
    });
  },
  
  create: async (data: CreateTeamPayload) => {
    return await api.post('/team', data);
  },

  update: async (id: string, data: { name: string }) => {
    return await api.patch(`/team/${id}`, data);
  }
};