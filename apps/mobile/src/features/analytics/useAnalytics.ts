import { useCallback, useEffect, useState } from 'react';
import type { MetricDto } from '@taskpro/types';
import { analyticsService } from './FakeAnalyticsService';

interface UseAnalyticsResult {
  metrics: MetricDto[];
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export function useAnalytics(): UseAnalyticsResult {
  const [metrics, setMetrics] = useState<MetricDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await analyticsService.getMetrics();
      setMetrics(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load analytics'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { metrics, isLoading, error, refresh };
}
