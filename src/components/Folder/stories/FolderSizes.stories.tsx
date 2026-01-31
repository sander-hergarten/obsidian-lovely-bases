import type { Meta } from "@storybook/react-vite";

import { MOVIES_ENTRIES } from "@/__fixtures__/entries";
import { HANDWRITTEN_FONTS } from "@/__fixtures__/typographies";
import { OVERLAY_ON_HOVER_LAYOUT_CONFIG } from "@/components/Card/__fixtures__/configs";
import { Providers } from "@/stories/decorators";

import FolderMeta, { FolderStory, type Story } from "./meta";

const meta = {
	...FolderMeta,
	title: "Design System/Folder/Sizes",
  component: FolderStory,
	tags: ["internal"],
	decorators: [
		Providers,
		(Story) => (
			<div
				style={{
					padding: "40px",
				}}
			>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof FolderStory>;

export default meta;

export const NineXS: Story = {
  name: "9XS",
  args: {
    cardConfig: {
      ...OVERLAY_ON_HOVER_LAYOUT_CONFIG,
      contentMaxLength: 20,
      properties: ["note.author"],
      showContent: false,
      showPropertyTitles: false,
    },
    icon: "folder",
    title: "My Folder",
    titleFont: HANDWRITTEN_FONTS,
    files: MOVIES_ENTRIES,
    width: 64,
  } as unknown as Story["args"],
};

export const EightXS: Story = {
  name: "8XS",
  args: {
    cardConfig: {
      ...OVERLAY_ON_HOVER_LAYOUT_CONFIG,
      contentMaxLength: 35,
      properties: [],
      showContent: true,
      showPropertyTitles: false,
    },
    icon: "folder",
    title: "My Folder",
    titleFont: HANDWRITTEN_FONTS,
    files: MOVIES_ENTRIES,
    width: 96,
  } as unknown as Story["args"],
};

export const SevenXS: Story = {
  name: "7XS",
  args: {
    cardConfig: {
      ...OVERLAY_ON_HOVER_LAYOUT_CONFIG,
      contentMaxLength: 50,
    },
    icon: "folder",
    title: "My Folder",
    titleFont: HANDWRITTEN_FONTS,
    files: MOVIES_ENTRIES,
    width: 128,
  } as unknown as Story["args"],
};

export const SixXS: Story = {
  name: "6XS",
  args: {
    cardConfig: {
      ...OVERLAY_ON_HOVER_LAYOUT_CONFIG,
      contentMaxLength: 50,
    },
    icon: "folder",
    title: "My Folder",
    titleFont: HANDWRITTEN_FONTS,
    files: MOVIES_ENTRIES,
    width: 160,
  } as unknown as Story["args"],
};

export const FiveXS: Story = {
  name: "5XS",
  args: {
    cardConfig: {
      ...OVERLAY_ON_HOVER_LAYOUT_CONFIG,
      contentMaxLength: 50,
    },
    icon: "folder",
    title: "My Folder",
    titleFont: HANDWRITTEN_FONTS,
    files: MOVIES_ENTRIES,
    width: 192,
  } as unknown as Story["args"],
};

export const FourXS: Story = {
  name: "4XS",
  args: {
    cardConfig: {
      ...OVERLAY_ON_HOVER_LAYOUT_CONFIG,
      contentMaxLength: 50,
    },
    icon: "folder",
    title: "My Folder",
    titleFont: HANDWRITTEN_FONTS,
    files: MOVIES_ENTRIES,
    width: 224,
  } as unknown as Story["args"],
};

export const ThreeXS: Story = {
  name: "3XS",
  args: {
    cardConfig: {
      ...OVERLAY_ON_HOVER_LAYOUT_CONFIG,
      contentMaxLength: 50,
    },
    icon: "folder",
    title: "My Folder",
    titleFont: HANDWRITTEN_FONTS,
    files: MOVIES_ENTRIES,
    width: 256,
  } as unknown as Story["args"],
};

export const TwoXS: Story = {
  name: "2XS",
  args: {
    cardConfig: {
      ...OVERLAY_ON_HOVER_LAYOUT_CONFIG,
      contentMaxLength: 50,
    },
    icon: "folder",
    title: "My Folder",
    titleFont: HANDWRITTEN_FONTS,
    files: MOVIES_ENTRIES,
    width: 288,
  } as unknown as Story["args"],
};

export const XS: Story = {
  name: "XS",
  args: {
    cardConfig: {
      ...OVERLAY_ON_HOVER_LAYOUT_CONFIG,
      contentMaxLength: 50,
    },
    icon: "folder",
    title: "My Folder",
    titleFont: HANDWRITTEN_FONTS,
    files: MOVIES_ENTRIES,
    width: 320,
  } as unknown as Story["args"],
};

export const SM: Story = {
  name: "SM",
  args: {
    cardConfig: {
      ...OVERLAY_ON_HOVER_LAYOUT_CONFIG,
      contentMaxLength: 50,
    },
    icon: "folder",
    title: "My Folder",
    titleFont: HANDWRITTEN_FONTS,
    files: MOVIES_ENTRIES,
    width: 384,
  } as unknown as Story["args"],
};

export const MD: Story = {
  name: "MD",
  args: {
    cardConfig: {
      ...OVERLAY_ON_HOVER_LAYOUT_CONFIG,
      contentMaxLength: 50,
    },
    icon: "folder",
    title: "My Folder",
    titleFont: HANDWRITTEN_FONTS,
    files: MOVIES_ENTRIES,
    width: 448,
  } as unknown as Story["args"],
};

export const LG: Story = {
  name: "LG",
  args: {
    cardConfig: {
      ...OVERLAY_ON_HOVER_LAYOUT_CONFIG,
      contentMaxLength: 50,
    },
    icon: "folder",
    title: "My Folder",
    titleFont: HANDWRITTEN_FONTS,
    files: MOVIES_ENTRIES,
    width: 512,
  } as unknown as Story["args"],
};

export const XL: Story = {
  name: "XL",
  args: {
    cardConfig: {
      ...OVERLAY_ON_HOVER_LAYOUT_CONFIG,
      contentMaxLength: 50,
    },
    icon: "folder",
    title: "My Folder",
    titleFont: HANDWRITTEN_FONTS,
    files: MOVIES_ENTRIES,
    width: 576,
  } as unknown as Story["args"],
};

export const TwoXL: Story = {
  name: "2XL",
  args: {
    cardConfig: {
      ...OVERLAY_ON_HOVER_LAYOUT_CONFIG,
    },
    icon: "folder",
    title: "My Folder",
    titleFont: HANDWRITTEN_FONTS,
    files: MOVIES_ENTRIES,
    width: 672,
  } as unknown as Story["args"],
};

export const ThreeXL: Story = {
  name: "3XL",
  args: {
    cardConfig: {
      ...OVERLAY_ON_HOVER_LAYOUT_CONFIG,
    },
    icon: "folder",
    title: "My Folder",
    titleFont: HANDWRITTEN_FONTS,
    files: MOVIES_ENTRIES,
    width: 768,
  } as unknown as Story["args"],
};

export const FourXL: Story = {
  name: "4XL",
  args: {
    cardConfig: {
      ...OVERLAY_ON_HOVER_LAYOUT_CONFIG,
    },
    icon: "folder",
    title: "My Folder",
    titleFont: HANDWRITTEN_FONTS,
    files: MOVIES_ENTRIES,
    width: 896,
  } as unknown as Story["args"],
};

export const FiveXL: Story = {
  name: "5XL",
  args: {
    cardConfig: {
      ...OVERLAY_ON_HOVER_LAYOUT_CONFIG,
    },
    icon: "folder",
    title: "My Folder",
    titleFont: HANDWRITTEN_FONTS,
    files: MOVIES_ENTRIES,
    width: 1024,
  } as unknown as Story["args"],
};

export const SixXL: Story = {
  name: "6XL",
  args: {
    cardConfig: {
      ...OVERLAY_ON_HOVER_LAYOUT_CONFIG,
    },
    icon: "folder",
    title: "My Folder",
    titleFont: HANDWRITTEN_FONTS,
    files: MOVIES_ENTRIES,
    width: 1152,
  } as unknown as Story["args"],
};

export const SevenXL: Story = {
  name: "7XL",
  args: {
    cardConfig: {
      ...OVERLAY_ON_HOVER_LAYOUT_CONFIG,
    },
    icon: "folder",
    title: "My Folder",
    titleFont: HANDWRITTEN_FONTS,
    files: MOVIES_ENTRIES,
    width: 1280,
  } as unknown as Story["args"],
};
