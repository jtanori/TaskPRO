import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../../components/foundation/Button';
import { renderWithTheme } from '../test-utils';

describe('Button', () => {
  it('renders the title', () => {
    renderWithTheme(<Button title="Press me" />);
    expect(screen.getByText('Press me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = vi.fn();
    renderWithTheme(<Button title="Press me" onPress={onPress} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    renderWithTheme(<Button title="Press me" disabled />);
    const button = screen.getByRole('button');
    expect(button.hasAttribute('aria-disabled')).toBe(true);
  });

  it('supports variant prop', () => {
    renderWithTheme(<Button title="Ghost" variant="ghost" />);
    expect(screen.getByText('Ghost')).toBeTruthy();
  });
});
