import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import { environment } from '../environments/environment';
import { store } from '../store';
import { updateAccessToken, logout } from '../store/slices/auth.slice';

export const api: AxiosInstance = axios.create({
  baseURL: environment.apiUrl,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = store.getState().auth.accessToken;
  
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = store.getState().auth.refreshToken;
        
        const { data } = await axios.post(`${environment.apiUrl}/auth/refresh`, {
          refreshToken
        });

        const newAccessToken = data.data.accessToken;
        store.dispatch(updateAccessToken(newAccessToken));

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        
        return api(originalRequest);
      } catch (refreshError) {
        store.dispatch(logout());
        window.location.href = '/login'; 
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);