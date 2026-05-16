import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "@templates/MainLayout";
import AdminLayout from "@templates/AdminLayout";
import HomeScreen from "@features/public/screens/HomeScreen";
import EventDetailScreen from "@features/public/screens/EventDetailScreen";
import MatchLiveScreen from "@features/public/screens/MatchLiveScreen";
import MatchDetailScreen from "@features/public/screens/MatchDetailScreen";
import DashboardScreen from "@features/admin/screens/DashboardScreen";
import LoginPage from "@features/auth/pages/LoginPage";
import EventsScreen from "@features/public/screens/EventsScreen";
import TournamentDetailScreen from "@features/public/screens/TournamentDetailScreen";
import { MatchScoringScreen } from "@features/admin/screens/MatchScoringScreen";
import OrganizationManagementPage from "@features/organizations/pages/OrganizationManagementPage";
import OrganizationUpdatePage from "@features/organizations/pages/OrganizationUpdatePage";
import OrganizationCreatePage from "@features/organizations/pages/OrganizationCreatePage";
import TeamsManagementPage from "@features/teams/pages/TeamsManagementPage";
import TeamCreatePage from "@features/teams/pages/TeamCreatePage";
import EventsManagementPage from "@features/events/pages/EventsManagementPage";
import EventCreatePage from "@features/events/pages/EventCreatePage";
import EventDetailPage from "@features/events/pages/EventDetailPage";
import EventUpdatePage from "@features/events/pages/EventUpdatePage";
import TournamentsManagementPage from "@features/tournament/pages/TournamentsManagementPage";
import TournamentCreatePage from "@features/tournament/pages/TournamentCreatePage";
import TournamentDetailPage from "@features/tournament/pages/TournamentDetailPage";
import TournamentUpdatePage from "@features/tournament/pages/TournamentUpdatePage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomeScreen />} />
          <Route path="evento/:id" element={<EventDetailScreen />} />
          <Route path="torneo/:id" element={<TournamentDetailScreen />} />
          <Route path="en-vivo" element={<MatchLiveScreen />} />
          <Route path="explorar" element={<EventsScreen />} />
          <Route path="partido/:id" element={<MatchDetailScreen />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardScreen />} />
          <Route path="organizacion" element={<OrganizationManagementPage />} />
          <Route path="organizacion/editar" element={<OrganizationUpdatePage />} />
          <Route path="organizacion/crear" element={<OrganizationCreatePage />} />
          <Route path="equipos" element={<TeamsManagementPage />} />
          <Route path="equipos/crear" element={<TeamCreatePage />} />
          <Route path="eventos" element={<EventsManagementPage />} />
          <Route path="eventos/crear" element={<EventCreatePage />} />
          <Route path="eventos/:id" element={<EventDetailPage />} /> 
          <Route path="eventos/:id/editar" element={<EventUpdatePage />} /> 
          <Route path="torneos" element={<TournamentsManagementPage />} />
          <Route path="torneos/crear" element={<TournamentCreatePage />} />
          <Route path="torneos/:id" element={<TournamentDetailPage />} />
          <Route path="torneos/:id/editar" element={<TournamentUpdatePage />} />
          {/* <Route path="partidos" element={<MatchSchedulerScreen />} /> */}
        </Route>
        <Route
          path="/admin/partido/:matchId/mesa"
          element={<MatchScoringScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
};
