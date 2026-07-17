import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { Button, Card, TextInput, Typography } from '@taskpro/ui';
import { tokens } from '@taskpro/design-tokens';
import { CategoryChip } from '../components/CategoryChip';
import { ServiceCard } from '../components/ServiceCard';
import { useCategories, useFeaturedServices } from '../useServiceCatalog';

export default function HomeScreen() {
  const { t } = useTranslation(['marketplace', 'common']);
  const router = useRouter();
  const { categories, isLoading: categoriesLoading } = useCategories();
  const { services, isLoading: servicesLoading } = useFeaturedServices();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    router.push({ pathname: '/services', params: { q: searchQuery } });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="headingL">{t('marketplace:homeTitle')}</Typography>

      <Card style={styles.searchCard}>
        <TextInput
          placeholder={t('marketplace:searchPlaceholder')}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={() => void handleSearch()}
          returnKeyType="search"
        />
        <Button title={t('marketplace:browseServices')} onPress={() => void handleSearch()} />
      </Card>

      <Typography variant="headingM">{t('marketplace:categoriesTitle')}</Typography>
      <View style={styles.chipRow}>
        {categoriesLoading ? (
          <Typography variant="bodyS" color="textSecondary">
            {t('common:loading')}
          </Typography>
        ) : (
          categories.map((category) => (
            <CategoryChip
              key={category.id}
              category={category}
              onPress={(cat) =>
                router.push({ pathname: '/services', params: { categoryId: cat.id } })
              }
            />
          ))
        )}
      </View>

      <Typography variant="headingM">{t('marketplace:servicesTitle')}</Typography>
      {servicesLoading ? (
        <Typography variant="bodyS" color="textSecondary">
          {t('common:loading')}
        </Typography>
      ) : (
        services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onPress={(s) => router.push({ pathname: '/services/[id]', params: { id: s.id } })}
          />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: tokens.spacing.lg,
    gap: tokens.spacing.lg,
  },
  searchCard: {
    gap: tokens.spacing.md,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: tokens.spacing.sm,
    marginBottom: tokens.spacing.md,
  },
});
