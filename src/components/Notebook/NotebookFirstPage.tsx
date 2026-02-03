import { memo } from "react";
import { getPageDimensions } from "./helpers/get-page-dimensions";
import { getPagePattern } from "./helpers/get-page-pattern";
import type { PageStyle } from "./types";

type Props = {
  pageStyle: PageStyle;
  backgroundColor: string;
  patternColor: string;
  notebookWidth: number;
  notebookHeight: number;
  scaleFactor: number;
};

const NotebookFirstPage = memo(({
  pageStyle,
  backgroundColor,
  patternColor,
  notebookWidth,
  notebookHeight,
  scaleFactor,
}: Props) => {
  const pagePattern = getPagePattern({
    pageStyle,
    backgroundColor,
    patternColor,
  });
  const { width, height } = getPageDimensions(
    notebookWidth,
    notebookHeight,
    scaleFactor,
  );

  return (
    <div
      className="absolute overflow-hidden shadow-2xl border border-border"
      style={{
        width,
        height,
        top: (notebookHeight - height) / 2,
        borderRadius: `${5 * scaleFactor}px ${16 * scaleFactor}px ${16 * scaleFactor}px ${5 * scaleFactor}px`,
        zIndex: 0,
        ...pagePattern,
      }}
    />
  );
}, (prevProps, nextProps) => {
  return prevProps.pageStyle === nextProps.pageStyle &&
    prevProps.backgroundColor === nextProps.backgroundColor &&
    prevProps.patternColor === nextProps.patternColor &&
    prevProps.notebookWidth === nextProps.notebookWidth &&
    prevProps.notebookHeight === nextProps.notebookHeight &&
    prevProps.scaleFactor === nextProps.scaleFactor;
});

NotebookFirstPage.displayName = "NotebookFirstPage";

export default NotebookFirstPage;
