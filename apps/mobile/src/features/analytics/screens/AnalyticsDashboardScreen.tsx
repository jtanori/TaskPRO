import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AnalyticsChart, MetricCard, Typography } from '@taskpro/ui';
import { tokens } from '@taskpro/design-tokens';
import { useAnalytics } from '../useAnalytics';

export default function AnalyticsDashboardScreen() {
  const { t } = useTranslation('analytics');
  const { metrics, isLoading } = useAnalytics();

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Typography variant="bodyM" color="textSecondary">
          {t('common:loading')}
        </Typography>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="headingL">{t('title')}</Typography>
      <View style={styles.metrics}>
        {metrics.map((metric) => (
          <MetricCard key={metric.name} metric={metric} />
        ))}
      </View>
      <AnalyticsChart title={t('activityTitle')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: tokens.spacing.lg,
    gap: tokens.spacing.md,
  },
  metrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: tokens.spacing.md,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
