import { api } from "@api/HttpInterceptor";
import { 
  type OrganizationApiResponse, 
  type UpdateOrganizationRequestDTO 
} from "../models/organization-api.model";

export const OrganizationService = {
  getById: async (id: string): Promise<OrganizationApiResponse> => {
    const { data } = await api.get<OrganizationApiResponse>(`/org/${id}`);
    return data;
  },

  update: async (id: string, updateData: UpdateOrganizationRequestDTO): Promise<OrganizationApiResponse> => {
    const { data } = await api.patch<OrganizationApiResponse>(`/org/${id}`, updateData);
    return data;
  }
};