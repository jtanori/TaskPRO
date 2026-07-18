import type { Meta, StoryObj } from '@storybook/react';
import { VerificationStatus } from '@taskpro/types';
import { VerificationBadge } from './VerificationBadge';

const meta: Meta<typeof VerificationBadge> = {
  title: 'Professional/VerificationBadge',
  component: VerificationBadge,
};

export default meta;

type Story = StoryObj<typeof VerificationBadge>;

export const Verified: Story = {
  args: {
    status: VerificationStatus.Verified,
  },
};

export const Pending: Story = {
  args: {
    status: VerificationStatus.Pending,
  },
};

export const Rejected: Story = {
  args: {
    status: VerificationStatus.Rejected,
  },
};
