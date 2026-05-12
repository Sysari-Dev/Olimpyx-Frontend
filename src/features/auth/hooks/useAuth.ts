import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { useAppDispatch } from '@store/hooks';
import { setAuth } from '@store/slices/auth.slice';
import { AuthService } from '../services/auth.service';
import { AuthMapper } from '@mappers/auth.mapper';
import type { LoginRequestDTO } from '../models/auth-api.model';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginRequestDTO) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await AuthService.login(credentials);

      if (response.success && response.data) {
        const session = AuthMapper.toDomain(response.data);
        dispatch(setAuth(session));
        navigate('/admin');
      } else {
        const message = Array.isArray(response.message) 
          ? response.message[0].content 
          : response.message.content;
        setError(message);
      }
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        const backendMessage = err.response?.data?.message;
        const message = typeof backendMessage === 'object' 
          ? backendMessage.content 
          : "Error de conexión con el servidor";
        setError(message);
      } else {
        setError("Ocurrió un error inesperado");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    error,
    setError
  };
};