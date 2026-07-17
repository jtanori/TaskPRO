import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Link, useRouter } from 'expo-router';
import { UserRole } from '@taskpro/types';
import { Password } from '@taskpro/domain';
import { Button, Card, TextInput, Typography } from '@taskpro/ui';
import { tokens } from '@taskpro/design-tokens';
import { useAuth } from '../AuthContext';

export default function RegisterScreen() {
  const { t } = useTranslation(['auth', 'common']);
  const router = useRouter();
  const { signUp, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.Customer);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordCheck = Password.validate(password);

  const handleSubmit = async () => {
    clearError();
    setIsSubmitting(true);
    try {
      await signUp(email, password, role);
      router.replace('/complete-profile');
    } catch {
      // Error is captured in auth context.
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Typography variant="headingL" style={styles.title}>
          {t('auth:registerTitle')}
        </Typography>

        <TextInput
          label={t('common:email')}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoComplete="email"
        />
        <TextInput
          label={t('common:password')}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          textContentType="newPassword"
          autoComplete="new-password"
        />

        <Typography variant="micro" color="textSecondary">
          {t('auth:passwordPolicy')}
        </Typography>

        <View style={styles.roleRow}>
          <Button
            title={t('common:customer')}
            variant={role === UserRole.Customer ? 'primary' : 'secondary'}
            onPress={() => setRole(UserRole.Customer)}
          />
          <Button
            title={t('common:technician')}
            variant={role === UserRole.Provider ? 'primary' : 'secondary'}
            onPress={() => setRole(UserRole.Provider)}
          />
        </View>

        {error ? (
          <Typography variant="bodyS" color="danger">
            {t('auth:registrationFailed')}
          </Typography>
        ) : null}

        <Button
          title={t('auth:createAccount')}
          onPress={() => void handleSubmit()}
          loading={isSubmitting}
          disabled={isSubmitting || !email || !passwordCheck.valid}
        />

        <Link href="/login" asChild>
          <Typography variant="bodyS" color="link" style={styles.link}>
            {t('auth:alreadyAccount')}
          </Typography>
        </Link>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: tokens.spacing.lg,
  },
  card: {
    gap: tokens.spacing.md,
  },
  title: {
    textAlign: 'center',
  },
  roleRow: {
    flexDirection: 'row',
    gap: tokens.spacing.md,
  },
  link: {
    textAlign: 'center',
    marginTop: tokens.spacing.sm,
  },
});
