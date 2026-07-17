import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { Button, Card, TextInput, Typography } from '@taskpro/ui';
import { tokens } from '@taskpro/design-tokens';
import { useAuth } from '../../auth/AuthContext';
import { useProfile } from '../useProfile';

export default function EditProfileScreen() {
  const { t } = useTranslation(['profile', 'common']);
  const router = useRouter();
  const { session } = useAuth();
  const { profile, isLoading, update } = useProfile(session?.user.id);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
      setPhone(profile.phone ?? '');
      setBio(profile.bio ?? '');
    }
  }, [profile]);

  const handleSubmit = async () => {
    if (!session) return;
    setIsSubmitting(true);
    try {
      await update({
        userId: session.user.id,
        firstName,
        lastName,
        phone,
        bio,
      });
      router.back();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Typography variant="bodyM" color="textSecondary">
          {t('common:loading')}
        </Typography>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Typography variant="headingL">{t('profile:editTitle')}</Typography>

        <TextInput
          label={t('profile:firstName')}
          value={firstName}
          onChangeText={setFirstName}
          textContentType="givenName"
        />
        <TextInput
          label={t('profile:lastName')}
          value={lastName}
          onChangeText={setLastName}
          textContentType="familyName"
        />
        <TextInput
          label={t('profile:phone')}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          label={t('profile:bio')}
          value={bio}
          onChangeText={setBio}
          multiline
          numberOfLines={4}
        />

        <Button
          title={t('common:save')}
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
    padding: tokens.spacing.lg,
  },
  card: {
    gap: tokens.spacing.md,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
