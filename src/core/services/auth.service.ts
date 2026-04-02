// Ejemplo de cómo se vería tu src/core/services/auth.service.ts
import { api } from '../api/HttpInterceptor';

export const AuthService = {
  login: async (email: string, password:string) => {
    // El servicio usa la instancia "api" que tiene el interceptor
    return await api.post('/auth/login', { email, password });
  }
};