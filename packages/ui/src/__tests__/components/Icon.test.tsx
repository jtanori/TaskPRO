import { screen } from '@testing-library/react';
import React from 'react';
import { Icon } from '../../components/foundation/Icon';
import { renderWithTheme } from '../test-utils';
import { describe, expect, it } from 'vitest';

describe('Icon', () => {
  it('renders a placeholder for the icon name', () => {
    renderWithTheme(<Icon name="search" />);
    expect(screen.getByLabelText('search')).toBeTruthy();
  });
});
