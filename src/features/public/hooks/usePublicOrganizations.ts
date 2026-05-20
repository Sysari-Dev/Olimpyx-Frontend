import { useState, useCallback } from "react";
import { PublicService } from "../services/public.service";
import { type PublicOrganizationDTO } from "../models/public-api.model";
import { ToastService } from "@services/toast.service";

export const usePublicOrganizations = () => {
  const [organizations, setOrganizations] = useState<PublicOrganizationDTO[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchOrganizations = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await PublicService.getOrganizations();
      if (response && response.success) {
        setOrganizations(response.data);
      }
    } catch (error) {
      console.error(error);
      ToastService.error("Error al cargar las organizaciones públicas");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    organizations,
    isLoading,
    fetchOrganizations,
  };
};