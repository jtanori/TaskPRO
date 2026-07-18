import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { RatingInput } from './RatingInput';

const meta: Meta<typeof RatingInput> = {
  title: 'Review/RatingInput',
  component: RatingInput,
};

export default meta;

type Story = StoryObj<typeof RatingInput>;

function StatefulRatingInput(args: React.ComponentProps<typeof RatingInput>) {
  const [value, setValue] = useState(args.value ?? 0);
  return <RatingInput {...args} value={value} onChange={setValue} />;
}

export const Default: Story = {
  render: (args) => <StatefulRatingInput {...args} />,
  args: {
    label: 'Califica el servicio',
    value: 3,
  },
};
