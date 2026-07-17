import React from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Card, Typography } from '@taskpro/ui';
import { tokens } from '@taskpro/design-tokens';
import { useAuth } from '../../auth';
import { useNotifications } from '../useNotifications';

export default function NotificationsScreen() {
  const { t } = useTranslation('communication');
  const { session } = useAuth();
  const { notifications, isLoading, markAsRead } = useNotifications(session?.user.id);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="headingL">{t('notifications')}</Typography>

      {isLoading ? (
        <Typography variant="bodyM" color="textSecondary">
          {t('common:loading')}
        </Typography>
      ) : notifications.length === 0 ? (
        <Typography variant="bodyM" color="textSecondary">
          {t('noNotifications')}
        </Typography>
      ) : (
        notifications.map((notification) => (
          <Pressable key={notification.id} onPress={() => void markAsRead(notification.id)}>
            <Card style={[styles.card, notification.status === 'read' && styles.readCard]}>
              <Typography variant="headingS">{notification.title}</Typography>
              <Typography variant="bodyM" color="textSecondary">
                {notification.body}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {new Date(notification.createdAt).toLocaleString('es-MX')}
              </Typography>
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
  readCard: {
    opacity: tokens.opacity.disabled,
  },
});
