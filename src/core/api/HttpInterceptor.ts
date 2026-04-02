import axios from 'axios';
import { environment } from '../environments/environment';
import { useAuthStore } from '../store/slices/auth.slice';

// Creamos la instancia de Axios
export const api = axios.create({
  baseURL: environment.apiUrl,
  headers: { 'Content-Type': 'application/json' },
});

// INTERCEPTOR DE SALIDA (Pega el Token a las peticiones)
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// INTERCEPTOR DE ENTRADA (Maneja el Refresh Token si hay error 401)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si el error es 401 (No autorizado) y aún no hemos reintentado
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = useAuthStore.getState().refreshToken;
        
        // Pedimos un nuevo token al backend
        const response = await axios.post(`${environment.apiUrl}/auth/refresh`, {
          refreshToken: refreshToken
        });

        const newAccessToken = response.data.data.accessToken; // Ajusta según tu backend
        
        // Actualizamos la memoria global
        useAuthStore.getState().updateAccessToken(newAccessToken);

        // Reintentamos la petición original con el nuevo token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
        
      } catch (refreshError) {
        // Si el refresh falla (ej. expiró también), forzamos logout
        useAuthStore.getState().logout();
        window.location.href = '/'; 
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);