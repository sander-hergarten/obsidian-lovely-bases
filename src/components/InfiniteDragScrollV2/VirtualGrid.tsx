import type { BasesEntry } from "obsidian";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import GridItem from "./GridItem";
import { useVirtualGrid } from "./hooks/use-virtual-grid";
import type { ItemConfig } from "./ItemContent";
import type { Variants } from "./types";

type ScrollPosition = {
	x: number;
	y: number;
};

type VirtualGridProps = {
	items: BasesEntry[];
	itemConfig: ItemConfig;
	columns: number;
	cellWidth: number;
	cellHeight: number;
	gapX: number;
	gapY: number;
	scrollPosition: ScrollPosition;
	variant: Variants;
	viewportWidth: number;
	viewportHeight: number;
	className?: string;
};

export const VirtualGrid = ({
	items,
	itemConfig,
	columns,
	cellWidth,
	cellHeight,
	gapX,
	gapY,
	scrollPosition,
	variant,
	viewportWidth,
	viewportHeight,
	className,
}: VirtualGridProps) => {
	const [ItemContentComponent, setItemContentComponent] = useState<
		typeof import("./ItemContent").default | null
	>(null);

	// Lazy load ItemContent to avoid circular dependencies
	useEffect(() => {
		import("./ItemContent").then((module) => {
			setItemContentComponent(() => module.default);
		});
	}, []);

	// Calculate visible items using safe virtualization hook
	const visibleItems = useVirtualGrid({
		totalItems: items.length,
		columns,
		cellWidth,
		cellHeight,
		gapX,
		gapY,
		scrollX: scrollPosition.x,
		scrollY: scrollPosition.y,
		viewportWidth,
		viewportHeight,
		variant,
		buffer: 3,
	});

	if (!ItemContentComponent) {
		return null;
	}

	return (
		<div className={cn("absolute inset-0", className)}>
			{visibleItems.map(({ key, realIndex, x, y }) => (
				<GridItem
					key={key}
					x={x}
					y={y}
					width={cellWidth}
					height={cellHeight}
					variant={variant}
				>
					<ItemContentComponent
						item={items[realIndex]}
						tabIndex={realIndex === 0 ? 0 : undefined}
						{...itemConfig}
					/>
				</GridItem>
			))}
		</div>
	);
};
