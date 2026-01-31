import type { Meta } from "@storybook/react-vite";

import { MOVIES_ENTRIES } from "@/__fixtures__/entries";
import { Providers } from "@/stories/decorators";

import type Folder from "../";

import FolderMeta, { type Story } from "./meta";

const meta = {
	...FolderMeta,
	title: "Design System/Folder",
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

export const FullExample: Story = {
	name: "Full Example",
	args: {
    icon: "folder",
    gradient: "linear-gradient(135deg, #6F6E69 0%, #9F9D96 100%)",
		files: MOVIES_ENTRIES.slice(0, 5)
	},
};

export const Default: Story = {
	name: "Default",
	args: {
		files: MOVIES_ENTRIES.slice(0, 5)
	},
};
