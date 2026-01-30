import type { BasesPropertyId } from "obsidian";

import type { CardConfig } from "@/components/Card/types";

export type ProjectFoldersConfig = CardConfig & {
	/* Folder Properties */
	iconProperty?: BasesPropertyId;
	colorProperty?: BasesPropertyId;
	/* Display */
	colorizeFiles?: boolean;
}
