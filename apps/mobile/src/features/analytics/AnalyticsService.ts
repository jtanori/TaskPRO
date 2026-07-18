import type { AnalyticsEventDto, MetricDto } from '@taskpro/types';

export interface AnalyticsService {
  getMetrics(): Promise<MetricDto[]>;
  track(event: AnalyticsEventDto): Promise<void>;
}
