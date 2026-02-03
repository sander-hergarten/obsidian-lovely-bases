import type { Meta } from "@storybook/react-vite";

import { APPLICATION_ENTRIES, ARTICLE_ENTRIES, BOOK_ENTRIES, MOVIES_ENTRIES, PERSON_ENTRIES, PHOTOS_ENTRIES } from "@/__fixtures__/entries";
import { CIRCLE_SHAPE_CONFIG, DEFAULT_CONFIG, FULL_CONFIG, OVERLAY_LAYOUT_CONFIG, POLAROID_LAYOUT_CONFIG, ROUNDED_SHAPE_CONFIG } from "@/components/Card/__fixtures__/configs";
import { Providers } from "@/stories/decorators";

import type Notebook from "..";

import NotebookMeta, { type Story } from "./meta";

const meta = {
	...NotebookMeta,
	title: "Design System/Notebook/Cards",
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
} satisfies Meta<typeof Notebook>;

export default meta;

export const VerticalCards: Story = {
	name: "Vertical Layout",
	args: {
		icon: "library-big",
    color: "#205ea6",
		files: BOOK_ENTRIES.slice(0, 5),
    title: "Books",
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
    color: "#24837b",
		files: ARTICLE_ENTRIES.slice(0, 5),
    title: "Articles",
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
    color: "#af3029",
		files: MOVIES_ENTRIES.slice(0, 5),
    title: "Movies",
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
    color: "#66800b",
		files: PHOTOS_ENTRIES.slice(0, 5),
    title: "Photos",
		cardConfig: POLAROID_LAYOUT_CONFIG
	},
};

export const CircleCards: Story = {
	name: "Circle Shape",
	args: {
		icon: "user",
    color: "#5e409d",
    pageStyle: "dotted",
		files: PERSON_ENTRIES.slice(0, 5),
    title: "People",
    padContent: true,
		cardConfig: CIRCLE_SHAPE_CONFIG,
	},
};

export const RoundedCards: Story = {
	name: "Rounded Shape",
	args: {
		icon: "layers",
    color: "#ad8301",
    pageStyle: "squared",
		files: APPLICATION_ENTRIES.slice(0, 5),
    title: "Applications",
    padContent: true,
		cardConfig: ROUNDED_SHAPE_CONFIG,
	},
};
