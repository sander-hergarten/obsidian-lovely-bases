import type { TFile } from "obsidian";
import { forwardRef, type MouseEventHandler } from "react";

import Markdown from "@/components/Obsidian/Markdown";
import { cn } from "@/lib/utils";

const BASE_CARD_WIDTH = 80;
const BASE_CARD_HEIGHT = 112;

type FileCardProps = {
	image: string;
	file: TFile;
	title: string;
	delay: number;
	isVisible: boolean;
	index: number;
	totalCount: number;
	onClick: MouseEventHandler<HTMLDivElement>;
	backgroundColor?: string;
	scaleFactor?: number;
};

const FileCard = forwardRef<HTMLDivElement, FileCardProps>(
	(
		{
			image,
			file,
			title,
			delay,
			isVisible,
			index,
			totalCount,
			onClick,
			backgroundColor,
			scaleFactor = 1,
		},
		ref,
	) => {
		const middleIndex = (totalCount - 1) / 2;
		const factor = totalCount > 1 ? (index - middleIndex) / middleIndex : 0;

		const rotation = factor * 25;
		const translationX = factor * 85 * scaleFactor;
		const translationY = Math.abs(factor) * 12 * scaleFactor;

		const cardWidth = BASE_CARD_WIDTH * scaleFactor;
		const cardHeight = BASE_CARD_HEIGHT * scaleFactor;

		const fontSize = 8 * scaleFactor;
		const titleFontSize = 12 * scaleFactor;
		const padding = 3 * scaleFactor;

		return (
			<div
				ref={ref}
				className={cn("absolute cursor-pointer group/card hover:z-90")}
				style={{
					width: cardWidth,
					height: cardHeight,
					transform: isVisible
						? `translateY(calc(${-100 * scaleFactor}px + ${translationY}px)) translateX(${translationX}px) rotate(${rotation}deg) scale(1)`
						: "translateY(0px) translateX(0px) rotate(0deg) scale(0.4)",
					opacity: isVisible ? 1 : 0,
					transition: `all 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
					zIndex: 10 + index,
					left: -cardWidth / 2,
					top: -cardHeight / 2,
				}}
				onClick={onClick}
			>
				<div
					className={cn(
						"w-full h-full rounded overflow-hidden shadow-xl border border-border relative drop-shadow-lg",
						"transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
						"group-hover/card:-translate-y-6 group-hover/card:shadow-2xl group-hover/card:shadow-accent/40 group-hover/card:ring-2 group-hover/card:ring-accent group-hover/card:scale-150",
						!backgroundColor && "bg-background",
					)}
					style={{
						backgroundColor,
					}}
				>
					{image ? (
						<img
							src={image}
							alt={title}
							className="w-full h-full object-cover"
							loading="lazy"
						/>
					) : (
						<div
							className={cn(
								"w-full h-full",
								backgroundColor ? "text-white" : "text-foreground",
							)}
							style={{
								fontSize,
								padding: `0 ${padding}px`,
							}}
						>
							<Markdown maxLength={100} file={file} />
						</div>
					)}
					<div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
					<p
						className={cn(
							"absolute bottom-0 m-0 truncate drop-shadow-md shadow-white backdrop-blur-md",
							backgroundColor ? "text-white" : "text-foreground",
						)}
						style={{
							fontSize: titleFontSize,
							padding: `0 ${padding}px`,
						}}
					>
						{title}
					</p>
				</div>
			</div>
		);
	},
);
FileCard.displayName = "FileCard";

export default FileCard;
