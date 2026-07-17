import React from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { Card, Typography } from '@taskpro/ui';
import { tokens } from '@taskpro/design-tokens';
import type { BookingDto } from '@taskpro/types';
import { useAuth } from '../../auth';
import { BookingStatusBadge } from '../components/BookingStatusBadge';
import { useTechnicianJobs } from '../useBookings';

function formatMinor(amountMinor: number, currency: string): string {
  const major = (amountMinor / 100).toFixed(2);
  return `$${major} ${currency}`;
}

export default function TechnicianJobsScreen() {
  const { t } = useTranslation('booking');
  const router = useRouter();
  const { session } = useAuth();
  const { jobs, isLoading } = useTechnicianJobs(session?.user.id as BookingDto['professionalId']);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="headingL">{t('myJobs')}</Typography>

      {isLoading ? (
        <Typography variant="bodyM" color="textSecondary">
          {t('common:loading')}
        </Typography>
      ) : jobs.length === 0 ? (
        <Typography variant="bodyM" color="textSecondary">
          {t('noJobs')}
        </Typography>
      ) : (
        jobs.map((job) => (
          <Pressable
            key={job.id}
            onPress={() => router.push({ pathname: '/jobs/[id]', params: { id: job.id } })}
          >
            <Card style={styles.card}>
              <Typography variant="headingS">{job.serviceId}</Typography>
              <Typography variant="bodyS" color="textSecondary">
                {formatMinor(job.price.amountMinor, job.price.currency)}
              </Typography>
              <Typography variant="bodyS" color="textSecondary">
                {new Date(job.scheduledAt).toLocaleString('es-MX')}
              </Typography>
              <BookingStatusBadge status={job.status} />
            </Card>
          </Pressable>
        ))
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
  card: {
    gap: tokens.spacing.xs,
  },
});
