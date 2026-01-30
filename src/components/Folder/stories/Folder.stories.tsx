import type { Meta } from "@storybook/react-vite";

import { Providers } from "@/stories/decorators";

import type Folder from "../";

import FolderMeta, { createMockFiles, type Story } from "./meta";

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

export const Default: Story = {
	name: "Default",
	args: {
		title: "My Notes",
		icon: "folder",
		colorizeFiles: false,
		files: createMockFiles(5),
	},
};

export const WithGradient: Story = {
	name: "With Gradient",
	args: {
		title: "Projects",
		icon: "briefcase",
		colorizeFiles: false,
		gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
		files: createMockFiles(5),
	},
};

export const ColorizedFiles: Story = {
	name: "Colorized Files",
	args: {
		title: "Colorful Notes",
		icon: "palette",
		colorizeFiles: true,
		gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
		files: createMockFiles(5),
	},
};

export const WithoutImages: Story = {
	name: "Without Images",
	args: {
		title: "Text Notes",
		icon: "file-text",
		colorizeFiles: false,
		files: createMockFiles(5, false),
	},
};

export const SingleFile: Story = {
	name: "Single File",
	args: {
		title: "Single Note",
		icon: "file",
		colorizeFiles: false,
		files: createMockFiles(1),
	},
};

export const ManyFiles: Story = {
	name: "Many Files (shows max 5)",
	args: {
		title: "Large Collection",
		icon: "library",
		colorizeFiles: false,
		files: createMockFiles(10),
	},
};

export const NoIcon: Story = {
	name: "No Icon",
	args: {
		title: "Plain Folder",
		icon: null,
		colorizeFiles: false,
		files: createMockFiles(3),
	},
};

export const WarmGradient: Story = {
	name: "Warm Gradient",
	args: {
		title: "Warm Colors",
		icon: "sun",
		colorizeFiles: true,
		gradient: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
		files: createMockFiles(5),
	},
};

export const CoolGradient: Story = {
	name: "Cool Gradient",
	args: {
		title: "Cool Colors",
		icon: "snowflake",
		colorizeFiles: true,
		gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
		files: createMockFiles(5),
	},
};

export const DarkGradient: Story = {
	name: "Dark Gradient",
	args: {
		title: "Dark Theme",
		icon: "moon",
		colorizeFiles: true,
		gradient: "linear-gradient(135deg, #434343 0%, #000000 100%)",
		files: createMockFiles(5),
	},
};
