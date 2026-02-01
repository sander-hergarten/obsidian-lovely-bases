import { useMemo } from "react";

import { getNotebookColors } from "../helpers/get-notebook-colors";
import type { NotebookColors } from "../types";

export const useNotebookColors = (
	gradient?: string,
	colors?: NotebookColors,
  isPadded?: boolean,
): NotebookColors => {
	return useMemo(() => {
		if (colors) {
			return colors;
		}

		return getNotebookColors(gradient, isPadded);
	}, [gradient, colors, isPadded]);
};
