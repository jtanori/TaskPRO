import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { Button, Card, Typography } from '@taskpro/ui';
import { tokens } from '@taskpro/design-tokens';
import { useAuth } from '../../auth/AuthContext';

export default function TechnicianHomeScreen() {
  const { t } = useTranslation(['marketplace', 'common']);
  const router = useRouter();
  const { signOut, session } = useAuth();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Typography variant="headingL">{t('marketplace:homeTitle')}</Typography>
        <Typography variant="bodyM" color="textSecondary">
          {session?.user.email}
        </Typography>
      </Card>

      <View style={styles.actions}>
        <Button
          title={t('marketplace:myJobs')}
          variant="primary"
          onPress={() => router.push('/jobs')}
        />
        <Button
          title={t('marketplace:messages')}
          variant="secondary"
          onPress={() => router.push('/messages')}
        />
        <Button
          title={t('marketplace:notifications')}
          variant="secondary"
          onPress={() => router.push('/notifications')}
        />
        <Button
          title={t('common:settings')}
          variant="secondary"
          onPress={() => router.push('/settings')}
        />
        <Button title={t('common:signOut')} variant="ghost" onPress={() => void signOut()} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: tokens.spacing.lg,
  },
  card: {
    marginBottom: tokens.spacing.lg,
  },
  actions: {
    gap: tokens.spacing.md,
  },
});
