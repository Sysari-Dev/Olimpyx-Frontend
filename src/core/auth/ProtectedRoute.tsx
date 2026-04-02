import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/slices/auth.slice';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Consultamos al cerebro global (Zustand)
  const { isAuthenticated, accessToken } = useAuthStore();

  // Si no tenemos token, lo mandamos al login inmediatamente
  if (!isAuthenticated && !accessToken) {
    return <Navigate to="/login" replace />;
  }

  // Si tiene token, lo dejamos pasar y que vea el contenido de la ruta
  return <>{children}</>;
};