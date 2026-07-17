import * as SecureStore from 'expo-secure-store';
import type { UserSession } from '../types/auth';

const SESSION_KEY = 'taskpro.session';

export async function loadSession(): Promise<UserSession | null> {
  try {
    const raw = await SecureStore.getItemAsync(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as UserSession;
  } catch {
    return null;
  }
}

export async function saveSession(session: UserSession): Promise<void> {
  try {
    await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(session));
  } catch {
    // SecureStore is unavailable in some environments (e.g., web simulators).
    // E5 only defines the persistence contract; later expeditions will handle
    // fallback storage and encryption.
  }
}

export async function clearSession(): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(SESSION_KEY);
  } catch {
    // Fallthrough: absence of the key is the desired end state.
  }
}
