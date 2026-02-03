
const NOTEBOOK_PAGE_WIDTH = 0.92;
const NOTEBOOK_PAGE_HEIGHT = 0.96;
const NOTEBOOK_PAGE_PADDING = 6;

// Page dimensions - slightly smaller than notebook to show as internal pages
export const getPageDimensions = (
  notebookWidth: number,
  notebookHeight: number,
  scaleFactor?: number,
  padContent?: boolean,
) => {
  return {
    width: notebookWidth * NOTEBOOK_PAGE_WIDTH,
    height: notebookHeight * NOTEBOOK_PAGE_HEIGHT,
    padding: padContent && scaleFactor ? NOTEBOOK_PAGE_PADDING * scaleFactor : 0,
  };
}
