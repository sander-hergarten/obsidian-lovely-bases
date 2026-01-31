import type { Meta, StoryObj } from "@storybook/react-vite";

import { ARTICLE_ENTRIES } from "@/__fixtures__/entries";
import { WithVariants } from "@/stories/decorators/WithVariants";

import * as Layouts from "./CardLayout.stories";
import * as Shapes from "./CardShapes.stories";

import CardMeta, { CardStory, type StoryProps } from "./meta";

const baseArgs = {
  entry: ARTICLE_ENTRIES[0],
  backgroundColorProperty: "note.color",
  backgroundColorApplyTo: "both",
  iconProperty: "note.icon",
  adaptToSize: true,
} satisfies Partial<StoryProps>;

const SizesRenderer = WithVariants(CardStory, [
  {
    ...Layouts.Vertical.args,
    ...baseArgs,
  },
  {
    ...Layouts.Horizontal.args,
    ...baseArgs,
  },
  {
    ...Layouts.Overlay.args,
    ...baseArgs,
  },
  {
    ...Layouts.Polaroid.args,
    ...baseArgs,
  },
  {
    ...Shapes.Circle.args,
    ...baseArgs,
    layout: "overlay",
    overlayContentVisibility: "hover",
  },
  {
    ...Shapes.Rounded.args,
    ...baseArgs,
  }
]);

const meta = {
  ...CardMeta,
  title: "Design System/Card/Sizes",
  component: SizesRenderer,
  tags: ["internal"],
} satisfies Meta<typeof SizesRenderer>;

type Story = StoryObj<typeof meta>;

export default meta;

export const NineXS: Story = {
  name: "9XS",
  args: {
    cardSize: 64,
    contentMaxLength: 20,
    properties: ["note.author"],
    showContent: false,
    showPropertyTitles: false,
  } as unknown as Story["args"],
};

export const EightXS: Story = {
  name: "8XS",
  args: {
    cardSize: 96,
    contentMaxLength: 35,
    properties: [],
    showContent: true,
    showPropertyTitles: false,
  } as unknown as Story["args"],
};

export const SevenXS: Story = {
  name: "7XS",
  args: {
    cardSize: 128,
    contentMaxLength: 50,
  } as unknown as Story["args"],
};

export const SixXS: Story = {
  name: "6XS",
  args: {
    cardSize: 160,
    contentMaxLength: 50,
  } as unknown as Story["args"],
};

export const FiveXS: Story = {
  name: "5XS",
  args: {
    cardSize: 192,
    contentMaxLength: 50,
  } as unknown as Story["args"],
};

export const FourXS: Story = {
  name: "4XS",
  args: {
    cardSize: 224,
    contentMaxLength: 50,
  } as unknown as Story["args"],
};

export const ThreeXS: Story = {
  name: "3XS",
  args: {
    cardSize: 256,
    contentMaxLength: 50,
  } as unknown as Story["args"],
};

export const TwoXS: Story = {
  name: "2XS",
  args: {
    cardSize: 288,
    contentMaxLength: 50,
  } as unknown as Story["args"],
};

export const XS: Story = {
  name: "XS",
  args: {
    cardSize: 320,
    contentMaxLength: 50,
  } as unknown as Story["args"],
};

export const SM: Story = {
  name: "SM",
  args: {
    cardSize: 384,
    contentMaxLength: 50,
  } as unknown as Story["args"],
};

export const MD: Story = {
  name: "MD",
  args: {
    cardSize: 448,
    contentMaxLength: 50,
  } as unknown as Story["args"],
};

export const LG: Story = {
  name: "LG",
  args: {
    cardSize: 512,
  } as unknown as Story["args"],
};

export const XL: Story = {
  name: "XL",
  args: {
    cardSize: 576,
  } as unknown as Story["args"],
};

export const TwoXL: Story = {
  name: "2XL",
  args: {
    cardSize: 672,
  } as unknown as Story["args"],
};

export const ThreeXL: Story = {
  name: "3XL",
  args: {
    cardSize: 768,
  } as unknown as Story["args"],
};

export const FourXL: Story = {
  name: "4XL",
  args: {
    cardSize: 896,
  } as unknown as Story["args"],
};

export const FiveXL: Story = {
  name: "5XL",
  args: {
    cardSize: 1024,
  } as unknown as Story["args"],
};

export const SixXL: Story = {
  name: "6XL",
  args: {
    cardSize: 1152,
  } as unknown as Story["args"],
};

export const SevenXL: Story = {
  name: "7XL",
  args: {
    cardSize: 1280,
  } as unknown as Story["args"],
};
