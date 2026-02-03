import type { BasesPropertyId } from "obsidian";

import type { CardConfig } from "@/components/Card/types";

export type GroupShape = "folder" | "notebook";
export type GroupTitlePosition = "inside" | "outside" | "none";
export type GroupCounterPosition = "inside" | "outside" | "none";

export type ProjectFoldersConfig = {
	/* Folder Properties */
	groupIconProperty?: BasesPropertyId;
	groupColorProperty?: BasesPropertyId;
	groupShape?: GroupShape;
	groupTitlePosition?: GroupTitlePosition;
  groupCounterPosition?: GroupCounterPosition;
} & CardConfig;
