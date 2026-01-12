import type { Meta, StoryObj } from "@storybook/react-vite";
// biome-ignore lint/correctness/noUnusedImports: React is needed for JSX type checking in this context
import React from "react";

import {
  MOVIES_BASE_CONFIG,
  MOVIES_CARD_CONFIG,
} from "../../__fixtures__/configs/movies";
import { MOVIES_ENTRIES } from "../../__fixtures__/entries/movies";
import Providers from "../../stories/decorators/Providers";
import Card from "./index";

const meta = {
  title: "Design System/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
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

export const Movie: Story = {
  args: {
    cardConfig: MOVIES_CARD_CONFIG,
    config: MOVIES_BASE_CONFIG,
    entry: MOVIES_ENTRIES[0],
  },
};
