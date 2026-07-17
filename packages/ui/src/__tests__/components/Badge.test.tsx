import { screen } from '@testing-library/react';
import React from 'react';
import { Badge } from '../../components/foundation/Badge';
import { renderWithTheme } from '../test-utils';
import { describe, expect, it } from 'vitest';

describe('Badge', () => {
  it('renders the label', () => {
    renderWithTheme(<Badge label="New" />);
    expect(screen.getByText('New')).toBeTruthy();
  });

  it('supports status variants', () => {
    renderWithTheme(<Badge label="Done" status="success" />);
    expect(screen.getByText('Done')).toBeTruthy();
  });
});
