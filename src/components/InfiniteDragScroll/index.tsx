import type { BasesEntry } from "obsidian";
import { useEffect, useState } from "react";

import { useObsidian } from "../Obsidian/Context";
import { DraggableContainer } from "./DraggableContainer"
import type { ItemConfig } from "./ItemContent";
import { VirtualGrid } from "./VirtualGrid";

type Props = {
  items: BasesEntry[];
  itemConfig: ItemConfig;
  variant: "default" | "masonry" | "polaroid";
}

const InfiniteDragScroll = ({
  items,
  itemConfig,
  variant
}: Props) => {
  const { containerEl } = useObsidian();

  // Cell dimensions matching original Tailwind classes
	// w-36 = 144px, h-54 = 216px (mobile)
	// md:w-64 = 256px, md:h-96 = 384px (desktop)
	// gap-x-14 = 56px (mobile), md:gap-x-28 = 112px (desktop)
	const cellWidth = itemConfig.cardSize;
	const cellHeight = itemConfig.cardSize * itemConfig.aspectRatio;
	const gapX = itemConfig.cardSize / 2;
	// gapY is always 0 because masonry/polaroid variants use offset-based positioning
	// instead of uniform vertical gaps. Keeping it as a prop maintains flexibility
	// for potential future variants that might need vertical spacing.
	const gapY = 0;

	// Calculate columns reactively based on container width
	// Formula: (width + gapX) / (cellWidth + gapX) to account for gaps between items
	// Start with 1 as safe default, will be updated once container has valid dimensions
	const [columns, setColumns] = useState(1);

	// Update columns when container size changes
	useEffect(() => {
		if (!containerEl) return;

		const updateColumns = () => {
			const width = containerEl.clientWidth;
			// Only update if we have a valid width (prevents incorrect calculations on mount)
			// This is critical on mobile where layout calculation can be delayed
			if (width > 0 && cellWidth > 0) {
				const calculatedColumns = Math.floor((width + gapX) / (cellWidth + gapX));
				const newColumns = Math.max(1, calculatedColumns);
				// Only update if the value actually changed to avoid unnecessary re-renders
				setColumns((prev) => (prev !== newColumns ? newColumns : prev));
			}
		};

		// Use ResizeObserver to react to container size changes
		const resizeObserver = new ResizeObserver((entries) => {
			// Only update if the size actually changed
			for (const entry of entries) {
				if (entry.contentRect.width > 0) {
					updateColumns();
					break;
				}
			}
		});

		resizeObserver.observe(containerEl);

		// Initial calculation - use requestAnimationFrame to ensure layout is complete
		// This is especially important on mobile where layout calculation can be delayed
		const rafId = requestAnimationFrame(() => {
			updateColumns();
		});

		return () => {
			cancelAnimationFrame(rafId);
			resizeObserver.disconnect();
		};
	}, [containerEl, cellWidth, gapX]);

  return (
			<DraggableContainer variant={variant}>
        <VirtualGrid
          items={items}
          itemConfig={itemConfig}
          columns={columns}
          cellWidth={cellWidth}
          cellHeight={cellHeight}
          gapX={gapX}
          gapY={gapY}
        />
    </DraggableContainer>
  );
};

export default InfiniteDragScroll;
