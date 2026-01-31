import type { BasesEntry, BasesViewConfig } from "obsidian";
import { type CSSProperties, forwardRef, type MouseEventHandler } from "react";

import Card from "@/components/Card";
import type { CardConfig } from "@/components/Card/types";
import { cn } from "@/lib/utils";
import type { NotebookColors, PageStyle } from "./types";

// Generate page patterns using notebook colors
export const getPagePattern = (
	pageStyle: PageStyle,
	colors: NotebookColors,
): string => {
	const { pageBg, pagePatternLine, pagePatternDot } = colors;

	switch (pageStyle) {
		case "plain":
			return pageBg;
		case "ruled":
			return `linear-gradient(to bottom, ${pageBg} 9px, ${pagePatternLine} 1px)`;
		case "squared":
			return `linear-gradient(${pagePatternLine} 1px, transparent 1px), linear-gradient(90deg, ${pagePatternLine} 1px, transparent 1px), ${pageBg}`;
		case "dotted":
			return `linear-gradient(90deg, ${pageBg} 10px, transparent 1%) center, linear-gradient(${pageBg} 10px, transparent 1%) center, ${pagePatternDot}`;
		default:
			return pageBg;
	}
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
	colors: NotebookColors;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
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
			backgroundColor,
			scaleFactor = 1,
			pageStyle,
			notebookWidth,
			notebookHeight,
			isPageHovered,
			colors,
			onMouseEnter,
			onMouseLeave,
		},
		ref,
	) => {
		// Page dimensions - slightly smaller than notebook to show as internal pages
		const pageWidth = notebookWidth * 0.92;
		const pageHeight = notebookHeight * 0.96;

		// Slide out distance when hovered - goes UP so it doesn't cover the tabs
		const slideOutDistance = notebookHeight * 0.2;

		const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
			event.stopPropagation();
		};

		// Calculate transform based on visibility and hover state
		// When page is hovered, it "flips up" like turning a real notebook page
		// Uses rotateX for the page-turn effect combined with translateY for final position
		const getTransform = () => {
			if (!isVisible) {
				// Hidden state: page is flat inside the notebook
				return "rotateX(0deg) translateY(0px) translateZ(0px)";
			}
			if (isPageHovered) {
				// Active/hovered state: page has flipped up to reveal content
				// Final position matches original: translateY + translateX + rotate(10deg)
				return `translateY(-${slideOutDistance}px) translateX(5px) rotate(7deg)`;
			}
			// Visible but not hovered: page is resting in the notebook
			return "rotateX(0deg) translateY(0px) translateZ(0px)";
		};

		// Dynamic shadow that changes during the page flip
		const getBoxShadow = () => {
			if (!isVisible) {
				return "0 1px 2px rgba(0,0,0,0.05)";
			}
			if (isPageHovered) {
				// Elevated shadow when page is lifted - simulates light from above
				return "0 15px 35px rgba(0,0,0,0.2), 0 5px 15px rgba(0,0,0,0.1)";
			}
			// Subtle shadow for stacked pages
			return "1px 0px 3px rgba(0,0,0,0.1)";
		};

		// Easing function that mimics paper physics:
		// - Fast start (page lifts quickly)
		// - Slow middle (air resistance)
		// - Gentle settle (page lands softly)
		const pageFlipEasing = "cubic-bezier(0.34, 1.56, 0.64, 1)";

		// Transition timing varies based on state for more natural feel
		const getTransition = () => {
			if (isPageHovered) {
				// Flipping up: slightly faster, with bounce
				return `transform 450ms ${pageFlipEasing} ${delay}ms, opacity 300ms ease-out ${delay}ms, box-shadow 400ms ease-out ${delay}ms`;
			}
			// Settling back: slower, more gentle
			return `transform 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms, opacity 300ms ease-in ${delay}ms, box-shadow 350ms ease-in ${delay}ms`;
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
					transformStyle: "preserve-3d",
					transformOrigin: "center bottom",
					transform: getTransform(),
					opacity: isPageHovered ? 1 : 0,
					transition: getTransition(),
					zIndex: isPageHovered ? 50 + index : 10 + index,
					background: getPagePattern(pageStyle, colors),
					backgroundSize: PAGE_BACKGROUND_SIZES[pageStyle],
					borderRadius: `${2 * scaleFactor}px ${12 * scaleFactor}px ${12 * scaleFactor}px ${2 * scaleFactor}px`,
					boxShadow: getBoxShadow(),
					"--hover-background": backgroundColor ?? "var(--primary)",
					pointerEvents: isPageHovered ? "auto" : "none",
					// Subtle backface for realism
					backfaceVisibility: "hidden",
				} as CSSProperties}
				onClick={handleClick}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
			>
				{/* Page content - fades in as page flips up */}
				<div
					className="absolute inset-0 flex items-center justify-center p-2"
					style={{
						opacity: isPageHovered ? 1 : 0,
						transform: isPageHovered ? "scale(1)" : "scale(0.95)",
						transition: isPageHovered
							? `opacity 250ms ease-out ${delay + 150}ms, transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay + 100}ms`
							: `opacity 150ms ease-in, transform 200ms ease-in`,
					}}
				>
					<Card
						entry={entry}
						config={config}
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
