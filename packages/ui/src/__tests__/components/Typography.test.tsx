import { screen } from '@testing-library/react';
import React from 'react';
import { Typography } from '../../components/foundation/Typography';
import { renderWithTheme } from '../test-utils';
import { describe, expect, it } from 'vitest';

describe('Typography', () => {
  it('renders children', () => {
    renderWithTheme(<Typography variant="headingL">Hello</Typography>);
    expect(screen.getByText('Hello')).toBeTruthy();
  });

  it('applies variant styles', () => {
    const { getByText } = renderWithTheme(<Typography variant="caption">Small</Typography>);
    const text = getByText('Small');
    expect(text).toBeTruthy();
    expect(text.tagName.toLowerCase()).toBe('div');
  });
});
