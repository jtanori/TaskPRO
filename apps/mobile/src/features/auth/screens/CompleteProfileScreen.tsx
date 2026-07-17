import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { Currency, Locale, UserRole } from '@taskpro/types';
import { Button, Card, TextInput, Typography } from '@taskpro/ui';
import { tokens } from '@taskpro/design-tokens';
import { useAuth } from '../AuthContext';
import { useProfile } from '../../profile/useProfile';

export default function CompleteProfileScreen() {
  const { t } = useTranslation(['profile', 'common']);
  const router = useRouter();
  const { session } = useAuth();
  const { create } = useProfile(session?.user.id);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!session) return;
    setIsSubmitting(true);
    try {
      await create({
        userId: session.user.id,
        firstName,
        lastName,
        phone,
        locale: Locale.Es,
        currency: Currency.MXN,
        timezone: 'America/Mexico_City',
      });
      const home = session.user.role === UserRole.Provider ? '/(technician)' : '/(customer)';
      router.replace(home);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Typography variant="headingL">{t('profile:completeTitle')}</Typography>
        <Typography variant="bodyM" color="textSecondary">
          {t('profile:completeSubtitle')}
        </Typography>

        <TextInput
          label={t('profile:firstName')}
          value={firstName}
          onChangeText={setFirstName}
          textContentType="givenName"
          autoComplete="given-name"
        />
        <TextInput
          label={t('profile:lastName')}
          value={lastName}
          onChangeText={setLastName}
          textContentType="familyName"
          autoComplete="family-name"
        />
        <TextInput
          label={t('profile:phone')}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          autoComplete="tel"
        />

        <Button
          title={t('common:continue')}
          onPress={() => void handleSubmit()}
          loading={isSubmitting}
          disabled={isSubmitting || !firstName || !lastName}
        />
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
});
