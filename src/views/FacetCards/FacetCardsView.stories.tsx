import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

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

import FacetCardsView from "./FacetCardsView";

const meta = {
  title: "Views/Facet Cards",
  component: FacetCardsView,
  tags: ["autodocs"],
  decorators: [Providers, ViewWrapper],
  parameters: {
    docs: {
      subtitle:
        "A structured, property-rich card view that gives you more control over how your note data is displayed. Perfect for databases, catalogs, or property-heavy notes.",
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
    ...aReactBaseViewProps({
      data: aBasesQueryResult({
        data: ARTICLE_ENTRIES,
      }),
      config: ARTICLES_BASE_CONFIG,
    }),
  },
};

export const Movies: Story = {
  args: {
    ...aReactBaseViewProps({
      data: aBasesQueryResult({
        data: MOVIES_ENTRIES,
      }),
      config: MOVIES_BASE_CONFIG,
    }),
  },
  play: async ({ args, canvas }): Promise<void> => {
    const container = canvas.getByTestId("lovely-bases") as HTMLElement;

    container.scrollTop = 100;

    const cards = canvas.getAllByTestId("lovely-card");
    await expect(cards).toHaveLength(args.data.data.length);
  },
};

export const Books: Story = {
  args: {
    ...aReactBaseViewProps({
      data: aBasesQueryResult({
        data: BOOK_ENTRIES,
      }),
      config: BOOKS_BASE_CONFIG,
    }),
  },
};

export const People: Story = {
  args: {
    ...aReactBaseViewProps({
      data: aBasesQueryResult({
        data: PERSON_ENTRIES,
      }),
      config: PEOPLE_BASE_CONFIG,
    }),
  },
};

export const Applications: Story = {
  args: {
    ...aReactBaseViewProps({
      data: aBasesQueryResult({
        data: APPLICATION_ENTRIES,
      }),
      config: APPLICATIONS_BASE_CONFIG,
    }),
  },
};
