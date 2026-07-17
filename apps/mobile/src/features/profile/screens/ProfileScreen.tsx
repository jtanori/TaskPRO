import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { Button, Card, Typography } from '@taskpro/ui';
import { tokens } from '@taskpro/design-tokens';
import { useAuth } from '../../auth/AuthContext';
import { useProfile } from '../useProfile';

export default function ProfileScreen() {
  const { t } = useTranslation(['profile', 'common']);
  const router = useRouter();
  const { session, signOut } = useAuth();
  const { profile, isLoading } = useProfile(session?.user.id);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Typography variant="headingL">{t('profile:title')}</Typography>
        {isLoading ? (
          <Typography variant="bodyM" color="textSecondary">
            {t('common:loading')}
          </Typography>
        ) : (
          <>
            <Typography variant="bodyM">{profile?.displayName ?? session?.user.email}</Typography>
            <Typography variant="bodyS" color="textSecondary">
              {session?.user.email}
            </Typography>
          </>
        )}
      </Card>

      <View style={styles.actions}>
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
    gap: tokens.spacing.sm,
    marginBottom: tokens.spacing.lg,
  },
  actions: {
    gap: tokens.spacing.md,
  },
});
