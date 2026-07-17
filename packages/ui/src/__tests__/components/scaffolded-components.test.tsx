import { screen } from '@testing-library/react';
import { createMessageId, createUserId, MessageType } from '@taskpro/types';
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
    renderWithTheme(<ServiceCard />);
    expect(screen.getByLabelText('ServiceCard')).toBeTruthy();
  });

  it('marketplace', () => {
    renderWithTheme(<ProfessionalCard />);
    expect(screen.getByLabelText('ProfessionalCard')).toBeTruthy();
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
    renderWithTheme(<PaymentMethodCard />);
    expect(screen.getByLabelText('PaymentMethodCard')).toBeTruthy();
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
