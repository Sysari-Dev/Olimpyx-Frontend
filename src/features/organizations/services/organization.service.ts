import { api } from "@api/HttpInterceptor";
import { 
  type CreateOrganizationRequestDTO,
  type OrganizationApiResponse, 
  type UpdateOrganizationRequestDTO 
} from "../models/organization-api.model";

export const OrganizationService = {
  getById: async (id: string): Promise<OrganizationApiResponse> => {
    const { data } = await api.get<OrganizationApiResponse>(`/org/${id}`);
    return data;
  },

  create: async (payload: CreateOrganizationRequestDTO): Promise<OrganizationApiResponse> => {
    const { data } = await api.post<OrganizationApiResponse>("/org", payload);
    return data;
  },

  update: async (id: string, updateData: UpdateOrganizationRequestDTO): Promise<OrganizationApiResponse> => {
    const { data } = await api.patch<OrganizationApiResponse>(`/org/${id}`, updateData);
    return data;
  }
};