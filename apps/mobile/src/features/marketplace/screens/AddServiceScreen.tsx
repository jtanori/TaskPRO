import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Card, Typography } from '@taskpro/ui';
import { tokens } from '@taskpro/design-tokens';

export default function AddServiceScreen() {
  const { t } = useTranslation('marketplace');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="headingL">{t('addService')}</Typography>
      <Card>
        <Typography variant="bodyM" color="textSecondary">
          {t('addServicePlaceholder')}
        </Typography>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: tokens.spacing.lg,
    gap: tokens.spacing.md,
  },
});
