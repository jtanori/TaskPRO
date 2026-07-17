import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Link, useRouter } from 'expo-router';
import { Button, Card, TextInput, Typography } from '@taskpro/ui';
import { tokens } from '@taskpro/design-tokens';
import { useAuth } from '../AuthContext';

export default function LoginScreen() {
  const { t } = useTranslation(['auth', 'common']);
  const router = useRouter();
  const { signIn, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    clearError();
    setIsSubmitting(true);
    try {
      await signIn(email, password);
      router.replace('/(customer)');
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
          {t('auth:loginTitle')}
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
          textContentType="password"
          autoComplete="password"
        />

        {error ? (
          <Typography variant="bodyS" color="danger">
            {t('auth:invalidCredentials')}
          </Typography>
        ) : null}

        <Button
          title={t('common:signIn')}
          onPress={() => void handleSubmit()}
          loading={isSubmitting}
          disabled={isSubmitting || !email || !password}
        />

        <Link href="/register" asChild>
          <Typography variant="bodyS" color="link" style={styles.link}>
            {t('auth:noAccount')}
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
  link: {
    textAlign: 'center',
    marginTop: tokens.spacing.sm,
  },
});
