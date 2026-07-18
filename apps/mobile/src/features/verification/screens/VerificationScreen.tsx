import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button, Card, VerificationBadge } from '@taskpro/ui';
import { tokens } from '@taskpro/design-tokens';
import { VerificationDocumentType } from '@taskpro/types';
import { Typography } from '@taskpro/ui';
import { useAuth } from '../../auth';
import { useVerification } from '../useVerification';

export default function VerificationScreen() {
  const { t } = useTranslation('verification');
  const { session } = useAuth();
  const { verification, isLoading, submit, isSubmitting } = useVerification(session?.user.id);

  if (isLoading || !verification) {
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
      <Card style={styles.card}>
        <Typography variant="bodyM" color="textSecondary">
          {t('statusLabel')}
        </Typography>
        <VerificationBadge status={verification.status} />
        {verification.status === 'unverified' ? (
          <Button
            title={t('submitDocument')}
            loading={isSubmitting}
            onPress={() =>
              void submit(
                VerificationDocumentType.GovernmentId,
                'https://docs.test/placeholder.pdf'
              )
            }
          />
        ) : null}
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
  card: {
    gap: tokens.spacing.md,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
