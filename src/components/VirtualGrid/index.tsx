import { useVirtualizer } from "@tanstack/react-virtual";
import { type ComponentType, useLayoutEffect, useMemo } from "react";
import { useElementWidth } from "./hooks/use-element-width";

function chunkIntoRows<T>(items: T[], columns: number): T[][] {
	if (columns <= 0) return [];
	const rows: T[][] = [];
	for (let i = 0; i < items.length; i += columns) {
		rows.push(items.slice(i, i + columns));
	}
	return rows;
}

type Props<T extends {
  id: string;
} = {
  id: string;
}> = {
	component: ComponentType<T>;
	items: T[];
	minCardWidth?: number;
	gap?: number;
	padding?: number;
	estimateRowHeight?: number;
};

const VirtualGrid = ({
  component: Component,
	items,
	minCardWidth = 240, // ancho mínimo deseado por card
	gap = 16,
	padding = 0,
	estimateRowHeight = 320,
}: Props) => {
	const [scrollRef, width] = useElementWidth<HTMLDivElement>();

	const columnCount = useMemo(() => {
		const inner = Math.max(0, width - padding * 2);
		if (inner === 0) return 1;
		return Math.max(1, Math.floor((inner + gap) / (minCardWidth + gap)));
	}, [width, padding, gap, minCardWidth]);

	const rows = useMemo(
		() => chunkIntoRows(items, columnCount),
		[items, columnCount],
	);

	const virtualizer = useVirtualizer({
		count: rows.length,
		getScrollElement: () => scrollRef.current,
		estimateSize: () => estimateRowHeight,
		overscan: 6,
	});

	useLayoutEffect(() => {
		virtualizer.measure();
	}, [columnCount, virtualizer]);

	return (
		<div
			ref={scrollRef}
			style={{
				height: "100%",
				overflow: "auto",
				padding,
			}}
		>
			<div
				style={{
					height: virtualizer.getTotalSize(),
					position: "relative",
				}}
			>
				{virtualizer.getVirtualItems().map((vRow) => {
					const rowItems = rows[vRow.index] ?? [];

					return (
						<div
							key={vRow.key}
							// 👇 esto hace que TanStack Virtual mida el alto real de la fila
							ref={virtualizer.measureElement}
							data-index={vRow.index}
							style={{
								position: "absolute",
								top: 0,
								left: 0,
								width: "100%",
								transform: `translateY(${vRow.start}px)`,
								display: "grid",
								gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
								gap,
								boxSizing: "border-box",
							}}
						>
							{rowItems.map((item) => (
								<Component key={item.id} {...item} />
							))}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default VirtualGrid;
