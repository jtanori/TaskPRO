import { useCallback, useEffect, useState } from 'react';
import type { ServiceDto } from '@taskpro/types';
import { serviceCatalog } from './FakeServiceCatalogService';
import type { ServiceCategory, ServiceDetail } from './ServiceCatalogService';

interface UseCategoriesResult {
  categories: ServiceCategory[];
  isLoading: boolean;
  error: Error | null;
}

export function useCategories(): UseCategoriesResult {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    serviceCatalog
      .getCategories()
      .then(setCategories)
      .catch((err) => setError(err instanceof Error ? err : new Error('Failed to load categories')))
      .finally(() => setIsLoading(false));
  }, []);

  return { categories, isLoading, error };
}

interface UseFeaturedServicesResult {
  services: ServiceDto[];
  isLoading: boolean;
  error: Error | null;
}

export function useFeaturedServices(): UseFeaturedServicesResult {
  const [services, setServices] = useState<ServiceDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    serviceCatalog
      .getFeaturedServices()
      .then(setServices)
      .catch((err) => setError(err instanceof Error ? err : new Error('Failed to load services')))
      .finally(() => setIsLoading(false));
  }, []);

  return { services, isLoading, error };
}

interface UseServiceSearchResult {
  services: ServiceDto[];
  isLoading: boolean;
  error: Error | null;
  search: (query: string, categoryId?: string) => Promise<void>;
}

export function useServiceSearch(): UseServiceSearchResult {
  const [services, setServices] = useState<ServiceDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const search = useCallback(async (query: string, categoryId?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await serviceCatalog.searchServices(query, categoryId);
      setServices(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Search failed'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { services, isLoading, error, search };
}

interface UseServiceDetailResult {
  detail: ServiceDetail | null;
  isLoading: boolean;
  error: Error | null;
}

export function useServiceDetail(id: string | undefined): UseServiceDetailResult {
  const [detail, setDetail] = useState<ServiceDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    serviceCatalog
      .getServiceDetail(id)
      .then(setDetail)
      .catch((err) => setError(err instanceof Error ? err : new Error('Failed to load service')))
      .finally(() => setIsLoading(false));
  }, [id]);

  return { detail, isLoading, error };
}
