import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrganizationService } from '../services/organization.service';
import { OrganizationMapper } from '@mappers/organization.mapper';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setActiveOrg, setOrganizations } from '@store/slices/auth.slice';
import { ToastService } from '@services/toast.service';
import { 
  type CreateOrganizationRequestDTO, 
  type UpdateOrganizationRequestDTO 
} from '../models/organization-api.model';

export const useOrganization = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { activeOrg, organizations } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrganization = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const response = await OrganizationService.getById(id);
      if (response.success && response.data) {
        const domainOrg = OrganizationMapper.toDomain(response.data);
        dispatch(setActiveOrg(domainOrg));
        return domainOrg;
      }
      ToastService.error("No se pudo cargar la organización");
    } catch {
      ToastService.error("Error de conexión al servidor");
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  const updateOrganization = async (id: string, data: UpdateOrganizationRequestDTO) => {
    setIsLoading(true);
    try {
      const response = await OrganizationService.update(id, data);
      
      if (response.success && response.data) {
        const domainOrg = OrganizationMapper.toDomain({
          ...response.data,
          _count: {
            events: activeOrg?.stats.eventsCount || 0,
            teams: activeOrg?.stats.teamsCount || 0
          }
        });
        
        dispatch(setActiveOrg(domainOrg));
        const updatedList = organizations.map(org => 
          org.id === id ? domainOrg : org
        );
        dispatch(setOrganizations(updatedList));

        ToastService.success("Organización actualizada correctamente");
        return true;
      }
      
      ToastService.error("No se pudo procesar la actualización");
      return false;
    } catch {
      ToastService.error("Ocurrió un error inesperado al actualizar");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const createOrganization = async (payload: CreateOrganizationRequestDTO) => {
    setIsLoading(true);
    try {
      const response = await OrganizationService.create(payload);
      
      if (response.success && response.data) {
        const newOrg = OrganizationMapper.toDomain(response.data);
        dispatch(setOrganizations([...organizations, newOrg]));
        
        ToastService.success("Organización creada con éxito");
        navigate("/admin");
        return true;
      }
      return false;
    } catch {
      ToastService.error("No se pudo crear la organización");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    fetchOrganization, 
    updateOrganization, 
    createOrganization, 
    isLoading 
  };
};