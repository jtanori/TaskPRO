import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MessageComposer } from './MessageComposer';

const meta: Meta<typeof MessageComposer> = {
  title: 'Communication/MessageComposer',
  component: MessageComposer,
};

export default meta;

type Story = StoryObj<typeof MessageComposer>;

function StatefulComposer() {
  const [value, setValue] = useState('');
  return (
    <MessageComposer
      value={value}
      onChangeText={setValue}
      onSend={() => setValue('')}
      placeholder="Escribe un mensaje..."
    />
  );
}

export const Default: Story = {
  render: () => <StatefulComposer />,
};
