import { type ProfileDto, type UserId } from '@taskpro/types';
import type { ProfileService } from './ProfileService';
import type { CreateProfileInput, UpdateProfileInput } from './types';

export class FakeProfileService implements ProfileService {
  private profiles = new Map<string, ProfileDto>();

  async getProfile(userId: UserId): Promise<ProfileDto | null> {
    return this.profiles.get(userId) ?? null;
  }

  async createProfile(input: CreateProfileInput): Promise<ProfileDto> {
    const profile: ProfileDto = {
      userId: input.userId,
      firstName: input.firstName,
      lastName: input.lastName,
      displayName: `${input.firstName} ${input.lastName}`.trim(),
      bio: input.bio,
      avatarUrl: undefined,
      locale: input.locale,
      currency: input.currency,
      timezone: input.timezone,
    };
    this.profiles.set(input.userId, profile);
    return profile;
  }

  async updateProfile(input: UpdateProfileInput): Promise<ProfileDto> {
    const existing = this.profiles.get(input.userId);
    if (!existing) {
      throw new Error('Profile not found');
    }
    const updated: ProfileDto = {
      ...existing,
      firstName: input.firstName ?? existing.firstName,
      lastName: input.lastName ?? existing.lastName,
      displayName:
        input.firstName || input.lastName
          ? `${input.firstName ?? existing.firstName} ${input.lastName ?? existing.lastName}`.trim()
          : existing.displayName,
      bio: input.bio ?? existing.bio,
      avatarUrl: input.avatarUrl ?? existing.avatarUrl,
    };
    this.profiles.set(input.userId, updated);
    return updated;
  }

  seed(profile: ProfileDto): void {
    this.profiles.set(profile.userId, profile);
  }
}

export const profileService = new FakeProfileService();
