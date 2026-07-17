import React from 'react';
import {
  StyleSheet,
  TextInput as RNTextInput,
  View,
  type TextInputProps as RNTextInputProps,
} from 'react-native';
import { tokens } from '@taskpro/design-tokens';
import { useTheme } from '../../theme/ThemeProvider';
import { Typography } from './Typography';

export interface TextInputProps extends Omit<RNTextInputProps, 'style'> {
  label?: string;
  error?: boolean;
}

export function TextInput({ label, error = false, ...rest }: TextInputProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {label ? (
        <Typography variant="bodyS" color="textSecondary" style={styles.label}>
          {label}
        </Typography>
      ) : null}
      <RNTextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.surface,
            borderColor: error ? theme.colors.danger : theme.colors.border,
            color: theme.colors.text,
            height: tokens.size.component.textInputHeight,
          },
        ]}
        placeholderTextColor={theme.colors.placeholder}
        accessibilityRole="text"
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    marginBottom: tokens.spacing.xs,
  },
  input: {
    borderRadius: tokens.radius.md,
    borderWidth: tokens.borderWidth.hairline,
    fontSize: tokens.typography.fontSize.bodyM,
    paddingHorizontal: tokens.spacing.md,
    width: '100%',
  },
});
