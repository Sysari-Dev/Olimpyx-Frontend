import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@templates/MainLayout";
import AdminLayout from "@templates/AdminLayout";
import LoginPage from "@features/auth/pages/LoginPage";
import TournamentDetailScreen from "@features/public/screens/TournamentDetailScreen";
import OrganizationManagementPage from "@features/organizations/pages/OrganizationManagementPage";
import OrganizationUpdatePage from "@features/organizations/pages/OrganizationUpdatePage";
import OrganizationCreatePage from "@features/organizations/pages/OrganizationCreatePage";
import TeamsManagementPage from "@features/teams/pages/TeamsManagementPage";
import TeamCreatePage from "@features/teams/pages/TeamCreatePage";
import EventsManagementPage from "@features/events/pages/EventsManagementPage";
import EventCreatePage from "@features/events/pages/EventCreatePage";
import EventDetailPage from "@features/events/pages/EventDetailPage";
import EventPublicDetailPage from "@features/public/pages/EventDetailPage";
import EventUpdatePage from "@features/events/pages/EventUpdatePage";
import TournamentsManagementPage from "@features/tournament/pages/TournamentsManagementPage";
import TournamentCreatePage from "@features/tournament/pages/TournamentCreatePage";
import TournamentDetailPage from "@features/tournament/pages/TournamentDetailPage";
import TournamentUpdatePage from "@features/tournament/pages/TournamentUpdatePage";
import MatchSchedulerPage from "@features/match/pages/MatchSchedulerPage";
import DashboardPage from "@features/admin/pages/DashboardPage";
import MatchScoringPage from "@features/match/pages/MatchScoringPage";
import OrganizationListPage from "@features/public/pages/OrganizationListPage";
import { PublicRoute } from "src/shared/guards/PublicRoute";
import { ProtectedRoute } from "src/shared/guards/ProtectedRoute";
import MatchDetailPage from "@features/public/pages/MatchDetailPage";
import MatchLivePage from "@features/public/pages/MatchLivePage";
import { ScrollToTop } from "./components/ScrollToTop";
import EventsPage from "@features/public/pages/EventsPage";
import HomePage from "@features/public/pages/HomePage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="evento/:id" element={<EventPublicDetailPage />} />
          <Route path="torneo/:id" element={<TournamentDetailScreen />} />
          <Route path="en-vivo" element={<MatchLivePage />} />
          <Route path="explorar" element={<EventsPage />} />
          <Route path="partido/:id" element={<MatchDetailPage />} />
          <Route path="organizaciones" element={<OrganizationListPage />} />
        </Route>
        <Route
          path="/admin"
          element={<ProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]} />}
        >
          <Route element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route
              path="organizacion"
              element={<OrganizationManagementPage />}
            />
            <Route
              path="organizacion/editar"
              element={<OrganizationUpdatePage />}
            />
            <Route element={<ProtectedRoute allowedRoles={["SUPER_ADMIN"]} />}>
              <Route
                path="organizacion/crear"
                element={<OrganizationCreatePage />}
              />
            </Route>
            <Route path="equipos" element={<TeamsManagementPage />} />
            <Route path="equipos/crear" element={<TeamCreatePage />} />
            <Route path="eventos" element={<EventsManagementPage />} />
            <Route path="eventos/crear" element={<EventCreatePage />} />
            <Route path="eventos/:id" element={<EventDetailPage />} />
            <Route path="eventos/:id/editar" element={<EventUpdatePage />} />
            <Route path="torneos" element={<TournamentsManagementPage />} />
            <Route path="torneos/crear" element={<TournamentCreatePage />} />
            <Route path="torneos/:id" element={<TournamentDetailPage />} />
            <Route
              path="torneos/:id/editar"
              element={<TournamentUpdatePage />}
            />
            <Route path="partidos" element={<MatchSchedulerPage />} />
            <Route path="partidos/:id" element={<MatchScoringPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
