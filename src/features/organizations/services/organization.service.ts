import { api } from "@api/HttpInterceptor";
import { type OrganizationApiResponse } from "../models/organization-api.model";

export const OrganizationService = {
  getById: async (id: string): Promise<OrganizationApiResponse> => {
    const { data } = await api.get<OrganizationApiResponse>(`/org/${id}`);
    return data;
  }
};