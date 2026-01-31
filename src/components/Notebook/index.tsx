import type { BasesEntry, BasesViewConfig } from "obsidian";
import { type MouseEventHandler, useRef, useState } from "react";

import type { CardConfig } from "@/components/Card/types";
import LucideIcon from "@/components/Obsidian/LucideIcon";
import { cn } from "@/lib/utils";

import { useNotebookColors } from "./hooks/use-notebook-colors";
import NotebookPage, {
	getPagePattern,
	PAGE_BACKGROUND_SIZES,
} from "./NotebookPage";
import type { NotebookColors, PageStyle } from "./types";

const BASE_WIDTH = 128;
const ASPECT_RATIO = 7 / 10;

type Props = {
	width?: number;
	colors?: NotebookColors;
	icon: string | null;
  title?: string;
  titleFont?: string;
	files: BasesEntry[];
	gradient?: string;
	onClick?: MouseEventHandler<HTMLDivElement>;
	cardConfig: CardConfig;
	config: BasesViewConfig;
  padContent?: boolean;
	pageStyle?: PageStyle;
};

const Notebook: React.FC<Props> = ({
	width = BASE_WIDTH,
	colors,
	icon,
	files,
	gradient,
	onClick,
	cardConfig,
	config,
  padContent = false,
	pageStyle = "plain",
  title,
  titleFont,
}) => {
	const [isHovered, setIsHovered] = useState(false);
	const [hoveredPageIndex, setHoveredPageIndex] = useState<number | null>(null);
	const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

	const scaleFactor = width / BASE_WIDTH;
	const height = width / ASPECT_RATIO;

	const notebookColors = useNotebookColors(gradient, colors);
	const {
		coverBg,
		elasticBand,
		elasticBandDark,
		labelBg,
		labelAccent,
		iconColor,
		fileColor,
	} = notebookColors;

	// Get page pattern based on style and colors
	const pagePattern = getPagePattern(pageStyle, notebookColors);
	const pageBackgroundSize = PAGE_BACKGROUND_SIZES[pageStyle];

	const previewFiles = files.slice(0, 5);

	// Reset cardRefs array when files change to prevent memory leaks
	if (cardRefs.current.length !== previewFiles.length) {
		cardRefs.current = new Array(previewFiles.length).fill(null);
	}

	// Generate elastic band gradient
	const elasticBandGradient = `linear-gradient(
		to right,
		${elasticBandDark} 0%,
		${elasticBand} 12%,
		${elasticBandDark} 25%,
		${elasticBand} 37%,
		${elasticBandDark} 50%,
		${elasticBand} 62%,
		${elasticBandDark} 75%,
		${elasticBand} 87%,
		${elasticBandDark} 100%
	)`;

	return (
		<div
			className="cursor-pointer relative flex items-center justify-center mb-4"
			style={{
				width,
				height,
				perspective: 800,
			}}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={onClick}
		>
			{/* Notebook container with tilt animation */}
			<div
				className="relative"
				style={{
					width,
					height,
					transformOrigin: "left center",
					transform: isHovered ? "rotateZ(-10deg)" : "rotateZ(0deg)",
					// Gentle tilt with slight overshoot for natural feel
					transition: isHovered
						? "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)"
						: "transform 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
				}}
			>
				{/* Notebook page (behind cover) */}
				<div
					className="absolute overflow-hidden shadow-2xl"
					style={{
						width: width * 0.92,
						height,
						borderRadius: `${5 * scaleFactor}px ${16 * scaleFactor}px ${16 * scaleFactor}px ${5 * scaleFactor}px`,
						background: pagePattern,
						backgroundSize: pageBackgroundSize,
						zIndex: 0,
					}}
				/>

				{/* Pages container (visible when cover opens) */}
				<div
					className="absolute overflow-visible"
					style={{
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						zIndex: 5,
						clipPath: "inset(-100% -100% -100% 0)",
						pointerEvents: "none",
					}}
				>
					{previewFiles.map((entry, index) => (
						<NotebookPage
							backgroundColor={fileColor}
							key={entry.file.path}
							ref={(el) => {
								cardRefs.current[index] = el;
							}}
							entry={entry}
							config={config}
							cardConfig={cardConfig}
							delay={index * 50}
							isVisible={isHovered}
							index={index}
							scaleFactor={scaleFactor}
							padContent={padContent}
							pageStyle={pageStyle}
							notebookWidth={width}
							notebookHeight={height}
							isPageHovered={hoveredPageIndex === index}
							colors={notebookColors}
							onMouseEnter={() => setHoveredPageIndex(index)}
							onMouseLeave={() => setHoveredPageIndex(null)}
						/>
					))}
				</div>

				{/* Tabs - attached to the right edge of the notebook pages (bottom section) */}
				{previewFiles.map((entry, index) => {
					const pageWidth = width * 0.92;
					const tabWidth = 14 * scaleFactor;
					const tabHeight = (height * 0.5) / 5;
					const tabSpacing = 3 * scaleFactor;
					// Position tabs from the bottom edge upwards
					const totalTabsHeight = previewFiles.length * tabHeight + (previewFiles.length - 1) * tabSpacing;
					const tabTop = height - totalTabsHeight - (10 * scaleFactor) + index * (tabHeight + tabSpacing);
					const tabLeft = pageWidth;
					const tabColor = notebookColors[`tab${index + 1}Color`];

					// Extended hit area padding (larger interaction zone)
					const hitAreaPadding = 8 * scaleFactor;

					// Disable pointer events on other tabs when a card is hovered
					const isOtherTabWhileCardActive = hoveredPageIndex !== null && hoveredPageIndex !== index;

					// Staggered delay that syncs with cover opening
					// Tabs appear as the cover reveals them (from bottom to top)
					const tabDelay = isHovered
						? 200 + (previewFiles.length - 1 - index) * 60 // Appear from bottom
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
							onMouseEnter={() => setHoveredPageIndex(index)}
							onMouseLeave={() => setHoveredPageIndex(null)}
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
				})}

				{/* Notebook cover (opens on hover) */}
				<div
					className="absolute"
					style={{
						width,
						height,
						borderRadius: `${5 * scaleFactor}px ${15 * scaleFactor}px ${15 * scaleFactor}px ${5 * scaleFactor}px`,
						background: coverBg,
						transformStyle: "preserve-3d",
						transformOrigin: "left center",
						transform: isHovered ? "rotateY(-60deg)" : "rotateY(0deg)",
						// Natural book-opening easing: starts slow (overcoming inertia),
						// accelerates in middle, then decelerates as cover settles
						transition: isHovered
							? "transform 600ms cubic-bezier(0.22, 0.61, 0.36, 1), box-shadow 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)"
							: "transform 450ms cubic-bezier(0.55, 0.06, 0.68, 0.19), box-shadow 400ms ease-in",
						boxShadow: isHovered
							? "20px 10px 50px rgba(0,0,0,0.2)"
							: "none",
						zIndex: 10,
					}}
				>
					{/* Elastic band */}
					<div
						className="absolute"
						style={{
							width: 10 * scaleFactor,
							height: `calc(100% + ${2 * scaleFactor}px)`,
							top: -1 * scaleFactor,
							right: 25 * scaleFactor,
							borderRadius: 2 * scaleFactor,
							background: elasticBandGradient,
							zIndex: 100,
						}}
					/>

					{/* Label skin */}
					<div
						className="relative text-left box-content"
						style={{
							height: 50 * scaleFactor,
							marginTop: 80 * scaleFactor,
							padding: 15 * scaleFactor,
							fontSize: 12 * scaleFactor,
							background: labelBg,
							color: "#222",
							boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
							zIndex: 10,
						}}
					>
						{/* Icon in label */}
						{icon && (
							<LucideIcon
								className="absolute"
								style={{
									width: 20 * scaleFactor,
									height: 20 * scaleFactor,
									top: 10 * scaleFactor,
									left: 15 * scaleFactor,
									color: iconColor,
								}}
								name={icon}
							/>
						)}
            {title && (
              <h3 className="font-normal line-clamp-2" style={{
                marginTop: 18 * scaleFactor,
                fontFamily: titleFont,
                fontSize: 12 * scaleFactor,
                color: iconColor,
              }}>
                {title}
              </h3>
            )}

						{/* Accent strip at bottom of label */}
						<div
							className="absolute left-0 bottom-0 w-full"
							style={{
								height: 15 * scaleFactor,
								background: labelAccent,
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

Notebook.displayName = "Notebook";

export default Notebook;
