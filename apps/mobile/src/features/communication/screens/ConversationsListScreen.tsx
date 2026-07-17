import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { Card, Typography } from '@taskpro/ui';
import { tokens } from '@taskpro/design-tokens';
import { useAuth } from '../../auth';
import { Badge } from '@taskpro/ui';
import { useConversations } from '../useConversations';

export default function ConversationsListScreen() {
  const { t } = useTranslation('communication');
  const router = useRouter();
  const { session } = useAuth();
  const { conversations, isLoading } = useConversations(session?.user.id);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="headingL">{t('messages')}</Typography>

      {isLoading ? (
        <Typography variant="bodyM" color="textSecondary">
          {t('common:loading')}
        </Typography>
      ) : conversations.length === 0 ? (
        <Typography variant="bodyM" color="textSecondary">
          {t('noConversations')}
        </Typography>
      ) : (
        conversations.map((conversation) => (
          <Pressable
            key={conversation.id}
            onPress={() =>
              router.push({ pathname: '/messages/[id]', params: { id: conversation.id } })
            }
          >
            <Card style={styles.card}>
              <View style={styles.row}>
                <Typography variant="headingS" style={styles.title}>
                  {t('conversationTitle', { index: 1 })}
                </Typography>
                {conversation.unreadCount > 0 ? (
                  <Badge status="default" label={String(conversation.unreadCount)} />
                ) : null}
              </View>
              <Typography variant="bodyS" color="textSecondary" numberOfLines={1}>
                {conversation.messages[conversation.messages.length - 1]?.content ??
                  t('noMessages')}
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
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
  },
});
