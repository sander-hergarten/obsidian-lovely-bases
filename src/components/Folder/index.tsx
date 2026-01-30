import type { BasesViewConfig } from "obsidian";
import { type MouseEventHandler, useRef, useState } from "react";

import type { CardConfig } from "@/components/Card/types";
import LucideIcon from "@/components/Obsidian/LucideIcon";

import FolderCard from "./FolderCard";
import { useFolderColors } from "./hooks/use-folder-colors";
import type { File } from "./types";

const BASE_WIDTH = 128;
const ASPECT_RATIO = 4 / 3;

type Props = {
	width?: number;
	colors?: ReturnType<typeof useFolderColors>;
	colorizeFiles: boolean;
	icon: string | null;
	files: File[];
	gradient?: string;
	onClick?: MouseEventHandler<HTMLDivElement>;
	cardConfig: CardConfig;
	config: BasesViewConfig;
};

const AnimatedFolder: React.FC<Props> = ({
	width = BASE_WIDTH,
	colors,
	colorizeFiles,
	icon,
	files,
	gradient,
	onClick,
	cardConfig,
	config,
}) => {
	const [isHovered, setIsHovered] = useState(false);
	const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

	const scaleFactor = width / BASE_WIDTH;
	const height = width / ASPECT_RATIO;

	const { backBg, tabBg, frontBg, fileColor, iconColor } = useFolderColors(gradient, colors);

	const previewFiles = files.slice(0, 5);

	// Reset cardRefs array when files change to prevent memory leaks
	if (cardRefs.current.length !== previewFiles.length) {
		cardRefs.current = new Array(previewFiles.length).fill(null);
	}

	return (
		<div
			className="cursor-pointer relative flex items-center justify-center mb-4"
			style={{
				width,
				height,
			}}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={onClick}
		>
			<div
				className="absolute rounded-lg shadow-md border border-white/10"
				style={{
					width,
					height,
					background: backBg,
					filter: "brightness(0.9)",
					transformOrigin: "bottom center",
					transform: isHovered
						? "rotateX(-20deg) scaleY(1.05)"
						: "rotateX(0deg) scaleY(1)",
					transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
					zIndex: 10,
				}}
			/>
			<div
				className="absolute rounded-t-md border-t border-x border-white/10"
				style={{
					width: 48 * scaleFactor,
					height: 16 * scaleFactor,
					background: tabBg,
					filter: "brightness(0.85)",
					top: `calc(50% - ${48 * scaleFactor}px - ${12 * scaleFactor}px)`,
					left: `calc(50% - ${64 * scaleFactor}px + ${16 * scaleFactor}px)`,
					transformOrigin: "bottom center",
					transform: isHovered
						? `rotateX(-30deg) translateY(${-3 * scaleFactor}px)`
						: "rotateX(0deg) translateY(0)",
					transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
					zIndex: 10,
				}}
			/>
			<div
				className="absolute"
				style={{
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					zIndex: 20,
				}}
			>
				{previewFiles.map((file, index) => (
					<FolderCard
						backgroundColor={colorizeFiles ? fileColor : undefined}
						key={file.id}
						ref={(el) => {
							cardRefs.current[index] = el;
						}}
						entry={file.entry}
						config={config}
						cardConfig={cardConfig}
						delay={index * 50}
						isVisible={isHovered}
						index={index}
						totalCount={previewFiles.length}
						onClick={file.onClick}
						scaleFactor={scaleFactor}
					/>
				))}
			</div>
			<div
				className="absolute rounded-lg shadow-lg border border-white/20 flex items-center justify-center"
				style={{
					width,
					height,
					background: frontBg,
					top: `calc(50% - ${48 * scaleFactor}px + ${4 * scaleFactor}px)`,
					transformOrigin: "bottom center",
					transform: isHovered
						? `rotateX(35deg) translateY(${12 * scaleFactor}px)`
						: "rotateX(0deg) translateY(0)",
					transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
					zIndex: 30,
				}}
			>
				{icon && (
					<LucideIcon
						className="size-1/2"
						style={{
							color: iconColor,
						}}
						name={icon}
					/>
				)}
			</div>
			<div
				className="absolute rounded-lg overflow-hidden pointer-events-none"
				style={{
					width,
					height,
					top: `calc(50% - ${48 * scaleFactor}px + ${4 * scaleFactor}px)`,
					background:
						"linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)",
					transformOrigin: "bottom center",
					transform: isHovered
						? `rotateX(35deg) translateY(${12 * scaleFactor}px)`
						: "rotateX(0deg) translateY(0)",
					transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
					zIndex: 31,
				}}
			/>
		</div>
	);
};

export default AnimatedFolder;
