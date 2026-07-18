import { screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { MetricCard } from '../../components';
import { renderWithTheme } from '../test-utils';

describe('MetricCard', () => {
  it('renders metric name and value', () => {
    renderWithTheme(
      <MetricCard
        metric={{
          name: 'Bookings',
          value: 42,
          period: 'month',
          change: 5,
        }}
      />
    );
    expect(screen.getByText('Bookings')).toBeTruthy();
    expect(screen.getByText('42')).toBeTruthy();
    expect(screen.getByLabelText('MetricCard')).toBeTruthy();
  });
});
