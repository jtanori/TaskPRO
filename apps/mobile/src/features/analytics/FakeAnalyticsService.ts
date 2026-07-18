import type { AnalyticsEventDto, MetricDto } from '@taskpro/types';
import type { AnalyticsService } from './AnalyticsService';

export class FakeAnalyticsService implements AnalyticsService {
  private readonly events: AnalyticsEventDto[] = [];

  async getMetrics(): Promise<MetricDto[]> {
    return [
      { name: 'Reservas completadas', value: 128, change: 12, period: 'month' },
      { name: 'Reseñas recibidas', value: 84, change: 8, period: 'month' },
      { name: 'Tasa de conversión', value: 64, unit: '%', change: -2, period: 'month' },
    ];
  }

  async track(event: AnalyticsEventDto): Promise<void> {
    this.events.push(event);
  }
}

export const analyticsService = new FakeAnalyticsService();
