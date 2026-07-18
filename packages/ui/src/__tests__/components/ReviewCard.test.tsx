import { screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ReviewCard } from '../../components';
import { renderWithTheme } from '../test-utils';

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
  comment: 'Great service',
  createdAt: new Date().toISOString(),
};

describe('ReviewCard', () => {
  it('renders review comment and rating', () => {
    renderWithTheme(<ReviewCard review={sampleReview} />);
    expect(screen.getByText('Great service')).toBeTruthy();
    expect(screen.getByLabelText('ReviewCard')).toBeTruthy();
  });
});
