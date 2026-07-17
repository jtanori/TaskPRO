import type { Meta, StoryObj } from '@storybook/react';
import { SelectField } from './SelectField';

const meta: Meta<typeof SelectField> = {
  title: 'Form/SelectField',
  component: SelectField,
};

export default meta;

type Story = StoryObj<typeof SelectField>;

export const Default: Story = {};
