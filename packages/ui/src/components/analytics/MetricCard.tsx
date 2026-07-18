import React from 'react';
import { StyleSheet } from 'react-native';
import type { MetricDto } from '@taskpro/types';
import { tokens } from '@taskpro/design-tokens';
import { Card } from '../foundation/Card';
import { Typography } from '../foundation/Typography';

export interface MetricCardProps {
  metric: MetricDto;
}

export function MetricCard({ metric }: MetricCardProps) {
  const changeColor = metric.change && metric.change >= 0 ? 'success' : 'danger';
  const changeSymbol = metric.change && metric.change >= 0 ? '↑' : '↓';

  return (
    <Card style={styles.container} accessibilityLabel="MetricCard">
      <Typography variant="bodyS" color="textSecondary">
        {metric.name}
      </Typography>
      <Typography variant="headingM" color="text">
        {metric.value}
        {metric.unit && (
          <Typography variant="bodyS" color="textSecondary">
            {' '}
            {metric.unit}
          </Typography>
        )}
      </Typography>
      {typeof metric.change === 'number' && (
        <Typography variant="bodyS" color={changeColor}>
          {changeSymbol} {Math.abs(metric.change)}%
        </Typography>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: tokens.spacing.xs,
    minWidth: 140,
  },
});
