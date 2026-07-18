import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { ProfessionalDto } from '@taskpro/types';
import { tokens } from '@taskpro/design-tokens';
import { Avatar } from '../foundation/Avatar';
import { Card } from '../foundation/Card';
import { Typography } from '../foundation/Typography';

export interface ProfessionalCardProps {
  professional: ProfessionalDto;
}

export function ProfessionalCard({ professional }: ProfessionalCardProps) {
  const initials = professional.bio ? professional.bio.slice(0, 2) : 'PR';

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <Avatar initials={initials} size="large" />
        <View style={styles.info}>
          <Typography variant="headingS" numberOfLines={1}>
            {professional.bio ?? 'Profesional'}
          </Typography>
          <Typography variant="bodyS" color="textSecondary">
            {professional.yearsExperience} años de experiencia
          </Typography>
        </View>
      </View>

      <View style={styles.row}>
        <Typography variant="bodyM" color="textSecondary">
          ⭐ {professional.rating.value}/{professional.rating.max}
        </Typography>
        <Typography variant="bodyM" color="textSecondary">
          {professional.reviewCount} reseñas
        </Typography>
        <Typography variant="bodyM" color="success">
          {professional.verification.status}
        </Typography>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: tokens.spacing.sm,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: tokens.spacing.md,
  },
  info: {
    flex: 1,
    gap: tokens.spacing.xs,
  },
  row: {
    flexDirection: 'row',
    gap: tokens.spacing.md,
  },
});
