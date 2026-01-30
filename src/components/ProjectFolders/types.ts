import type { BasesEntry, TFile } from "obsidian";
import type { MouseEventHandler } from "react";


export type File = {
	id: string;
	entry: BasesEntry;
	onClick?: MouseEventHandler<HTMLDivElement>;
};

export type Folder = {
	title: string;
  icon: string | null;
	gradient: string;
	files: File[];
	onClick?: MouseEventHandler<HTMLDivElement>;
};
