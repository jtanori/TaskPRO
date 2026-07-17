import type { Meta, StoryObj } from '@storybook/react';
import { ProfessionalCard } from './ProfessionalCard';

const meta: Meta<typeof ProfessionalCard> = {
  title: 'Marketplace/ProfessionalCard',
  component: ProfessionalCard,
};

export default meta;

type Story = StoryObj<typeof ProfessionalCard>;

export const Default: Story = {};
