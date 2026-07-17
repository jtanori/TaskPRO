import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLocalSearchParams } from 'expo-router';
import { ChatBubble, ConversationHeader, MessageComposer, Typography } from '@taskpro/ui';
import { tokens } from '@taskpro/design-tokens';
import { useAuth } from '../../auth';
import { useConversation } from '../useConversation';
import { useSendMessage } from '../useSendMessage';

export default function ConversationScreen() {
  const { t } = useTranslation('communication');
  const { id } = useLocalSearchParams<{ id: string }>();
  const { session } = useAuth();
  const { conversation, isLoading, refresh } = useConversation(id, session?.user.id);
  const { sendMessage, status } = useSendMessage();
  const [draft, setDraft] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  const handleSend = useCallback(async () => {
    if (!id || !session?.user.id || draft.trim().length === 0) return;
    const sent = await sendMessage(id, session.user.id, draft.trim());
    if (sent) {
      setDraft('');
      await refresh();
    }
  }, [draft, id, refresh, sendMessage, session?.user.id]);

  useEffect(() => {
    if (conversation) {
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }, [conversation?.messages.length]);

  if (isLoading || !conversation) {
    return (
      <View style={styles.centered}>
        <Typography variant="bodyM" color="textSecondary">
          {t('common:loading')}
        </Typography>
      </View>
    );
  }

  const otherParticipantId = conversation.participantIds.find((pid) => pid !== session?.user.id);

  return (
    <View style={styles.container}>
      <ConversationHeader title={t('conversationTitle')} subtitle={otherParticipantId} />
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.messages}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
      >
        {conversation.messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message}
            isCurrentUser={message.senderId === session?.user.id}
            showSenderInitials={message.senderId === otherParticipantId ? 'T' : undefined}
          />
        ))}
      </ScrollView>
      <MessageComposer
        value={draft}
        onChangeText={setDraft}
        onSend={handleSend}
        loading={status === 'loading'}
        placeholder={t('messagePlaceholder')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messages: {
    padding: tokens.spacing.md,
    gap: tokens.spacing.xs,
  },
});
