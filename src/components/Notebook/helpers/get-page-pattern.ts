import type { CSSProperties } from "react";

import type { PageStyle } from "../types";

const PAGE_BACKGROUND_SIZES: Record<PageStyle, string | undefined> = {
	plain: undefined,
	ruled: "100% 10px",
	squared: "10px 10px",
	dotted: "11px 11px",
};

const PAGE_BACKGROUNDS: Record<PageStyle, (backgroundColor: string, patternColor: string) => string> = {
  plain: (backgroundColor: string, _: string) => backgroundColor,
  ruled: (backgroundColor: string, patternColor: string) => `linear-gradient(to bottom, ${backgroundColor} 9px, ${patternColor} 1px)`,
  squared: (backgroundColor: string, patternColor: string) => `linear-gradient(${patternColor} 1px, transparent 1px), linear-gradient(90deg, ${patternColor} 1px, transparent 1px), ${backgroundColor}`,
  dotted: (backgroundColor: string, patternColor: string) => `linear-gradient(90deg, ${backgroundColor} 10px, transparent 1%) center, linear-gradient(${backgroundColor} 10px, transparent 1%) center, ${patternColor}`,
}

type GetPagePatternParams = {
  pageStyle: PageStyle,
  backgroundColor: string,
  patternColor: string,
}

export const getPagePattern = ({ pageStyle, backgroundColor, patternColor }: GetPagePatternParams): CSSProperties => {
  return {
    background: PAGE_BACKGROUNDS[pageStyle](backgroundColor, patternColor),
    backgroundSize: PAGE_BACKGROUND_SIZES[pageStyle],
  }
};
