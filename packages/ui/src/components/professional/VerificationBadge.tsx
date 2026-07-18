import React from 'react';
import { StyleSheet, View } from 'react-native';
import { VerificationStatus } from '@taskpro/types';
import { Typography } from '../foundation/Typography';

export interface VerificationBadgeProps {
  status: VerificationStatus;
}

const LABELS: Record<VerificationStatus, string> = {
  [VerificationStatus.Unverified]: 'No verificado',
  [VerificationStatus.Pending]: 'En revisión',
  [VerificationStatus.Verified]: 'Verificado',
  [VerificationStatus.Rejected]: 'Rechazado',
};

const COLORS: Record<VerificationStatus, 'textSecondary' | 'warning' | 'success' | 'danger'> = {
  [VerificationStatus.Unverified]: 'textSecondary',
  [VerificationStatus.Pending]: 'warning',
  [VerificationStatus.Verified]: 'success',
  [VerificationStatus.Rejected]: 'danger',
};

export function VerificationBadge({ status }: VerificationBadgeProps) {
  return (
    <View style={styles.container} accessibilityLabel="VerificationBadge">
      <Typography variant="bodyS" color={COLORS[status]}>
        {LABELS[status]}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
  },
});
