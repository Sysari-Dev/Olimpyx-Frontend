import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type UserAccount } from '@models/auth.model';
import { type Organization } from '@models/organization.model';

interface AuthState {
  user: UserAccount | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  organizations: Organization[];
  activeOrg: Organization | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  organizations: [],
  activeOrg: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ user: UserAccount; accessToken: string; refreshToken: string }>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    },
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setOrganizations: (state, action: PayloadAction<Organization[]>) => {
      state.organizations = action.payload;
    },
    setActiveOrg: (state, action: PayloadAction<Organization>) => {
      state.activeOrg = action.payload;
    },
    logout: () => initialState,
  },
});

export const { setAuth, updateAccessToken, setOrganizations, setActiveOrg, logout } = authSlice.actions;
export default authSlice.reducer;