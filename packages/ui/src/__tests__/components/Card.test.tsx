import { screen } from '@testing-library/react';
import React from 'react';
import { Text } from 'react-native';
import { Card } from '../../components/foundation/Card';
import { renderWithTheme } from '../test-utils';
import { describe, expect, it } from 'vitest';

describe('Card', () => {
  it('renders children', () => {
    renderWithTheme(
      <Card>
        <Text>Card content</Text>
      </Card>
    );
    expect(screen.getByText('Card content')).toBeTruthy();
  });
});
