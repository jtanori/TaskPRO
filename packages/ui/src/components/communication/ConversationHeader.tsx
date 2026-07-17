import React from 'react';
import { StyleSheet, View } from 'react-native';
import { tokens } from '@taskpro/design-tokens';
import { Avatar } from '../foundation/Avatar';
import { Typography } from '../foundation/Typography';

export interface ConversationHeaderProps {
  title: string;
  subtitle?: string;
  avatarInitials?: string;
}

export function ConversationHeader({ title, subtitle, avatarInitials }: ConversationHeaderProps) {
  return (
    <View style={styles.container}>
      <Avatar initials={avatarInitials} size="medium" />
      <View style={styles.text}>
        <Typography variant="headingS" numberOfLines={1}>
          {title}
        </Typography>
        {subtitle ? (
          <Typography variant="bodyS" color="textSecondary" numberOfLines={1}>
            {subtitle}
          </Typography>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: tokens.spacing.md,
    padding: tokens.spacing.md,
  },
  text: {
    flex: 1,
    justifyContent: 'center',
  },
});
