import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserAccount } from '../../../shared/models/auth.model';
import type { Organization } from '../../../shared/models/organization.model';

interface AuthState {
  user: UserAccount | null; 
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  organizations: Organization[];
  activeOrg: Organization | null;
  
  // Acciones
  setAuth: (user: UserAccount, accessToken: string, refreshToken: string) => void;
  updateAccessToken: (newAccessToken: string) => void;
  logout: () => void;
  
  // 3. NUEVAS ACCIONES
  setOrganizations: (orgs: Organization[]) => void;
  setActiveOrg: (org: Organization) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      
      organizations: [],
      activeOrg: null,

      setAuth: (user, accessToken, refreshToken) => 
        set({ user, accessToken, refreshToken, isAuthenticated: true }),
        
      updateAccessToken: (newAccessToken) => 
        set({ accessToken: newAccessToken }),
        
      logout: () => 
        set({ 
          user: null, 
          accessToken: null, 
          refreshToken: null, 
          isAuthenticated: false,
          organizations: [], 
          activeOrg: null   
        }),
      setOrganizations: (orgs) => set({ organizations: orgs }),
      setActiveOrg: (org) => set({ activeOrg: org }),
    }),
    {
      name: 'olimpyx-auth-storage',
    }
  )
);