import type { Meta, StoryObj } from '@storybook/react';
import { ReviewList } from './ReviewList';

const meta: Meta<typeof ReviewList> = {
  title: 'Review/ReviewList',
  component: ReviewList,
};

export default meta;

type Story = StoryObj<typeof ReviewList>;

const sampleReview = {
  id: 'review-1' as import('@taskpro/types').ReviewId,
  bookingId: 'booking-1' as import('@taskpro/types').BookingId,
  reviewerId: 'user-1' as import('@taskpro/types').UserId,
  revieweeId: 'pro-1' as import('@taskpro/types').ProfessionalId,
  dimensions: [
    {
      dimension: 'overall' as import('@taskpro/types').ReviewDimension,
      rating: { value: 4.5, max: 5, precision: 0.5 },
    },
  ],
  comment: 'Muy buen trabajo.',
  createdAt: new Date().toISOString(),
};

export const WithReviews: Story = {
  args: {
    reviews: [
      sampleReview,
      {
        ...sampleReview,
        id: 'review-2' as import('@taskpro/types').ReviewId,
        comment: 'Recomendado.',
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    reviews: [],
  },
};
