import type { Meta, StoryObj } from '@storybook/react';
import { ProfessionalCard } from './ProfessionalCard';

const meta: Meta<typeof ProfessionalCard> = {
  title: 'Marketplace/ProfessionalCard',
  component: ProfessionalCard,
};

export default meta;

type Story = StoryObj<typeof ProfessionalCard>;

export const Default: Story = {
  args: {
    professional: {
      id: 'pro-1' as import('@taskpro/types').ProfessionalDto['id'],
      userId: 'user-1' as import('@taskpro/types').ProfessionalDto['userId'],
      bio: 'Especialista en limpieza',
      yearsExperience: 5,
      rating: { value: 4.8, max: 5, precision: 0.5 },
      reviewCount: 124,
      travelRadiusMeters: 15000,
      verification: { status: 'verified' as import('@taskpro/types').VerificationStatus },
      isAvailable: true,
    },
  },
};
