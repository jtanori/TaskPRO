import React from 'react';
import { StyleSheet, View } from 'react-native';
import { tokens } from '@taskpro/design-tokens';
import { Card } from '../foundation/Card';
import { Typography } from '../foundation/Typography';

export interface AnalyticsChartProps {
  title?: string;
}

export function AnalyticsChart({ title = 'Métricas' }: AnalyticsChartProps) {
  return (
    <Card style={styles.container} accessibilityLabel="AnalyticsChart">
      <Typography variant="headingS" color="text">
        {title}
      </Typography>
      <View style={styles.bars}>
        {[0.4, 0.7, 0.5, 0.9, 0.6].map((height, index) => (
          <View
            key={index}
            style={[
              styles.bar,
              {
                height: `${Math.round(height * 100)}%`,
                backgroundColor: tokens.color.primary.blue,
              },
            ]}
          />
        ))}
      </View>
      <Typography variant="bodyS" color="textSecondary">
        Vista previa de análisis
      </Typography>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: tokens.spacing.md,
  },
  bars: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: tokens.spacing.sm,
    height: 120,
  },
  bar: {
    borderRadius: tokens.radius.sm,
    flex: 1,
  },
});
