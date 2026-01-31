import type { BasesEntry } from "obsidian";
import type { MouseEventHandler } from "react";


export type File = {
	id: string;
	entry: BasesEntry;
};

export type Folder = {
	title: string;
  icon: string | null;
	gradient: string;
	files: File[];
	onClick?: MouseEventHandler<HTMLDivElement>;
};

export type FolderColors = {
  backBg: string;
  tabBg: string;
  frontBg: string;
  colors: string[];
  fileColor: string;
  iconColor: string;
};
