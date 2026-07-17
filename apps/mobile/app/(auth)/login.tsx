import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';
import { UserRole } from '@taskpro/types';
import { Button, Card, TextInput, Typography } from '@taskpro/ui';
import { tokens } from '@taskpro/design-tokens';
import { useAuth } from '../../src/hooks/useAuth';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('customer@taskpro.local');
  const [password, setPassword] = useState('password');

  const handleSignIn = (role: UserRole) => {
    void signIn(email, role);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Typography variant="headingL" style={styles.title}>
          TaskPRO
        </Typography>
        <Typography variant="bodyM" color="textSecondary" style={styles.subtitle}>
          Sign in to continue
        </Typography>

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          textContentType="password"
        />

        <View style={styles.actions}>
          <Button title="Sign in as Customer" onPress={() => handleSignIn(UserRole.Customer)} />
          <Button
            title="Sign in as Technician"
            variant="secondary"
            onPress={() => handleSignIn(UserRole.Provider)}
          />
        </View>

        <Link href="/register" asChild>
          <Typography variant="bodyS" color="link" style={styles.link}>
            Create an account
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
  subtitle: {
    textAlign: 'center',
    marginBottom: tokens.spacing.md,
  },
  actions: {
    gap: tokens.spacing.sm,
    marginTop: tokens.spacing.md,
  },
  link: {
    textAlign: 'center',
    marginTop: tokens.spacing.sm,
  },
});
