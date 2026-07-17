import { useCallback, useEffect, useState } from 'react';
import type { ProfileDto, UserId } from '@taskpro/types';
import { profileService } from './FakeProfileService';
import type { CreateProfileInput, UpdateProfileInput } from './types';

interface UseProfileResult {
  profile: ProfileDto | null;
  isLoading: boolean;
  error: Error | null;
  create: (input: CreateProfileInput) => Promise<ProfileDto>;
  update: (input: UpdateProfileInput) => Promise<ProfileDto>;
  refresh: (userId: UserId) => Promise<void>;
}

export function useProfile(userId: UserId | undefined): UseProfileResult {
  const [profile, setProfile] = useState<ProfileDto | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async (id: UserId) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await profileService.getProfile(id);
      setProfile(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Profile load failed'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      void refresh(userId);
    }
  }, [userId, refresh]);

  const create = useCallback(async (input: CreateProfileInput) => {
    const result = await profileService.createProfile(input);
    setProfile(result);
    return result;
  }, []);

  const update = useCallback(async (input: UpdateProfileInput) => {
    const result = await profileService.updateProfile(input);
    setProfile(result);
    return result;
  }, []);

  return { profile, isLoading, error, create, update, refresh };
}
