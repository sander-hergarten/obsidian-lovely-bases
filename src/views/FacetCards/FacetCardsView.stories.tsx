
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';

// biome-ignore lint/correctness/noUnusedImports: React is needed for JSX type checking in this context
import React from 'react';

import { ARTICLES_BASE_CONFIG } from '../../__fixtures__/configs/articles';
import { ARTICLE_ENTRIES } from '../../__fixtures__/entries/articles';
import { MOVIES_BASE_CONFIG } from '../../__fixtures__/configs/movies';
import { MOVIES_ENTRIES } from '../../__fixtures__/entries/movies';
import Providers from '../../stories/decorators/Providers';
import ViewWrapper from '../../stories/decorators/ViewWrapper';
import FacetCardsView from './FacetCardsView';
import { BOOKS_BASE_CONFIG } from '../../__fixtures__/configs/books';
import { BOOK_ENTRIES } from '../../__fixtures__/entries/books';
import { PEOPLE_BASE_CONFIG } from '../../__fixtures__/configs/people';
import { PERSON_ENTRIES } from '../../__fixtures__/entries/people';
import { APPLICATIONS_BASE_CONFIG } from '../../__fixtures__/configs/application';
import { APPLICATION_ENTRIES } from '../../__fixtures__/entries/application';

const meta = {
  title: 'Views/Facet Cards',
  component: FacetCardsView,
  tags: ['autodocs'],
  decorators: [
    Providers,
    ViewWrapper,
  ],
  parameters: {
    docs: {
      subtitle: 'A structured, property-rich card view that gives you more control over how your note data is displayed. Perfect for databases, catalogs, or property-heavy notes.',
      description: {
        component: `### Features

- **Flexible Layouts**: Choose between **Vertical** (image on top) or **Horizontal** (image on the side) layouts.
- **Rich Media Integration**: Display images from any note property with precise control over aspect ratio and fit.
- **Property-Focused**: Dedicated space for displaying multiple note properties with optional labels.
- **Interactive Effects**: Enhance your cards with hover-activated overlays for extra information.
- **Highly Responsive**: Automatically scales and adapts to any screen size while maintaining performance.

### Configuration

- **Layout**: Switch between 'Horizontal' or 'Vertical' card styles.
- **Reverse Content**: Flip the position of the image and the content (useful for alternating designs).
- **Card Size**: Control the base width of each card in the grid.
- **Image Property**: Select the property that contains your note's featured image.
- **Image Fit**: Choose between 'Cover' (fill) or 'Contain' (fit within).
- **Aspect Ratio**: Fine-tune the proportions of your images.
- **Show Property Titles**: Toggle whether to show the names of the displayed properties.
- **Show Title**: Toggle the visibility of the note's main title.
`,
      },
    },
  },
} satisfies Meta<typeof FacetCardsView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Articles: Story = {
  args: {
    data: {
      data: ARTICLE_ENTRIES,
    },
    config: ARTICLES_BASE_CONFIG,
    isEmbedded: false,
  }
};

export const Movies: Story = {
  args: {
    data: {
      data: MOVIES_ENTRIES,
    },
    config: MOVIES_BASE_CONFIG,
    isEmbedded: false,
  },
  play: async ({ args, canvas, userEvent }): Promise<void> => {
    const container = canvas.getByTestId('lovely-bases') as HTMLElement;

    // 👇 Simulate behavior
    console.log(userEvent, container)
    container.scrollTop = 100;

    const cards = canvas.getAllByTestId('lovely-card');
    await expect(cards).toHaveLength(args.data.data.length);
  }
};


export const Books: Story = {
  args: {
    data: {
      data: BOOK_ENTRIES,
    },
    config: BOOKS_BASE_CONFIG,
    isEmbedded: false,
  },
};

export const People: Story = {
  args: {
    data: {
      data: PERSON_ENTRIES,
    },
    config: PEOPLE_BASE_CONFIG,
    isEmbedded: false,
  },
};

export const Applications: Story = {
  args: {
    data: {
      data: APPLICATION_ENTRIES,
    },
    config: APPLICATIONS_BASE_CONFIG,
    isEmbedded: false,
  },
};
