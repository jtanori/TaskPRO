import { describe, expect, it, vi } from 'vitest';

vi.mock('expo-localization', () => ({
  locale: 'es-MX',
  locales: ['es-MX'],
  timezone: 'America/Mexico_City',
  isoCurrencyCodes: ['MXN'],
}));

describe('i18n', () => {
  it('initializes with Spanish (Mexico) as fallback', async () => {
    const { default: i18n } = await import('../i18n');
    expect(i18n.language).toBe('es-MX');
    expect(i18n.options.fallbackLng).toEqual(['es-MX']);
  });

  it('translates common keys', async () => {
    const { default: i18n } = await import('../i18n');
    expect(i18n.t('common:signIn')).toBe('Iniciar sesión');
  });

  it('translates auth keys', async () => {
    const { default: i18n } = await import('../i18n');
    expect(i18n.t('auth:loginTitle')).toBe('Inicia sesión en TaskPRO');
  });
});
