import type { BasesEntry } from "obsidian";
import { cn } from "@/lib/utils";

import type { NotebookColors } from "./types";
import { getPageDimensions } from "./helpers/get-page-dimensions";

type Props = {
  entry: BasesEntry;
  width: number;
  height: number;
  scaleFactor: number;
  index: number;
  notebookColors: NotebookColors;
  hoveredPageIndex: number | null;
  isHovered: boolean;
  setHovered: (index: number | null) => void;
  totalFiles: number;
}

const PageMarker = ({ entry, width, height, scaleFactor, index, notebookColors, hoveredPageIndex, isHovered, setHovered, totalFiles }: Props) => {
  const { width: pageWidth, height: pageHeight } = getPageDimensions(width, height, scaleFactor);

  const tabWidth = 14 * scaleFactor;
  const tabHeight = (pageHeight * 0.5) / 5;
  const tabSpacing = 3 * scaleFactor;
  // Position tabs from the bottom edge upwards
  const totalTabsHeight = totalFiles * tabHeight + (totalFiles - 1) * tabSpacing;
  const tabTop = height - totalTabsHeight - (11 * scaleFactor) + index * (tabHeight + tabSpacing);
  const tabLeft = pageWidth;
  const tabColor = notebookColors[`tab${index + 1}`];

  // Extended hit area padding (larger interaction zone)
  const hitAreaPadding = 8 * scaleFactor;

  // Disable pointer events on other tabs when a card is hovered
  const isOtherTabWhileCardActive = hoveredPageIndex !== null && hoveredPageIndex !== index;

  // Staggered delay that syncs with cover opening
  // Tabs appear as the cover reveals them (from bottom to top)
  const tabDelay = isHovered
    ? 200 + (totalFiles - 1 - index) * 60 // Appear from bottom
    : index * 30; // Disappear from top

  return (
    // Outer container: larger hit area for easier hover interaction
    <div
      key={`tab-${entry.file.path}`}
      className="absolute cursor-pointer"
      style={{
        width: tabWidth + hitAreaPadding * 2,
        height: tabHeight + hitAreaPadding * 2,
        top: tabTop - hitAreaPadding,
        left: tabLeft - hitAreaPadding,
        opacity: isHovered ? 1 : 0,
        // Tabs slide out from behind the pages with a spring effect
        transition: isHovered
          ? `opacity 350ms ease-out ${tabDelay}ms`
          : `opacity 200ms ease-in ${tabDelay}ms`,
        pointerEvents: isOtherTabWhileCardActive ? "none" : "auto",
      }}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {/* Inner element: visual representation of the tab */}
      <div
        className={cn(
          "absolute",
          hoveredPageIndex === index
            ? "scale-105"
            : "hover:scale-102",
        )}
        style={{
          width: tabWidth,
          height: tabHeight,
          top: hitAreaPadding,
          left: hitAreaPadding,
          background: tabColor,
          borderRadius: `0 ${5 * scaleFactor}px ${5 * scaleFactor}px 0`,
          boxShadow: hoveredPageIndex === index
            ? "2px 1px 6px rgba(0,0,0,0.2)"
            : "1px 1px 3px rgba(0,0,0,0.12)",
          borderTop: "1px solid rgba(0,0,0,0.1)",
          borderRight: "1px solid rgba(0,0,0,0.1)",
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          // Tab slides out with spring physics
          transform: isHovered
            ? "translateX(0) scale(1)"
            : "translateX(-12px) scale(0.9)",
          // Different easing for in vs out
          transition: isHovered
            ? `transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1) ${tabDelay}ms, box-shadow 300ms ease-out`
            : `transform 250ms cubic-bezier(0.55, 0.06, 0.68, 0.19) ${tabDelay}ms, box-shadow 200ms ease-in`,
        }}
      />
    </div>
  );
}

export default PageMarker;
