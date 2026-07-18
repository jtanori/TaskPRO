import type { Meta, StoryObj } from '@storybook/react';
import { ReviewCard } from './ReviewCard';

const meta: Meta<typeof ReviewCard> = {
  title: 'Review/ReviewCard',
  component: ReviewCard,
};

export default meta;

type Story = StoryObj<typeof ReviewCard>;

export const Default: Story = {
  args: {
    review: {
      id: 'review-1' as import('@taskpro/types').ReviewId,
      bookingId: 'booking-1' as import('@taskpro/types').BookingId,
      reviewerId: 'user-1' as import('@taskpro/types').UserId,
      revieweeId: 'pro-1' as import('@taskpro/types').ProfessionalId,
      dimensions: [
        {
          dimension: 'overall' as import('@taskpro/types').ReviewDimension,
          rating: { value: 4.5, max: 5, precision: 0.5 },
        },
        {
          dimension: 'quality' as import('@taskpro/types').ReviewDimension,
          rating: { value: 5, max: 5, precision: 0.5 },
        },
      ],
      comment: 'Excelente servicio, muy profesional.',
      createdAt: new Date().toISOString(),
    },
  },
};
