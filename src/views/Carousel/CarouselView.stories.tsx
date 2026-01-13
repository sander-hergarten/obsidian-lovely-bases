
import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  APPLICATION_ENTRIES,
  ARTICLE_ENTRIES,
  BOOK_ENTRIES,
  MOVIES_ENTRIES,
  PERSON_ENTRIES,
} from "@/__fixtures__/entries";
import { aBasesQueryResult, aReactBaseViewProps } from "@/__mocks__";
import { Providers, ViewWrapper } from "@/stories/decorators";

import {
  APPLICATIONS_BASE_CONFIG,
  ARTICLES_BASE_CONFIG,
  BOOKS_BASE_CONFIG,
  MOVIES_BASE_CONFIG,
  PEOPLE_BASE_CONFIG,
} from "./__fixtures__/configs";

import CarouselView from './CarouselView';


const meta = {
  title: 'Views/Carousel',
  tags: ['autodocs'],
  component: CarouselView,
  decorators: [
    Providers,
    ViewWrapper,
  ],
  parameters: {
    docs: {
      subtitle: `A dynamic, horizontal scrolling experience that showcases your notes in a continuous flow. Perfect for highlight reels, featured notes, or visual storytelling.`,
      description: {
        component: `### Features

- **Horizontal Sliding**: Fluid, touch-friendly scrolling through your note collection.
- **Smart Navigation**: Intuitive arrows and momentum support for easy browsing.
- **Title & Context**: Dedicated space for a section title and subtitle to provide context.
- **Rich Card Support**: Leverages the full power of the Facet Cards system for content display.
- **Entrance Animations**: Staggered motion effects as the carousel enters the view.

### Configuration

- **Title**: A main heading to display above the carousel.
- **Subtitle**: A smaller description text below the title.
- **Facet Card Options**: Inherits most configuration from Facet Cards to customize the individual items.`
      },
    },
  }
} satisfies Meta<typeof CarouselView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Articles: Story = {
  args: aReactBaseViewProps({
    data: aBasesQueryResult({
      data: ARTICLE_ENTRIES,
    }),
    config: ARTICLES_BASE_CONFIG,
  }),
};

export const Movies: Story = {
  args: aReactBaseViewProps({
    data: aBasesQueryResult({
      data: MOVIES_ENTRIES,
    }),
    config: MOVIES_BASE_CONFIG,
  }),
};


export const Books: Story = {
  args: aReactBaseViewProps({
    data: aBasesQueryResult({
      data: BOOK_ENTRIES,
    }),
    config: BOOKS_BASE_CONFIG,
  }),
};

export const People: Story = {
  args: aReactBaseViewProps({
    data: aBasesQueryResult({
      data: PERSON_ENTRIES,
    }),
    config: PEOPLE_BASE_CONFIG,
  }),
};

export const Applications: Story = {
  args: aReactBaseViewProps({
    data: aBasesQueryResult({
      data: APPLICATION_ENTRIES,
    }),
    config: APPLICATIONS_BASE_CONFIG,
  }),
};
