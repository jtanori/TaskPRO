import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Card, ProfessionalCard, ServiceCard, Typography } from '@taskpro/ui';
import { tokens } from '@taskpro/design-tokens';
import { useProfessionalProfile } from '../useServiceCatalog';

export default function ProfessionalProfileScreen() {
  const { t } = useTranslation('marketplace');
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { professional, services, isLoading } = useProfessionalProfile(id);

  if (isLoading || !professional) {
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
      <ProfessionalCard professional={professional} />

      <Typography variant="headingM">{t('servicesTitle')}</Typography>
      {services.length === 0 ? (
        <Typography variant="bodyM" color="textSecondary">
          {t('noResults')}
        </Typography>
      ) : (
        services.map((service) => (
          <Pressable
            key={service.id}
            onPress={() => router.push({ pathname: '/services/[id]', params: { id: service.id } })}
          >
            <ServiceCard service={service} />
          </Pressable>
        ))
      )}

      <Card style={styles.reviewsCard}>
        <Typography variant="headingS">{t('reviewsTitle')}</Typography>
        <Typography variant="bodyM" color="textSecondary">
          {t('reviewsPlaceholder')}
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewsCard: {
    gap: tokens.spacing.sm,
  },
});
