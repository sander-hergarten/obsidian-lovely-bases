import type { Meta } from "@storybook/react-vite";

import { MOVIES_ENTRIES } from "@/__fixtures__/entries";
import { HANDWRITTEN_FONTS } from "@/__fixtures__/typographies";
import { Providers } from "@/stories/decorators";

import type Notebook from "..";

import NotebookMeta, { type Story } from "./meta";

const meta = {
	...NotebookMeta,
	title: "Design System/Notebook",
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

export const FullExample: Story = {
	name: "Full Example",
	args: {
    icon: "folder",
    gradient: "linear-gradient(135deg, #6F6E69 0%, #9F9D96 100%)",
		files: MOVIES_ENTRIES.slice(0, 5),
    title: "My Notebook",
    titleFont: HANDWRITTEN_FONTS,
	},
};

export const Default: Story = {
	name: "Default",
	args: {
		files: MOVIES_ENTRIES.slice(0, 5),
	},
};

export const RuledPages: Story = {
	name: "Ruled Pages",
	args: {
		files: MOVIES_ENTRIES.slice(0, 5),
    pageStyle: "ruled",
	},
};

export const DottedPages: Story = {
	name: "Dotted Pages",
	args: {
		files: MOVIES_ENTRIES.slice(0, 5),
    pageStyle: "dotted",
	},
};

export const SquaredPages: Story = {
	name: "Squared Pages",
	args: {
		files: MOVIES_ENTRIES.slice(0, 5),
    pageStyle: "squared",
	},
};

export const PadContent: Story = {
	name: "Pad Content",
	args: {
		files: MOVIES_ENTRIES.slice(0, 5),
    pageStyle: "plain",
    padContent: true,
	},
};
