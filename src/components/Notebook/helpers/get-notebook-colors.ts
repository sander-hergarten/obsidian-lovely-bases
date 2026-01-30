import {
	accent,
	darken,
	desaturate,
	gradientColors,
	lighten,
	saturate,
} from "@/lib/colors";
import type { NotebookColors } from "../types";

export const getNotebookColors = (
	gradient = `linear-gradient(135deg, ${accent()} 0%, ${lighten(accent() || "#000", 0.2)} 100%)`,
): NotebookColors => {
	const colors = gradientColors(gradient);
	const primaryColor = colors[0] || "#cc4b48";

	const coverBg = primaryColor;
	const elasticBand = primaryColor;
	const elasticBandDark = darken(primaryColor, 0.15);
	const labelBg = "#e8e8e0";
	const labelAccent = "#cddc39";
	const pageBg = "#fbfae8";
	const iconColor = desaturate(primaryColor, 0.2);
	const fileColor = saturate(colors[1] || primaryColor, 0.2);

	return {
		coverBg,
		elasticBand,
		elasticBandDark,
		labelBg,
		labelAccent,
		pageBg,
		iconColor,
		fileColor,
	};
};
