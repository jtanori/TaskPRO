import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { Button, Card, ServiceCard, Typography } from '@taskpro/ui';
import { tokens } from '@taskpro/design-tokens';
import { useAuth } from '../../auth';
import { useTechnicianServices } from '../useServiceCatalog';

export default function TechnicianServicesScreen() {
  const { t } = useTranslation('marketplace');
  const router = useRouter();
  const { session } = useAuth();
  const { services, isLoading } = useTechnicianServices(session?.user.id);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="headingL">{t('myServices')}</Typography>
      <Button title={t('addService')} onPress={() => router.push('/services/add')} />

      {isLoading ? (
        <Typography variant="bodyM" color="textSecondary">
          {t('common:loading')}
        </Typography>
      ) : services.length === 0 ? (
        <Card>
          <Typography variant="bodyM" color="textSecondary">
            {t('noServices')}
          </Typography>
        </Card>
      ) : (
        services.map((service) => <ServiceCard key={service.id} service={service} />)
      )}
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
