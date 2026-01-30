import { useMemo } from "react";
import { getFolderColors } from "../helpers/get-folder-colors";
import type { FolderColors } from "../types";

export const useFolderColors = (
  gradient?: string,
  colors?: FolderColors,
): FolderColors => {
  return useMemo(() => {
    if (colors) {
      return colors;
    }

    return getFolderColors(gradient);
  }, [gradient, colors]);
}
