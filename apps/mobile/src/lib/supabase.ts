import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import { createClient, type SupportedStorage, type SupabaseClient } from '@supabase/supabase-js';
import { Config, isDevelopment, isLocal } from '../config';

class SecureStoreAdapter implements SupportedStorage {
  async getItem(key: string): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(key);
    } catch {
      return null;
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch {
      // SecureStore may be unavailable in some environments (e.g., web simulators).
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch {
      // Absence of the key is the desired end state.
    }
  }
}

function createNoOpClient(): SupabaseClient {
  // A minimal no-op Supabase client for development/local when credentials are missing.
  // This allows the app to launch and renders auth-dependent screens as signed-out.
  return new Proxy({} as SupabaseClient, {
    get(_target, prop) {
      if (prop === 'auth') {
        return {
          getSession: async () => ({ data: { session: null }, error: null }),
          onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
          signInWithPassword: async () => ({
            data: null,
            error: new Error('Supabase not configured'),
          }),
          signUp: async () => ({ data: null, error: new Error('Supabase not configured') }),
          signOut: async () => ({ error: null }),
        };
      }
      if (prop === 'from') {
        return () => ({
          select: () => ({ data: [], error: null }),
          insert: () => ({ data: null, error: new Error('Supabase not configured') }),
          update: () => ({ data: null, error: new Error('Supabase not configured') }),
          delete: () => ({ data: null, error: new Error('Supabase not configured') }),
        });
      }
      return () => ({ data: null, error: new Error('Supabase not configured') });
    },
  });
}

function createSupabaseClient(): SupabaseClient {
  if (!Config.supabase.url || !Config.supabase.anonKey) {
    if (isDevelopment() || isLocal()) {
      console.warn(
        '[supabase] Missing EXPO_PUBLIC_SUPABASE_URL or EXPO_PUBLIC_SUPABASE_ANON_KEY; using no-op client.'
      );
      return createNoOpClient();
    }
    throw new Error('supabaseUrl is required.');
  }

  return createClient(Config.supabase.url, Config.supabase.anonKey, {
    auth: {
      storage: new SecureStoreAdapter(),
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  });
}

export const supabase = createSupabaseClient();
