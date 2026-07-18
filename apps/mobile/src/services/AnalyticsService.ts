import type { AnalyticsEventDto } from '@taskpro/types';

export interface AnalyticsService {
  track(event: AnalyticsEventDto): Promise<void>;
  identify(userId: string, traits?: Record<string, unknown>): Promise<void>;
  screen(name: string, properties?: Record<string, unknown>): Promise<void>;
}

export class ConsoleAnalyticsService implements AnalyticsService {
  async track(event: AnalyticsEventDto): Promise<void> {
    console.log('[Analytics] track', event);
  }

  async identify(userId: string, traits?: Record<string, unknown>): Promise<void> {
    console.log('[Analytics] identify', { userId, traits });
  }

  async screen(name: string, properties?: Record<string, unknown>): Promise<void> {
    console.log('[Analytics] screen', { name, properties });
  }
}

export const analyticsService = new ConsoleAnalyticsService();
