import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@store/hooks";

export const PublicRoute = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};