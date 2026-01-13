
import type { Meta, StoryObj } from '@storybook/react-vite';
// biome-ignore lint/correctness/noUnusedImports: React is needed for JSX type checking in this context
import React from 'react';

import { MOVIES_BASE_CONFIG } from '../../__fixtures__/configs/movies';
import { MOVIES_ENTRIES } from '../../__fixtures__/entries/movies';
import Providers from '../../stories/decorators/Providers';
import ViewWrapper from '../../stories/decorators/ViewWrapper';
import LinearCalendarView from './LinearCalendarView';


const meta = {
  title: 'Views/Linear Calendar',
  component: LinearCalendarView,
  tags: ['autodocs'],
  decorators: [
    Providers,
    ViewWrapper,
  ],
  parameters: {
    docs: {
      subtitle: 'A sleek, horizontal timeline view that displays your notes as events across a calendar, perfect for visualizing schedules, projects, or journals.',
      description: {
        component: `
### Features

- **Adjustable Focus**: Switch between **Annual**, **Semestral** (6 months), and **Trimestral** (3 months) views.
- **Event Visualization**: Notes are displayed as bars spanning from their start to end dates.
- **Auto-Stacking**: Overlapping events are automatically stacked vertically for clear visibility.
- **Color Coding**: Automatically uses the \`note.color\` property to style the event bars.
- **Interactive**: Click on any event bar to immediately open the associated note.

### Configuration

- **Focus**: Choose the time span to display ('Anual', 'Semestral', or 'Trimestral').
- **Start Date Property**: The property used for the event's start date (required).
- **End Date Property**: The property used for the event's end date (optional, defaults to start date).
- **Reference Date**: The date around which the calendar centers (optional, defaults to today).`
      },
    },
  }
} satisfies Meta<typeof LinearCalendarView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Movies: Story = {
  args: {
    data: {
      data: MOVIES_ENTRIES,
    },
    config: MOVIES_BASE_CONFIG,
    isEmbedded: false,
  },
};
