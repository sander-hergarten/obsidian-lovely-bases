import type { BasesEntry, BasesViewConfig } from "obsidian";
import { type MouseEventHandler, useRef, useState } from "react";

import type { CardConfig } from "@/components/Card/types";
import LucideIcon from "@/components/Obsidian/LucideIcon";
import { cn } from "@/lib/utils";
import { useNotebookColors } from "./hooks/use-notebook-colors";
import NotebookCard, {
	getPagePattern,
	PAGE_BACKGROUND_SIZES,
} from "./NotebookCard";
import type { NotebookColors, PageStyle } from "./types";

const BASE_WIDTH = 128;
const ASPECT_RATIO = 7 / 10;

type Props = {
	width?: number;
	colors?: NotebookColors;
	icon: string | null;
  title?: string;
	files: BasesEntry[];
	gradient?: string;
	onClick?: MouseEventHandler<HTMLDivElement>;
	cardConfig: CardConfig;
	config: BasesViewConfig;
	pageStyle?: PageStyle;
};

const AnimatedNotebook: React.FC<Props> = ({
	width = BASE_WIDTH,
	colors,
	icon,
	files,
	gradient,
	onClick,
	cardConfig,
	config,
	pageStyle = "plain",
  title,
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
					transition: "transform 400ms ease-in-out",
				}}
			>
				{/* Notebook page (behind cover) */}
				<div
					className="absolute overflow-hidden"
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
					}}
				>
					{previewFiles.map((entry, index) => (
						<NotebookCard
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
							pageStyle={pageStyle}
							notebookWidth={width}
							notebookHeight={height}
							isPageHovered={hoveredPageIndex === index}
							colors={notebookColors}
						/>
					))}
				</div>

				{/* Tabs - attached to the right edge of the notebook pages */}
				{previewFiles.map((entry, index) => {
					const pageWidth = width * 0.92;
					const tabWidth = 14 * scaleFactor;
					const tabHeight = (height * 0.5) / 5;
					const tabSpacing = 3 * scaleFactor;
					const tabTop = height * 0.12 + index * (tabHeight + tabSpacing);
					// Position from left edge: page width (since pages start at left: 0)
					const tabLeft = pageWidth;
          const tabColor = notebookColors[`tab${index + 1}Color`];

					return (
						<div
							key={`tab-${entry.file.path}`}
							className={cn(
								"absolute cursor-pointer transition-all duration-300",
								hoveredPageIndex === index
									? "scale-105"
									: "hover:scale-102",
							)}
							style={{
								width: tabWidth,
								height: tabHeight,
								top: tabTop,
								left: tabLeft,
								background: tabColor,
								borderRadius: `0 ${5 * scaleFactor}px ${5 * scaleFactor}px 0`,
								boxShadow: hoveredPageIndex === index
									? "2px 1px 6px rgba(0,0,0,0.2)"
									: "1px 1px 3px rgba(0,0,0,0.12)",
								borderTop: "1px solid rgba(0,0,0,0.1)",
								borderRight: "1px solid rgba(0,0,0,0.1)",
								borderBottom: "1px solid rgba(0,0,0,0.1)",
								opacity: isHovered ? 1 : 0,
								transform: isHovered
									? "translateX(0)"
									: "translateX(-8px)",
								transition: `all 400ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 40 + 150}ms`,
								zIndex: hoveredPageIndex === index ? 65 : 60 - index,
							}}
							onMouseEnter={() => setHoveredPageIndex(index)}
							onMouseLeave={() => setHoveredPageIndex(null)}
							onClick={(e) => {
								e.stopPropagation();
							}}
						/>
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
						transition: "transform 500ms linear, box-shadow 500ms linear",
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
						className="relative text-left"
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
              <h3 className="font-normal" style={{
                marginTop: 18 * scaleFactor,
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

AnimatedNotebook.displayName = "AnimatedNotebook";

export default AnimatedNotebook;
