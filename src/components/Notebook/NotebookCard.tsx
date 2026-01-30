import type { BasesEntry, BasesViewConfig } from "obsidian";
import { type CSSProperties, forwardRef, type MouseEventHandler } from "react";

import Card from "@/components/Card";
import type { CardConfig } from "@/components/Card/types";
import { cn } from "@/lib/utils";
import type { PageStyle } from "./types";

// Page patterns matching the notebook background
export const PAGE_PATTERNS: Record<PageStyle, string> = {
	plain: "#fbfae8",
	ruled: "linear-gradient(to bottom, #fbfae8 9px, #e4e4e4 1px)",
	squared:
		"linear-gradient(#e4e4e4 1px, transparent 1px), linear-gradient(90deg, #e4e4e4 1px, transparent 1px), #fbfae8",
	dotted:
		"linear-gradient(90deg, #fbfae8 10px, transparent 1%) center, linear-gradient(#fbfae8 10px, transparent 1%) center, #999",
};

export const PAGE_BACKGROUND_SIZES: Record<PageStyle, string | undefined> = {
	plain: undefined,
	ruled: "100% 10px",
	squared: "10px 10px",
	dotted: "11px 11px",
};

type NotebookCardProps = {
	entry: BasesEntry;
	config: BasesViewConfig;
	cardConfig: CardConfig;
	delay: number;
	isVisible: boolean;
	index: number;
	onClick?: MouseEventHandler<HTMLDivElement>;
	backgroundColor?: string;
	scaleFactor?: number;
	pageStyle: PageStyle;
	notebookWidth: number;
	notebookHeight: number;
	isPageHovered: boolean;
};

const NotebookCard = forwardRef<HTMLDivElement, NotebookCardProps>(
	(
		{
			entry,
			config,
			cardConfig,
			delay,
			isVisible,
			index,
			onClick,
			backgroundColor,
			scaleFactor = 1,
			pageStyle,
			notebookWidth,
			notebookHeight,
			isPageHovered,
		},
		ref,
	) => {
		// Page dimensions - slightly smaller than notebook to show as internal pages
		const pageWidth = notebookWidth * 0.92;
		const pageHeight = notebookHeight * 0.96;

		// Slide out distance when hovered - goes UP so it doesn't cover the tabs
		const slideOutDistance = notebookHeight * 0.7;

		const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
			event.stopPropagation();
			onClick?.(event);
		};

		// Calculate transform based on visibility and hover state
		// Page slides UP when hovered so it doesn't cover the tabs on the right
		const getTransform = () => {
			if (!isVisible) {
				return "translateY(0px)";
			}
			if (isPageHovered) {
				return `translateY(-${slideOutDistance}px)`;
			}
			return "translateY(0px)";
		};

		return (
			<div
				ref={ref}
				className={cn("absolute cursor-pointer")}
				style={{
					width: pageWidth,
					height: pageHeight,
					top: (notebookHeight - pageHeight) / 2,
					left: 0,
					transform: getTransform(),
					opacity: isVisible ? 1 : 0,
					transition: `all 500ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
					zIndex: isPageHovered ? 50 + index : 10 + index,
					background: PAGE_PATTERNS[pageStyle],
					backgroundSize: PAGE_BACKGROUND_SIZES[pageStyle],
					borderRadius: `${2 * scaleFactor}px ${12 * scaleFactor}px ${12 * scaleFactor}px ${2 * scaleFactor}px`,
					boxShadow: isPageHovered
						? "4px 4px 20px rgba(0,0,0,0.25)"
						: "1px 0px 3px rgba(0,0,0,0.1)",
					"--hover-background": backgroundColor ?? "var(--primary)",
				} as CSSProperties}
				onClick={handleClick}
			>
				{/* Page content - only visible when page is hovered */}
				<div
					className={cn(
						"absolute inset-0 flex items-center justify-center p-2 transition-opacity duration-300",
						isPageHovered ? "opacity-100" : "opacity-0",
					)}
				>
					<Card
						entry={entry}
						config={config}
						className="w-full h-full"
						{...cardConfig}
						cardSize={Math.min(pageWidth, pageHeight) * 0.85}
						adaptToSize
					/>
				</div>
			</div>
		);
	},
);

NotebookCard.displayName = "NotebookCard";

export default NotebookCard;
