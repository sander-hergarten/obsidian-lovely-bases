import type { BasesPropertyId } from "obsidian";

import type { CardConfig } from "@/components/Card/types";

export type ProjectFoldersConfig =  {
	/* Folder Properties */
	groupIconProperty?: BasesPropertyId;
	groupColorProperty?: BasesPropertyId;
} & CardConfig;
