import React from 'react';
import { StyleSheet, View } from 'react-native';
import { tokens } from '@taskpro/design-tokens';
import { Button } from '../foundation/Button';
import { TextInput } from '../foundation/TextInput';

export interface MessageComposerProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
}

export function MessageComposer({
  value,
  onChangeText,
  onSend,
  placeholder = 'Escribe un mensaje...',
  disabled = false,
  loading = false,
}: MessageComposerProps) {
  const handleSubmit = () => {
    if (value.trim().length === 0 || disabled || loading) return;
    onSend();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={handleSubmit}
          returnKeyType="send"
          editable={!disabled && !loading}
        />
      </View>
      <Button
        title="Enviar"
        onPress={handleSubmit}
        disabled={value.trim().length === 0 || disabled}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: tokens.spacing.sm,
    padding: tokens.spacing.md,
  },
  inputWrapper: {
    flex: 1,
  },
});
