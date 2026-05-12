import { useState, useCallback } from 'react';
import { OrganizationService } from '../services/organization.service';
import { OrganizationMapper } from '@mappers/organization.mapper';
import { useAppDispatch } from '@store/hooks';
import { setActiveOrg } from '@store/slices/auth.slice';

export const useOrganization = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrganization = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const response = await OrganizationService.getById(id);
      if (response.success && response.data) {
        const domainOrg = OrganizationMapper.toDomain(response.data);
        dispatch(setActiveOrg(domainOrg));
        return domainOrg;
      }
      setError("No se pudo cargar la información");
    } catch {
      setError("Error de conexión");
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  return { fetchOrganization, isLoading, error };
};