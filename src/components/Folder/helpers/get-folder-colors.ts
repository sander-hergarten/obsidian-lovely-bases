import { accent, desaturate, gradientColors, lighten, saturate } from "@/lib/colors";
import type { FolderColors } from "../types";

export const getFolderColors = (
  gradient = `linear-gradient(135deg, ${accent()} 0%, ${lighten(accent() || "#000", 0.2)} 100%)`,
): FolderColors => {
  const backBg =
    gradient ||
    "linear-gradient(135deg, var(--folder-back) 0%, var(--folder-tab) 100%)";
  const tabBg = gradient || "var(--folder-tab)";
  const frontBg =
    gradient ||
    "linear-gradient(135deg, var(--folder-front) 0%, var(--folder-back) 100%)";

  const colors = gradientColors(gradient);

  const fileColor = saturate(colors[1], 0.2);
  const iconColor = desaturate(colors[0], 0.2);

  return {
    backBg,
    tabBg,
    frontBg,
    colors,
    fileColor,
    iconColor,
  }

}
