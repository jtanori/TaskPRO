import { describe, expect, it } from 'vitest';
import { FakeServiceCatalogService } from '../FakeServiceCatalogService';

describe('FakeServiceCatalogService', () => {
  const catalog = new FakeServiceCatalogService();

  it('returns categories', async () => {
    const categories = await catalog.getCategories();
    expect(categories.length).toBeGreaterThan(0);
    expect(categories[0]).toHaveProperty('id');
    expect(categories[0]).toHaveProperty('name');
  });

  it('returns featured services', async () => {
    const services = await catalog.getFeaturedServices();
    expect(services.length).toBeGreaterThan(0);
  });

  it('filters services by query', async () => {
    const services = await catalog.searchServices('limpieza');
    expect(services.length).toBeGreaterThan(0);
    expect(
      services.every(
        (s) =>
          s.name.toLowerCase().includes('limpieza') ||
          s.description.toLowerCase().includes('limpieza')
      )
    ).toBe(true);
  });

  it('filters services by category', async () => {
    const categories = await catalog.getCategories();
    const categoryId = categories[0].id;
    const services = await catalog.searchServices('', categoryId);
    expect(services.length).toBeGreaterThan(0);
    expect(services.every((s) => s.categoryId === categoryId)).toBe(true);
  });

  it('returns service detail', async () => {
    const services = await catalog.getFeaturedServices();
    const detail = await catalog.getServiceDetail(services[0].id);
    expect(detail).not.toBeNull();
    expect(detail?.service.id).toBe(services[0].id);
    expect(detail?.professionals.length).toBeGreaterThan(0);
  });
});
