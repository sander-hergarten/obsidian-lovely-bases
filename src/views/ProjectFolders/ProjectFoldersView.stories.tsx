import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import {
	APPLICATION_ENTRIES,
	ARTICLE_ENTRIES,
	BOOK_ENTRIES,
	MOVIES_ENTRIES,
	PERSON_ENTRIES,
	PHOTOS_ENTRIES,
} from "@/__fixtures__/entries";
import { aBasesEntryGroup } from "@/__mocks__";
import CardMeta from "@/components/Card/stories/meta";
import { type NamespacedTranslationKey, translate } from "@/lib/i18n";
import {
	createViewRenderer,
	Providers,
	ViewWrapper,
} from "@/stories/decorators";

import PROJECT_FOLDERS_VIEW from ".";
import {
	CIRCLE_SHAPE_CONFIG,
	COLORIZED_FILES_CONFIG,
	DEFAULT_CONFIG,
	FULL_CONFIG,
	HORIZONTAL_LAYOUT_CONFIG,
	OVERLAY_LAYOUT_CONFIG,
	POLAROID_LAYOUT_CONFIG,
	ROUNDED_SHAPE_CONFIG,
} from "./__fixtures__/config";
import ProjectFoldersView from "./ProjectFoldersView";
import type { ProjectFoldersConfig } from "./types";

const t = (key: NamespacedTranslationKey<"projectFolders">) =>
	translate("en", "projectFolders", key);

const View = createViewRenderer<ProjectFoldersConfig>(ProjectFoldersView);

