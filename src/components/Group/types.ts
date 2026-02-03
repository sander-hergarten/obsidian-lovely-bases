import type { BasesEntry, BasesPropertyId } from "obsidian";
import type { MouseEventHandler } from "react";

export type GroupItem = {
	title: string;
  icon: string | null;
  color: string;
  entry?: BasesEntry;
	files: BasesEntry[];
	onClick?: MouseEventHandler<HTMLDivElement>;
};

export type GroupShape = "folder" | "notebook";
export type GroupClickOnGroup = "expand" | "navigate" | "none";
export type GroupTitlePosition = "inside" | "outside" | "none";
export type GroupCounterPosition = "inside" | "outside" | "none";

export type GroupConfig = {
  groupInferPropertiesFromLinkedNotes?: boolean;
  groupClickOnGroup?: GroupClickOnGroup;
  groupShape?: GroupShape;
  groupCounterPosition?: GroupCounterPosition;
  groupTitlePosition?: GroupTitlePosition;
  groupColorProperty?: BasesPropertyId;
  groupIconProperty?: BasesPropertyId;
};
