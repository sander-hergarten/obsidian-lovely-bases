import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  APPLICATION_ENTRIES,
  ARTICLE_ENTRIES,
  BOOK_ENTRIES,
  MOVIES_ENTRIES,
  PERSON_ENTRIES,
} from "@/__fixtures__/entries";
import { aBasesViewConfig } from "@/__mocks__";
import Providers from "@/stories/decorators/Providers";

import {
  APPLICATIONS_CARD_CONFIG,
  ARTICLES_CARD_CONFIG,
  BOOKS_CARD_CONFIG,
  MOVIES_CARD_CONFIG,
  PEOPLE_CARD_CONFIG,
} from "./__fixtures__/configs";

import Card from "./index";

const meta = {
  title: "Design System/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    config: {
      table: {
        disable: true,
      },
    },
    entry: {
      table: {
        disable: true,
      },
    },
    layout: { control: "radio", options: ["horizontal", "vertical"] },
    shape: { control: "radio", options: ["square", "circle", "rounded"] },
    hoverProperty: { control: "text" },
    hoverStyle: { control: "radio", options: ["none", "overlay", "tooltip"] },
    properties: { control: "object" },
    imageProperty: { control: "text" },
    imageAspectRatio: {
      control: { type: "range", min: 0.25, max: 2.5, step: 0.05 },
    },
    cardSize: { control: { type: "range", min: 50, max: 800, step: 10 } },
    imageFit: { control: "radio", options: ["cover", "contain"] },
    reverseContent: { control: "boolean" },
    showTitle: { control: "boolean" },
    showPropertyTitles: { control: "boolean" },
  },
  decorators: [
    Providers,
    (Story) => (
      <div
        style={{
          maxWidth: `${MOVIES_CARD_CONFIG.cardSize}px`,
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Article: Story = {
  args: {
    config: aBasesViewConfig(ARTICLES_CARD_CONFIG),
    entry: ARTICLE_ENTRIES[0],
    ...ARTICLES_CARD_CONFIG,
  },
};

export const Movie: Story = {
  args: {
    config: aBasesViewConfig(MOVIES_CARD_CONFIG),
    entry: MOVIES_ENTRIES[0],
    ...MOVIES_CARD_CONFIG,
  },
};

export const Book: Story = {
  args: {
    config: aBasesViewConfig(BOOKS_CARD_CONFIG),
    entry: BOOK_ENTRIES[0],
    ...BOOKS_CARD_CONFIG,
  },
};

export const Person: Story = {
  args: {
    config: aBasesViewConfig(PEOPLE_CARD_CONFIG),
    entry: PERSON_ENTRIES[0],
    ...PEOPLE_CARD_CONFIG,
  },
};

export const Application: Story = {
  args: {
    config: aBasesViewConfig(APPLICATIONS_CARD_CONFIG),
    entry: APPLICATION_ENTRIES[0],
    ...APPLICATIONS_CARD_CONFIG,
  },
};
