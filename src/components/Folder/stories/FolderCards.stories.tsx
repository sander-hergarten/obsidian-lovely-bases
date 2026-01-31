import type { Meta } from "@storybook/react-vite";

import { APPLICATION_ENTRIES, ARTICLE_ENTRIES, BOOK_ENTRIES, MOVIES_ENTRIES, PERSON_ENTRIES, PHOTOS_ENTRIES } from "@/__fixtures__/entries";
import { CIRCLE_SHAPE_CONFIG, DEFAULT_CONFIG, FULL_CONFIG, OVERLAY_LAYOUT_CONFIG, POLAROID_LAYOUT_CONFIG, ROUNDED_SHAPE_CONFIG } from "@/components/Card/__fixtures__/configs";
import { Providers } from "@/stories/decorators";

import type Folder from "../";

import FolderMeta, { type Story } from "./meta";

const meta = {
	...FolderMeta,
	title: "Design System/Folder/Cards",
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
} satisfies Meta<typeof Folder>;

export default meta;

export const VerticalCards: Story = {
	name: "Vertical Layout",
	args: {
		icon: "library-big",
		gradient: "linear-gradient(135deg, #205ea6 0%, #4385be 100%)",
		files: BOOK_ENTRIES.slice(0, 5),
		cardConfig: {
      ...DEFAULT_CONFIG,
      imageAspectRatio: 0.85,
      imageProperty: "note.cover",
    },
	},
};

export const HorizontalCards: Story = {
	name: "Horizontal Layout",
	args: {
		icon: "newspaper",
		gradient: "linear-gradient(135deg, #24837b 0%, #3aa99f 100%)",
		files: ARTICLE_ENTRIES.slice(0, 5),
		cardConfig: {
      ...FULL_CONFIG,
      hoverProperty: undefined,
    },
	},
};

export const OverlayCards: Story = {
	name: "Overlay Layout",
	args: {
		icon: "film",
		gradient: "linear-gradient(135deg, #af3029 0%, #d14d41 100%)",
		files: MOVIES_ENTRIES.slice(0, 5),
		cardConfig: {
      ...OVERLAY_LAYOUT_CONFIG,
      overlayContentVisibility: "hover",
    }
	},
};

export const PolaroidCards: Story = {
	name: "Polaroid Layout",
	args: {
		icon: "camera",
		gradient: "linear-gradient(135deg, #66800b 0%, #879a39 100%)",
		files: PHOTOS_ENTRIES.slice(0, 5),
		cardConfig: POLAROID_LAYOUT_CONFIG
	},
};

export const CircleCards: Story = {
	name: "Circle Shape",
	args: {
		icon: "user",
		gradient: "linear-gradient(135deg, #5e409d 0%, #8b7ec8 100%)",
		files: PERSON_ENTRIES.slice(0, 5),
		cardConfig: CIRCLE_SHAPE_CONFIG,
	},
};

export const RoundedCards: Story = {
	name: "Rounded Shape",
	args: {
		icon: "layers",
		gradient: "linear-gradient(135deg, #ad8301 0%, #d0a215 100%)",
		files: APPLICATION_ENTRIES.slice(0, 5),
		cardConfig: ROUNDED_SHAPE_CONFIG,
	},
};
