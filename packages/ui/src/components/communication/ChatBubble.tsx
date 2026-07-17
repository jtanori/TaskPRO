import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { MessageDto, MessageType } from '@taskpro/types';
import { tokens } from '@taskpro/design-tokens';
import { useTheme } from '../../theme/ThemeProvider';
import { Typography } from '../foundation/Typography';

export interface ChatBubbleProps {
  message: MessageDto;
  isCurrentUser: boolean;
  showSenderInitials?: string;
}

const typeLabels: Record<MessageType, string> = {
  text: '',
  photo: '📷 ',
  video: '🎥 ',
  location: '📍 ',
  file: '📎 ',
  system_event: '🔔 ',
};

export function ChatBubble({ message, isCurrentUser, showSenderInitials }: ChatBubbleProps) {
  const theme = useTheme();
  const isSystem = message.type === 'system_event';

  if (isSystem) {
    return (
      <View style={styles.systemContainer}>
        <View
          style={[
            styles.bubble,
            styles.systemBubble,
            { backgroundColor: theme.colors.surfaceSecondary, borderColor: theme.colors.border },
          ]}
        >
          <Typography variant="bodyS" color="textSecondary">
            {typeLabels[message.type]}
            {message.content}
          </Typography>
        </View>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        isCurrentUser ? styles.currentUserContainer : styles.otherUserContainer,
      ]}
    >
      {!isCurrentUser && showSenderInitials ? (
        <View style={styles.avatar}>
          <Typography variant="caption" color="textSecondary">
            {showSenderInitials.slice(0, 2).toUpperCase()}
          </Typography>
        </View>
      ) : null}
      <View
        style={[
          styles.bubble,
          {
            backgroundColor: isCurrentUser ? theme.colors.primary : theme.colors.surfaceSecondary,
            borderColor: theme.colors.border,
          },
        ]}
      >
        <Typography variant="bodyM" color={isCurrentUser ? 'textInverse' : 'text'}>
          {typeLabels[message.type]}
          {message.content}
        </Typography>
        <Typography variant="caption" color={isCurrentUser ? 'textInverse' : 'textSecondary'}>
          {new Date(message.sentAt).toLocaleTimeString('es-MX', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: tokens.spacing.xs,
    maxWidth: '80%',
  },
  currentUserContainer: {
    alignSelf: 'flex-end',
  },
  otherUserContainer: {
    alignSelf: 'flex-start',
  },
  systemContainer: {
    alignItems: 'center',
    marginVertical: tokens.spacing.xs,
  },
  bubble: {
    borderRadius: tokens.radius.lg,
    borderWidth: tokens.borderWidth.hairline,
    padding: tokens.spacing.md,
    gap: tokens.spacing.xs,
  },
  systemBubble: {
    borderRadius: tokens.radius.pill,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: tokens.color.neutral.gray100,
    borderRadius: tokens.radius.circle,
    height: tokens.size.avatar.xs,
    justifyContent: 'center',
    marginRight: tokens.spacing.sm,
    width: tokens.size.avatar.xs,
  },
});
