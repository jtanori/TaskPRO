import { screen } from '@testing-library/react';
import React from 'react';
import { TextInput } from '../../components/foundation/TextInput';
import { renderWithTheme } from '../test-utils';
import { describe, expect, it } from 'vitest';

describe('TextInput', () => {
  it('renders a label', () => {
    renderWithTheme(<TextInput label="Email" placeholder="Enter email" />);
    expect(screen.getByText('Email')).toBeTruthy();
    expect(screen.getByPlaceholderText('Enter email')).toBeTruthy();
  });
});
