import { cva } from "class-variance-authority";
import { memo, type ReactNode } from "react";

import { cn } from "@/lib/utils";

import type { Variants } from "./types";

const gridItemStyles = cva("overflow-hidden hover:cursor-pointer w-full h-full", {
	variants: {
		variant: {
			default: "rounded-sm",
			masonry: "rounded-sm",
			polaroid:
				"border-10 border-b-28 border-(--background-secondary) shadow-xl even:rotate-3 odd:-rotate-2 hover:rotate-0 transition-transform ease-out duration-300",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

type Props = {
	x: number;
	y: number;
	width: number;
	height: number;
	variant: Variants;
	children: ReactNode;
};

const GridItem = memo(
	({ x, y, width, height, variant, children }: Props) => {
		return (
			<div
				className="pointer-events-auto"
				style={{
					position: "absolute",
					transform: `translate3d(${x}px, ${y}px, 0)`,
					width,
					height,
					willChange: "transform",
				}}
			>
				<div className={cn(gridItemStyles({ variant }), "w-full h-full")}>
					{children}
				</div>
			</div>
		);
	},
	(prevProps, nextProps) => {
		// Shallow comparison for performance
		return (
			prevProps.x === nextProps.x &&
			prevProps.y === nextProps.y &&
			prevProps.width === nextProps.width &&
			prevProps.height === nextProps.height &&
			prevProps.variant === nextProps.variant
		);
	},
);

GridItem.displayName = "GridItem";

export default GridItem;