const meta = {
	title: "Views/Project Folders",
	component: View,
	tags: ["autodocs"],
	decorators: [Providers, ViewWrapper],
	parameters: {
		layout: "fullscreen",
		docs: {
			icon: PROJECT_FOLDERS_VIEW.icon,
			subtitle:
				"A tactile, organization-focused view that groups your notes into beautiful 3D interactive folders. Perfect for managing projects, areas, or any hierarchical collection.",
			description: {
				component: `### Features

- **Interactive 3D Folders**: Folders that dynamically open and tilt on hover, providing a playful and organic feel.
- **File Previews**: Up to 5 notes from each group are displayed as cards popping out of the folder when you move over it.
- **Visual Metadata**: Automatically extracts icons and colors from the frontmatter of the note representing the folder.
- **Smart Grouping**: Leverages your Base's grouping settings to automatically organize notes into relevant categories.
- **Custom Gradients**: Generates beautiful, color-matched gradients for each folder based on its assigned color.
- **Customizable Cards**: Full Card component configuration for file previews (layout, shape, badges, etc.).

### Configuration`,
			},
		},
	},
	argTypes: {
		...CardMeta.argTypes,
		// Folder-specific Properties
		iconProperty: {
			control: "text",
			name: t("options.dataProperties.iconProperty.title"),
			description:
				"The property that contains the icon to display on folders.",
			table: {
				category: t("options.dataProperties.title"),
				defaultValue: { summary: "note.icon" },
			},
		},
		colorProperty: {
			control: "text",
			name: t("options.dataProperties.colorProperty.title"),
			description:
				"The property that contains the color to display on folders.",
			table: {
				category: t("options.dataProperties.title"),
				defaultValue: { summary: "note.color" },
			},
		},
		colorizeFiles: {
			control: "boolean",
			name: t("options.display.colorizeFiles.title"),
			description:
				"Whether to colorize the file cards based on the folder color.",
			table: {
				category: t("options.display.title"),
				defaultValue: { summary: "false" },
			},
		},
		// Internal props (disabled)
		data: {
			table: {
				disable: true,
			},
		},
		groupedData: {
			table: {
				disable: true,
			},
		},
		onEntryClick: {
			table: {
				disable: true,
			},
		},
		onEntryHover: {
			table: {
				disable: true,
			},
		},
	},
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FullExample: Story = {
	args: {
		groupedData: [
			aBasesEntryGroup("[[Articles]]", ARTICLE_ENTRIES),
			aBasesEntryGroup("[[Movies]]", MOVIES_ENTRIES),
			aBasesEntryGroup("[[Books]]", BOOK_ENTRIES),
			aBasesEntryGroup("[[People]]", PERSON_ENTRIES),
			aBasesEntryGroup("[[Applications]]", APPLICATION_ENTRIES),
		],
		onEntryClick: fn(),
		...FULL_CONFIG,
	},
};

export const Default: Story = {
	parameters: {
		docs: {
			description: {
				story:
					"By default, the Project Folders view displays grouped notes in interactive 3D folders with file previews on hover.",
			},
		},
	},
	args: {
		groupedData: [
			aBasesEntryGroup("[[Movies]]", MOVIES_ENTRIES),
			aBasesEntryGroup("[[Books]]", BOOK_ENTRIES),
			aBasesEntryGroup("[[People]]", PERSON_ENTRIES),
		],
		onEntryClick: fn(),
		...DEFAULT_CONFIG,
	},
};

// === LAYOUT STORIES ===

export const HorizontalLayout: Story = {
	parameters: {
		docs: {
			description: {
				story: `Horizontal layout displays the image on the side of the card content.

\`\`\`yml
layout: horizontal
\`\`\`
`,
			},
		},
	},
	args: {
		groupedData: [
			aBasesEntryGroup("[[Articles]]", ARTICLE_ENTRIES),
			aBasesEntryGroup("[[Books]]", BOOK_ENTRIES),
		],
		onEntryClick: fn(),
		...HORIZONTAL_LAYOUT_CONFIG,
	},
};

export const OverlayLayout: Story = {
	parameters: {
		docs: {
			description: {
				story: `Overlay layout displays the content over the image with a gradient overlay. Supports badges.

\`\`\`yml
layout: overlay
overlayContentVisibility: always
badgeProperty: note.rating
badgeIcon: star
badgeColor: "#D0A215"
\`\`\`
`,
			},
		},
	},
	args: {
		groupedData: [
			aBasesEntryGroup("[[Movies]]", MOVIES_ENTRIES),
			aBasesEntryGroup("[[Books]]", BOOK_ENTRIES),
		],
		onEntryClick: fn(),
		...OVERLAY_LAYOUT_CONFIG,
	},
};

export const PolaroidLayout: Story = {
	parameters: {
		docs: {
			description: {
				story: `Polaroid layout displays cards with a classic photo-album aesthetic.

\`\`\`yml
layout: polaroid
\`\`\`
`,
			},
		},
	},
	args: {
		groupedData: [
			aBasesEntryGroup("[[Photos]]", PHOTOS_ENTRIES),
			aBasesEntryGroup("[[Movies]]", MOVIES_ENTRIES),
		],
		onEntryClick: fn(),
		...POLAROID_LAYOUT_CONFIG,
	},
};

// === SHAPE STORIES ===

export const CircleShape: Story = {
	parameters: {
		docs: {
			description: {
				story: `Circle shape creates rounded cards perfect for profile images or avatars.

\`\`\`yml
shape: circle
\`\`\`
`,
			},
		},
	},
	args: {
		groupedData: [
			aBasesEntryGroup("[[People]]", PERSON_ENTRIES),
			aBasesEntryGroup("[[Applications]]", APPLICATION_ENTRIES),
		],
		onEntryClick: fn(),
		...CIRCLE_SHAPE_CONFIG,
	},
};

export const RoundedShape: Story = {
	parameters: {
		docs: {
			description: {
				story: `Rounded shape provides a softer, more modern appearance with content visible on hover.

\`\`\`yml
shape: rounded
overlayContentVisibility: hover
\`\`\`
`,
			},
		},
	},
	args: {
		groupedData: [
			aBasesEntryGroup("[[Applications]]", APPLICATION_ENTRIES),
			aBasesEntryGroup("[[Movies]]", MOVIES_ENTRIES),
		],
		onEntryClick: fn(),
		...ROUNDED_SHAPE_CONFIG,
	},
};

// === COLORIZE STORIES ===

export const ColorizedFiles: Story = {
	parameters: {
		docs: {
			description: {
				story: `Enable colorization of file cards based on the folder color for a more cohesive visual experience.

\`\`\`yml
colorizeFiles: true
colorProperty: note.color
\`\`\`
`,
			},
		},
	},
	args: {
		groupedData: [
			aBasesEntryGroup("[[Movies]]", MOVIES_ENTRIES),
			aBasesEntryGroup("[[Books]]", BOOK_ENTRIES),
			aBasesEntryGroup("[[People]]", PERSON_ENTRIES),
			aBasesEntryGroup("[[Applications]]", APPLICATION_ENTRIES),
		],
		onEntryClick: fn(),
		...COLORIZED_FILES_CONFIG,
	},
};
