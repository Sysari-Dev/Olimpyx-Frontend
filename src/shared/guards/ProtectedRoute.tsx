import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@store/hooks";

export const ProtectedRoute = ({
  allowedRoles,
  redirectTo = "/admin",
}: {
  allowedRoles?: string[];
  redirectTo?: string;
}) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};