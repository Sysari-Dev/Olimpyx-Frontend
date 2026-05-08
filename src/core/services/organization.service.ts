import { api } from '../api/HttpInterceptor';

export interface CreateOrgPayload {
  name: string;
  description?: string;
  parentId?: string | null; // <--- Cambiado a parentId
}

export const OrganizationService = {
  create: async (data: CreateOrgPayload) => {
    return await api.post('/org', data); 
  },

  getAll: async () => {
    return await api.get('/org');
  }
};