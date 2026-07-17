import type { Meta, StoryObj } from '@storybook/react';
import { TechnicianProfileCard } from './TechnicianProfileCard';

const meta: Meta<typeof TechnicianProfileCard> = {
  title: 'Professional/TechnicianProfileCard',
  component: TechnicianProfileCard,
};

export default meta;

type Story = StoryObj<typeof TechnicianProfileCard>;

export const Default: Story = {};
