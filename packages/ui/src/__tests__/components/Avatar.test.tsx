import { screen } from '@testing-library/react';
import React from 'react';
import { Avatar } from '../../components/foundation/Avatar';
import { renderWithTheme } from '../test-utils';
import { describe, expect, it } from 'vitest';

describe('Avatar', () => {
  it('renders initials', () => {
    renderWithTheme(<Avatar initials="JD" />);
    expect(screen.getByText('JD')).toBeTruthy();
  });

  it('limits initials to two characters', () => {
    renderWithTheme(<Avatar initials="John Doe" />);
    expect(screen.getByText('JO')).toBeTruthy();
  });
});
