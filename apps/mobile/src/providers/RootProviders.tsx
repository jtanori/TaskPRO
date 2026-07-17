import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@taskpro/ui';
import i18n from '../lib/i18n';
import { AuthProvider } from '../features/auth';
import { AppErrorBoundary } from '../components/AppErrorBoundary';
import { DefaultErrorFallback } from '../components/DefaultErrorFallback';

export interface RootProvidersProps {
  children: React.ReactNode;
}

export function RootProviders({ children }: RootProvidersProps) {
  return (
    <SafeAreaProvider>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme="light">
          <AppErrorBoundary
            fallback={({ error, reset }) => <DefaultErrorFallback error={error} reset={reset} />}
          >
            <AuthProvider>{children}</AuthProvider>
          </AppErrorBoundary>
        </ThemeProvider>
      </I18nextProvider>
    </SafeAreaProvider>
  );
}
