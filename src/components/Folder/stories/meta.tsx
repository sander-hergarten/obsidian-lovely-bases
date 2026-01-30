import type { Meta, StoryObj } from "@storybook/react-vite";
import iconNodes from "lucide-static/icon-nodes.json";
import type { BasesEntry, BasesViewConfig } from "obsidian";
import type { MouseEventHandler } from "react";

import { MOVIES_ENTRIES } from "@/__fixtures__/entries";
import { aBasesViewConfig } from "@/__mocks__/aBasesViewConfig";
import { DEFAULTS as CARD_DEFAULTS } from "@/components/Card/constants";
import type { CardConfig } from "@/components/Card/types";
import { getTitle } from "@/lib/properties";
import Providers from "@/stories/decorators/Providers";

import Folder from "../";
import type { File } from "../types";

const DEFAULT_CARD_CONFIG: CardConfig = {
	...CARD_DEFAULTS,
	imageProperty: "note.cover",
};

const DEFAULT_CONFIG = aBasesViewConfig({});

type StoryProps = {
	width?: number;
	colorizeFiles: boolean;
	icon: string | null;
	files: File[];
	gradient?: string;
	onClick?: MouseEventHandler<HTMLDivElement>;
	cardConfig?: CardConfig;
	config?: BasesViewConfig;
};

export const FolderStory = ({
	width,
	colorizeFiles,
	icon,
	files,
	gradient,
	onClick,
	cardConfig = DEFAULT_CARD_CONFIG,
	config = DEFAULT_CONFIG,
}: StoryProps) => {
	return (
		<Folder
			width={width}
			colorizeFiles={colorizeFiles}
			icon={icon}
			files={files}
			gradient={gradient}
			onClick={onClick}
			cardConfig={cardConfig}
			config={config}
		/>
	);
};

const entriesToFiles = (entries: BasesEntry[]): File[] =>
	entries.map((entry) => ({
		id: entry.file.path,
		entry,
		file: entry.file,
		image: entry.getValue("note.cover")?.toString() ?? "",
		title: getTitle(entry),
		onClick: () => console.log(`Clicked file: ${getTitle(entry)}`),
	}));

export const createMockFiles = (count: number): File[] =>
	entriesToFiles(MOVIES_ENTRIES.slice(0, count));

export const DEFAULT_FOLDER_CARD_CONFIG = DEFAULT_CARD_CONFIG;

export const meta = {
	title: "Design System/Folder",
	component: FolderStory,
	parameters: {
		layout: "centered",
	},
	tags: ["internal"],
	argTypes: {
		width: {
			control: { type: "range", min: 64, max: 512, step: 16 },
			name: "Width",
			description:
				"Width of the folder in pixels. Height is calculated automatically using 4:3 aspect ratio.",
			table: {
				category: "Size",
				defaultValue: { summary: "128" },
			},
		},
		icon: {
			control: "select",
			name: "Folder Icon",
			description: "Lucide icon displayed on the folder front.",
			options: [null, ...Object.keys(iconNodes)],
			table: {
				category: "Content",
			},
		},
		colorizeFiles: {
			control: "boolean",
			name: "Colorize Files",
			description: "Whether to apply gradient colors to file cards.",
			table: {
				category: "Appearance",
				defaultValue: { summary: "false" },
			},
		},
		gradient: {
			control: "text",
			name: "Gradient",
			description:
				"CSS gradient string for folder colors (e.g., 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)').",
			table: {
				category: "Appearance",
			},
		},
		files: {
			table: {
				disable: true,
			},
		},
		onClick: {
			table: {
				disable: true,
			},
		},
	},
	decorators: [Providers],
} satisfies Meta<typeof FolderStory>;

export default meta;

export type Story = StoryObj<typeof meta>;
