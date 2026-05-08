  import { BrowserRouter, Routes, Route } from 'react-router-dom';

  import MainLayout from '@templates/MainLayout';
  import AdminLayout from '@templates/AdminLayout';
  import HomeScreen from '@features/public/screens/HomeScreen';
  import EventDetailScreen from '@features/public/screens/EventDetailScreen';
  import MatchLiveScreen from '@features/public/screens/MatchLiveScreen';
  import MatchDetailScreen from '@features/public/screens/MatchDetailScreen';
  import DashboardScreen from '@features/admin/screens/DashboardScreen';
  import EventManagementScreen from '@features/admin/screens/EventManagementScreen';
  import LoginScreen from '@features/auth/screens/LoginScreen';
  import OrganizationManagementScreen from '@features/admin/screens/OrganizationManagementScreen';
  import TeamManagementScreen from '@features/admin/screens/TeamManagementScreen';
  import MatchSchedulerScreen from '@features/admin/screens/MatchSchedulerScreen';
  import TournamentManagementScreen from '@features/admin/screens/TournamentManagementScreen';
  import EventsScreen from '@features/public/screens/EventsScreen';
  import TournamentDetailScreen from '@features/public/screens/TournamentDetailScreen';
  import CreateEventScreen from '@features/admin/screens/CreateEventScreen';
import AdminEventDetailScreen from '@features/admin/screens/AdminEventDetailScreen';
import AdminCreateTournamentScreen from '@features/admin/screens/AdminCreateTournamentScreen';
import { MatchScoringScreen } from '@features/admin/screens/MatchScoringScreen';
import { ProtectedRoute } from '../auth/ProtectedRoute';
import OrganizationCreateScreen from '@features/admin/screens/OrganizationCreateScreen';

  export const AppRouter = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomeScreen />} />
            <Route path="evento/:id" element={<EventDetailScreen />} />
            <Route path="torneo/:id" element={<TournamentDetailScreen />} />
            <Route path="en-vivo" element={<MatchLiveScreen />} />
            <Route path="explorar" element={<EventsScreen/>}/>
            <Route path="partido/:id" element={<MatchDetailScreen />} />
          </Route>
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<DashboardScreen />} />
            <Route path="eventos" element={<EventManagementScreen />} />
            <Route path="organizacion" element={<OrganizationManagementScreen />} />
            <Route path="organizacion/crear" element={<OrganizationCreateScreen/>}/>
            <Route path="evento/nuevo" element={<CreateEventScreen/>}/>
            <Route path="evento/:id" element={<AdminEventDetailScreen/>}/>
            <Route path="evento/:eventId/torneo/nuevo" element={<AdminCreateTournamentScreen />} />
            <Route path="equipos" element={<TeamManagementScreen />} />
            <Route path="partidos" element={<MatchSchedulerScreen />} />
            <Route path="torneos" element={<TournamentManagementScreen />} />
          </Route>
          <Route path="/admin/partido/:matchId/mesa" element={<MatchScoringScreen />} />
        </Routes>
      </BrowserRouter>
    );
  };