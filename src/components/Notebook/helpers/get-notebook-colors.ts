import {
	accent,
	darken,
	desaturate,
	lighten,
	linear,
	luminance,
} from "@/lib/colors";

import type { NotebookColors } from "../types";

export const getNotebookColors = (
	color?: string,
): NotebookColors => {
	const primary = color ?? accent();

	return {
		coverBg: linear(primary, 0.2),
		elasticBand: primary,
		elasticBandDark: darken(primary, 0.15),
		labelBg: "var(--card)",
		labelAccent: luminance(primary) > 0.5 ?
      darken(primary, 0.2) :
      lighten(primary, 0.2),
		pageBg: "var(--card)",
		pagePattern: "var(--color-border)",
		foreground: desaturate(primary, 0.2),
		tab1: desaturate(primary, 0.2),
		tab2: desaturate(primary, 0.4),
		tab3: desaturate(primary, 0.6),
		tab4: desaturate(primary, 0.8),
		tab5: desaturate(primary, 1.0),
	};
};
