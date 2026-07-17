import type { ProfileDto, UserId } from '@taskpro/types';
import type { CreateProfileInput, UpdateProfileInput } from './types';

export interface ProfileService {
  getProfile(userId: UserId): Promise<ProfileDto | null>;
  createProfile(input: CreateProfileInput): Promise<ProfileDto>;
  updateProfile(input: UpdateProfileInput): Promise<ProfileDto>;
}
