import type { Meta, StoryObj } from '@storybook/react';
import { ModalContainer } from './ModalContainer';

const meta: Meta<typeof ModalContainer> = {
  title: 'Navigation/ModalContainer',
  component: ModalContainer,
};

export default meta;

type Story = StoryObj<typeof ModalContainer>;

export const Default: Story = {};
