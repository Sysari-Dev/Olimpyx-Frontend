import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// IMPORTAMOS TU MODELO OFICIAL (Ajusta la ruta si es necesario)
import type { UserAccount } from '../../../shared/models/auth.model';

interface AuthState {
  user: UserAccount | null; // <--- USAMOS TU MODELO AQUÍ
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  
  // Acciones
  setAuth: (user: UserAccount, accessToken: string, refreshToken: string) => void;
  updateAccessToken: (newAccessToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      setAuth: (user, accessToken, refreshToken) => 
        set({ user, accessToken, refreshToken, isAuthenticated: true }),
        
      updateAccessToken: (newAccessToken) => 
        set({ accessToken: newAccessToken }),
        
      logout: () => 
        set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false }),
    }),
    {
      name: 'olimpyx-auth-storage',
    }
  )
);