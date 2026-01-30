import type { Meta } from "@storybook/react-vite";

import { Providers } from "@/stories/decorators";

import type Folder from "../";

import FolderMeta, { createMockFiles, DEFAULT_FOLDER_CARD_CONFIG, type Story } from "./meta";

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
		icon: "folder",
		colorizeFiles: false,
		files: createMockFiles(5),
	},
};

export const WithGradient: Story = {
	name: "With Gradient",
	args: {
		icon: "briefcase",
		colorizeFiles: false,
		gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
		files: createMockFiles(5),
	},
};

export const ColorizedFiles: Story = {
	name: "Colorized Files",
	args: {
		icon: "palette",
		colorizeFiles: true,
		gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
		files: createMockFiles(5),
	},
};

export const SingleFile: Story = {
	name: "Single File",
	args: {
		icon: "file",
		colorizeFiles: false,
		files: createMockFiles(1),
	},
};

export const ManyFiles: Story = {
	name: "Many Files (shows max 5)",
	args: {
		icon: "library",
		colorizeFiles: false,
		files: createMockFiles(10),
	},
};

export const NoIcon: Story = {
	name: "No Icon",
	args: {
		icon: null,
		colorizeFiles: false,
		files: createMockFiles(3),
	},
};

export const WarmGradient: Story = {
	name: "Warm Gradient",
	args: {
		icon: "sun",
		colorizeFiles: true,
		gradient: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
		files: createMockFiles(5),
	},
};

export const CoolGradient: Story = {
	name: "Cool Gradient",
	args: {
		icon: "snowflake",
		colorizeFiles: true,
		gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
		files: createMockFiles(5),
	},
};

export const DarkGradient: Story = {
	name: "Dark Gradient",
	args: {
		icon: "moon",
		colorizeFiles: true,
		gradient: "linear-gradient(135deg, #434343 0%, #000000 100%)",
		files: createMockFiles(5),
	},
};

export const LargeSize: Story = {
	name: "Large Size (256px)",
	args: {
		width: 256,
		icon: "folder",
		colorizeFiles: false,
		files: createMockFiles(5),
	},
};

export const SmallSize: Story = {
	name: "Small Size (80px)",
	args: {
		width: 80,
		icon: "folder",
		colorizeFiles: false,
		files: createMockFiles(5),
	},
};

export const PolaroidCards: Story = {
	name: "Polaroid Card Layout",
	args: {
		icon: "camera",
		colorizeFiles: false,
		gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
		files: createMockFiles(5),
		cardConfig: {
			...DEFAULT_FOLDER_CARD_CONFIG,
			layout: "polaroid",
		},
	},
};

export const VerticalCards: Story = {
	name: "Vertical Card Layout",
	args: {
		icon: "layers",
		colorizeFiles: false,
		gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
		files: createMockFiles(5),
		cardConfig: {
			...DEFAULT_FOLDER_CARD_CONFIG,
			layout: "vertical",
		},
	},
};

export const CircleCards: Story = {
	name: "Circle Shape Cards",
	args: {
		icon: "circle",
		colorizeFiles: false,
		gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
		files: createMockFiles(5),
		cardConfig: {
			...DEFAULT_FOLDER_CARD_CONFIG,
			shape: "circle",
		},
	},
};

export const RoundedCards: Story = {
	name: "Rounded Shape Cards",
	args: {
		icon: "square",
		colorizeFiles: false,
		gradient: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
		files: createMockFiles(5),
		cardConfig: {
			...DEFAULT_FOLDER_CARD_CONFIG,
			shape: "rounded",
		},
	},
};

export const NoTitleCards: Story = {
	name: "Cards Without Title",
	args: {
		icon: "image",
		colorizeFiles: false,
		gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
		files: createMockFiles(5),
		cardConfig: {
			...DEFAULT_FOLDER_CARD_CONFIG,
			showTitle: false,
		},
	},
};
