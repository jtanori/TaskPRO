import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { RatingInput } from '../../components';
import { renderWithTheme } from '../test-utils';

describe('RatingInput', () => {
  it('renders five stars', () => {
    renderWithTheme(<RatingInput value={0} />);
    expect(screen.getByLabelText('RatingInput')).toBeTruthy();
    expect(screen.getAllByRole('button')).toHaveLength(5);
  });

  it('calls onChange when a star is pressed', () => {
    const onChange = vi.fn();
    renderWithTheme(<RatingInput value={0} onChange={onChange} />);
    fireEvent.click(screen.getByLabelText('4 estrellas'));
    expect(onChange).toHaveBeenCalledWith(4);
  });
});
