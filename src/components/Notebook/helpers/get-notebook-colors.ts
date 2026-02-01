import {
	accent,
	darken,
	desaturate,
	gradientColors,
	lighten,
	luminance,
	saturate,
} from "@/lib/colors";
import type { NotebookColors } from "../types";

export const getNotebookColors = (
	gradient = `linear-gradient(135deg, ${accent()} 0%, ${lighten(accent() || "#000", 0.2)} 100%)`,
  isPadded = false,
): NotebookColors => {
	const colors = gradientColors(gradient);
	const primaryColor = colors[0] || accent();

	const coverBg = gradient;
	const elasticBand = primaryColor;
	const elasticBandDark = darken(primaryColor, 0.15);
	const labelBg = "var(--card)";
	const labelAccent = luminance(primaryColor) > 0.5 ?
    darken(primaryColor, 0.2) :
    lighten(primaryColor, 0.2);
	const pageBg = isPadded ? lighten(primaryColor, 0.85) : "var(--bases-card-background)";
	const pagePatternLine = "var(--color-border)";
	const pagePatternDot = "var(--color-border)";
	const iconColor = desaturate(primaryColor, 0.2);
	const fileColor = saturate(colors[1] || primaryColor, 0.2);

  const tab1Color = desaturate(primaryColor, 0.2);
  const tab2Color = desaturate(primaryColor, 0.4);
  const tab3Color = desaturate(primaryColor, 0.6);
  const tab4Color = desaturate(primaryColor, 0.8);
  const tab5Color = desaturate(primaryColor, 1.0);

	return {
		coverBg,
		elasticBand,
		elasticBandDark,
		labelBg,
		labelAccent,
		pageBg,
		pagePatternLine,
		pagePatternDot,
		iconColor,
		fileColor,
		tab1Color,
		tab2Color,
		tab3Color,
		tab4Color,
		tab5Color,
	};
};
