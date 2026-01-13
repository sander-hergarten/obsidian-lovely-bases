
import type { Meta, StoryObj } from '@storybook/react-vite';
// biome-ignore lint/correctness/noUnusedImports: React is needed for JSX type checking in this context
import React from 'react';

import { GREEN_HEATMAP_BASE_CONFIG, SEMAPHOR_HEATMAP_BASE_CONFIG } from '../../__fixtures__/configs/heatmap';
import { GROUPED_OCCURRENCES, OCCURRENCES } from '../../__fixtures__/entries/occurrences';
import Providers from '../../stories/decorators/Providers';
import ViewWrapper from '../../stories/decorators/ViewWrapper';
import HeatmapCalendarView from './HeatmapCalendarView';


const meta = {
  title: 'Views/Heatmap Calendar',
  tags: ['autodocs'],
  component: HeatmapCalendarView,
  decorators: [
    Providers,
    ViewWrapper,
  ],
  parameters: {
    docs: {
      subtitle: 'A GitHub-style activity tracker that visualizes the frequency of notes or events over time, perfect for habit tracking or monitoring daily productivity.',
      description: {
        component: `### Features

- **Activity Visualization**: A grid-based heatmap showing activity levels through color intensity across the year.
- **Automatic Grouping**: Supports displaying data grouped by different categories.
- **Multiple Color Schemes**: Choose from variety of palettes including **Red**, **Green**, **Blue**, **Purple**, and more.
- **Interactive**: Click on any cell to immediately open the associated note.

### Configuration

- **Date Property**: The property used to determine the date of the entry (required).
- **Track Property**: The numeric property used to calculate the intensity of the heatmap (required).
- **Color Scheme**: Select the color palette for the cells (e.g., 'primary', 'green', 'red').
- **Reference Date**: The date used as the end point for the calendar display (optional, defaults to today).`
      },
    }
  }
} satisfies Meta<typeof HeatmapCalendarView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Semaphor: Story = {
  args: {
    data: {
      data: OCCURRENCES,
      groupedData: GROUPED_OCCURRENCES,
    },
    config: SEMAPHOR_HEATMAP_BASE_CONFIG,
    isEmbedded: false,
  },
};
