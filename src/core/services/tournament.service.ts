import { api } from '../api/HttpInterceptor';

export const TournamentService = {
  getByEventId: async (eventId: string) => {
    return await api.get('/tournament', {
      params: { eventId }
    });
  }
};