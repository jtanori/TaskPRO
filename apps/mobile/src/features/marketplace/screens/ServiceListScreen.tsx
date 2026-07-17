import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { TextInput, Typography } from '@taskpro/ui';
import { tokens } from '@taskpro/design-tokens';
import { ServiceCard } from '../components/ServiceCard';
import { useServiceSearch } from '../useServiceCatalog';

export default function ServiceListScreen() {
  const { t } = useTranslation(['marketplace', 'common']);
  const router = useRouter();
  const { q, categoryId } = useLocalSearchParams<{ q?: string; categoryId?: string }>();
  const [query, setQuery] = useState(q ?? '');
  const { services, isLoading, error, search } = useServiceSearch();

  useEffect(() => {
    void search(q ?? '', categoryId);
  }, [q, categoryId, search]);

  const handleSearch = () => {
    void search(query, categoryId);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        placeholder={t('marketplace:searchPlaceholder')}
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={() => void handleSearch()}
        returnKeyType="search"
      />

      {isLoading ? (
        <Typography variant="bodyM" color="textSecondary">
          {t('common:loading')}
        </Typography>
      ) : error ? (
        <Typography variant="bodyM" color="danger">
          {t('common:error')}
        </Typography>
      ) : services.length === 0 ? (
        <Typography variant="bodyM" color="textSecondary">
          {t('marketplace:noResults')}
        </Typography>
      ) : (
        <View style={styles.list}>
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onPress={(s) => router.push({ pathname: '/services/[id]', params: { id: s.id } })}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: tokens.spacing.lg,
  },
  list: {
    marginTop: tokens.spacing.md,
  },
});
