import type { ProfessionalDto, ServiceDto } from '@taskpro/types';

export interface ServiceCatalogService {
  getCategories(): Promise<ServiceCategory[]>;
  searchServices(query: string, categoryId?: string): Promise<ServiceDto[]>;
  getServiceById(id: string): Promise<ServiceDto | null>;
  getFeaturedServices(): Promise<ServiceDto[]>;
  getProfessionalById(id: string): Promise<ProfessionalDto | null>;
  getServicesByProfessionalId(id: string): Promise<ServiceDto[]>;
}

export interface ServiceCategory {
  id: string;
  name: string;
}

export interface ServiceDetail {
  service: ServiceDto;
  professionals: ProfessionalDto[];
}
