import type { Meta, StoryObj } from "@storybook/react-vite";
import iconNodes from "lucide-static/icon-nodes.json";
import type { MouseEventHandler } from "react";

import { aFile } from "@/__mocks__/aFile";
import Providers from "@/stories/decorators/Providers";

import AnimatedFolder from "../AnimatedFolder";
import type { File } from "../types";

type StoryProps = {
	colorizeFiles: boolean;
	title: string;
	icon: string | null;
	files: File[];
	className?: string;
	gradient?: string;
	onClick?: MouseEventHandler<HTMLDivElement>;
};

export const AnimatedFolderStory = ({
	colorizeFiles,
	title,
	icon,
	files,
	className,
	gradient,
	onClick,
}: StoryProps) => {
	return (
		<AnimatedFolder
			colorizeFiles={colorizeFiles}
			title={title}
			icon={icon}
			files={files}
			className={className}
			gradient={gradient}
			onClick={onClick}
		/>
	);
};

export const createMockFiles = (count: number, withImages = true): File[] => {
	const images = [
		"https://news.stanford.edu/__data/assets/image/0028/165169/050609-228.jpg",
		"https://cdn.prod.website-files.com/64808e3805a22fc1ca46ffe9/671de0c11e075a7268aebaf1_Prompts%20That%20Makes%20Chatgpt%20Write%20like%20a%20Human.webp",
		"https://stephango.com/assets/covers/40-questions.png",
		"https://www.jeffsu.org/content/images/2021/03/RANDOM-PICS--2-.png",
		"https://garden.bradwoods.io/ogImage.jpg",
	];

	const titles = [
		"Getting Started with Obsidian",
		"Mind Mapping Techniques",
		"Productivity Systems",
		"Digital Garden Guide",
		"Note-Taking Best Practices",
		"Knowledge Management",
		"Second Brain Method",
		"Zettelkasten Explained",
	];

	return Array.from({ length: count }, (_, i) => ({
		id: `file-${i}`,
		file: aFile({ basename: titles[i % titles.length] }),
		image: withImages ? images[i % images.length] : "",
		title: titles[i % titles.length],
		onClick: () => console.log(`Clicked file: ${titles[i % titles.length]}`),
	}));
};

export const meta = {
	title: "Design System/AnimatedFolder",
	component: AnimatedFolderStory,
	parameters: {
		layout: "centered",
	},
	tags: ["internal"],
	argTypes: {
		title: {
			control: "text",
			name: "Folder Title",
			description: "The title displayed below the folder.",
			table: {
				category: "Content",
				defaultValue: { summary: "My Folder" },
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
		className: {
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
} satisfies Meta<typeof AnimatedFolderStory>;

export default meta;

export type Story = StoryObj<typeof meta>;
