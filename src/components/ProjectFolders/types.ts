import type { BasesEntry } from "obsidian";
import type { MouseEventHandler } from "react";

export type Folder = {
	title: string;
  icon: string | null;
	gradient: string;
	files: BasesEntry[];
	onClick?: MouseEventHandler<HTMLDivElement>;
};
