import { Currency, createCategoryId, createServiceId } from '@taskpro/types';
import type { MoneyDto, ProfessionalDto, ServiceDto } from '@taskpro/types';
import type {
  ServiceCatalogService,
  ServiceCategory,
  ServiceDetail,
} from './ServiceCatalogService';

function price(amountMinor: number, currency = Currency.MXN): MoneyDto {
  return { amountMinor, currency };
}

const CATEGORIES: ServiceCategory[] = [
  { id: createCategoryId('cat-cleaning'), name: 'Limpieza' },
  { id: createCategoryId('cat-plumbing'), name: 'Plomería' },
  { id: createCategoryId('cat-electrical'), name: 'Electricidad' },
  { id: createCategoryId('cat-gardening'), name: 'Jardinería' },
  { id: createCategoryId('cat-painting'), name: 'Pintura' },
];

const SERVICES: ServiceDto[] = [
  {
    id: createServiceId('svc-house-cleaning'),
    categoryId: CATEGORIES[0].id,
    name: 'Limpieza doméstica',
    description: 'Limpieza general de hogar incluyendo habitaciones, baños y cocina.',
    estimatedDurationMinutes: 180,
    basePrice: price(45000),
    isActive: true,
  },
  {
    id: createServiceId('svc-deep-cleaning'),
    categoryId: CATEGORIES[0].id,
    name: 'Limpieza profunda',
    description: 'Limpieza intensiva con atención en zonas difíciles y detalles.',
    estimatedDurationMinutes: 300,
    basePrice: price(75000),
    isActive: true,
  },
  {
    id: createServiceId('svc-leak-repair'),
    categoryId: CATEGORIES[1].id,
    name: 'Reparación de fugas',
    description: 'Detección y reparación de fugas menores en tuberías y grifería.',
    estimatedDurationMinutes: 90,
    basePrice: price(35000),
    isActive: true,
  },
  {
    id: createServiceId('svc-outlet-install'),
    categoryId: CATEGORIES[2].id,
    name: 'Instalación de contactos',
    description: 'Instalación segura de contactos y apagadores por electricista certificado.',
    estimatedDurationMinutes: 120,
    basePrice: price(40000),
    isActive: true,
  },
  {
    id: createServiceId('svc-garden-maintenance'),
    categoryId: CATEGORIES[3].id,
    name: 'Mantenimiento de jardín',
    description: 'Poda, limpieza y mantenimiento general de áreas verdes.',
    estimatedDurationMinutes: 150,
    basePrice: price(38000),
    isActive: true,
  },
  {
    id: createServiceId('svc-room-painting'),
    categoryId: CATEGORIES[4].id,
    name: 'Pintura de interiores',
    description: 'Pintura de muros y techos con acabado profesional.',
    estimatedDurationMinutes: 240,
    basePrice: price(55000),
    isActive: true,
  },
];

const PROFESSIONALS: ProfessionalDto[] = [
  {
    id: 'pro-1' as ProfessionalDto['id'],
    userId: 'user-1' as ProfessionalDto['userId'],
    bio: 'Especialista en limpieza residencial con 5 años de experiencia.',
    yearsExperience: 5,
    rating: { value: 4.8, max: 5, precision: 0.5 },
    reviewCount: 124,
    travelRadiusMeters: 15000,
    verificationStatus: 'verified',
    isAvailable: true,
  },
  {
    id: 'pro-2' as ProfessionalDto['id'],
    userId: 'user-2' as ProfessionalDto['userId'],
    bio: 'Plomero certificado, atención rápida y garantía de trabajo.',
    yearsExperience: 8,
    rating: { value: 4.9, max: 5, precision: 0.5 },
    reviewCount: 89,
    travelRadiusMeters: 20000,
    verificationStatus: 'verified',
    isAvailable: true,
  },
];

export class FakeServiceCatalogService implements ServiceCatalogService {
  async getCategories(): Promise<ServiceCategory[]> {
    return CATEGORIES;
  }

  async searchServices(query: string, categoryId?: string): Promise<ServiceDto[]> {
    const normalized = query.trim().toLowerCase();
    return SERVICES.filter((service) => {
      const matchesQuery =
        !normalized ||
        service.name.toLowerCase().includes(normalized) ||
        service.description.toLowerCase().includes(normalized);
      const matchesCategory = !categoryId || service.categoryId === categoryId;
      return matchesQuery && matchesCategory;
    });
  }

  async getServiceById(id: string): Promise<ServiceDto | null> {
    return SERVICES.find((service) => service.id === id) ?? null;
  }

  async getFeaturedServices(): Promise<ServiceDto[]> {
    return SERVICES.slice(0, 4);
  }

  async getServiceDetail(id: string): Promise<ServiceDetail | null> {
    const service = await this.getServiceById(id);
    if (!service) return null;
    return { service, professionals: PROFESSIONALS };
  }

  async getProfessionalById(id: string): Promise<ProfessionalDto | null> {
    return PROFESSIONALS.find((professional) => professional.id === id) ?? null;
  }

  async getServicesByProfessionalId(id: string): Promise<ServiceDto[]> {
    // Demo mapping: all professionals offer all services for now.
    return SERVICES.filter(() => PROFESSIONALS.some((professional) => professional.id === id));
  }
}

export const serviceCatalog = new FakeServiceCatalogService();
