import { screen } from '@testing-library/react';
import { createMessageId, createUserId, Currency, MessageType } from '@taskpro/types';
import React from 'react';
import { describe, expect, it } from 'vitest';
import {
  AIAssistantEntry,
  ChatBubble,
  EmptyState,
  Header,
  JobCard,
  PaymentMethodCard,
  ProfessionalCard,
  SelectField,
  ServiceCard,
} from '../../components';
import { renderWithTheme } from '../test-utils';

describe('Scaffolded component groups render within ThemeProvider', () => {
  it('navigation', () => {
    renderWithTheme(<Header />);
    expect(screen.getByLabelText('Header')).toBeTruthy();
  });

  it('form', () => {
    renderWithTheme(<SelectField />);
    expect(screen.getByLabelText('SelectField')).toBeTruthy();
  });

  it('service', () => {
    renderWithTheme(
      <ServiceCard
        service={{
          id: 'svc-1' as import('@taskpro/types').ServiceDto['id'],
          categoryId: 'cat-1',
          name: 'Limpieza',
          description: 'Limpieza general',
          estimatedDurationMinutes: 120,
          basePrice: { amountMinor: 10000, currency: Currency.MXN },
          isActive: true,
        }}
      />
    );
    expect(screen.getByText('Limpieza')).toBeTruthy();
  });

  it('marketplace', () => {
    renderWithTheme(
      <ProfessionalCard
        professional={{
          id: 'pro-1' as import('@taskpro/types').ProfessionalDto['id'],
          userId: 'user-1' as import('@taskpro/types').ProfessionalDto['userId'],
          bio: 'Profesional de limpieza',
          yearsExperience: 5,
          rating: { value: 4.8, max: 5, precision: 0.5 },
          reviewCount: 10,
          travelRadiusMeters: 10000,
          verificationStatus: 'verified',
          isAvailable: true,
        }}
      />
    );
    expect(screen.getByText('Profesional de limpieza')).toBeTruthy();
  });

  it('workflow', () => {
    renderWithTheme(<EmptyState />);
    expect(screen.getByLabelText('EmptyState')).toBeTruthy();
  });

  it('communication', () => {
    renderWithTheme(
      <ChatBubble
        message={{
          id: createMessageId('msg-1'),
          senderId: createUserId('sender-1'),
          type: MessageType.Text,
          content: 'Hello',
          sentAt: new Date().toISOString(),
        }}
        isCurrentUser={false}
      />
    );
    expect(screen.getByText('Hello')).toBeTruthy();
  });

  it('payment', () => {
    renderWithTheme(
      <PaymentMethodCard
        method={{
          id: 'pm_1',
          brand: 'Visa',
          last4: '4242',
          expiryMonth: 12,
          expiryYear: 2028,
        }}
      />
    );
    expect(screen.getByText('Visa')).toBeTruthy();
  });

  it('professional', () => {
    renderWithTheme(<JobCard />);
    expect(screen.getByLabelText('JobCard')).toBeTruthy();
  });

  it('ai', () => {
    renderWithTheme(<AIAssistantEntry />);
    expect(screen.getByLabelText('AIAssistantEntry')).toBeTruthy();
  });
});
