import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from '@templates/MainLayout';
import AdminLayout from '@templates/AdminLayout';
import AuthLayout from '@templates/AuthLayout';
import HomeScreen from '@features/public/screens/HomeScreen';
import EventDetailScreen from '@features/public/screens/EventDetailScreen';
import MatchLiveScreen from '@features/public/screens/MatchLiveScreen';
import DashboardScreen from '@features/admin/screens/DashboardScreen';
import EventManagementScreen from '@features/admin/screens/EventManagementScreen';
import LoginScreen from '@features/auth/screens/LoginScreen';
import OrganizationManagementScreen from '@features/admin/screens/OrganizationManagementScreen';
import TeamManagementScreen from '@features/admin/screens/TeamManagementScreen';
import MatchSchedulerScreen from '@features/admin/screens/MatchSchedulerScreen';
import TournamentManagementScreen from '@features/admin/screens/TournamentManagementScreen';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/admin-login" element={<LoginScreen />} />
        </Route>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomeScreen />} />
          <Route path="evento/:id" element={<EventDetailScreen />} />
          <Route path="partido/:id" element={<MatchLiveScreen />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardScreen />} />
          <Route path="eventos" element={<EventManagementScreen />} />
          <Route path="organizacion" element={<OrganizationManagementScreen />} />
          <Route path="equipos" element={<TeamManagementScreen />} />
          <Route path="partidos" element={<MatchSchedulerScreen />} />
          <Route path="torneos" element={<TournamentManagementScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};