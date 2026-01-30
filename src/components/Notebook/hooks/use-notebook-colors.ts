import { useMemo } from "react";

import { getNotebookColors } from "../helpers/get-notebook-colors";
import type { NotebookColors } from "../types";

export const useNotebookColors = (
	gradient?: string,
	colors?: NotebookColors,
): NotebookColors => {
	return useMemo(() => {
		if (colors) {
			return colors;
		}

		return getNotebookColors(gradient);
	}, [gradient, colors]);
};
