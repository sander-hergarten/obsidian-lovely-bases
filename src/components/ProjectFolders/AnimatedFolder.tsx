import type { BasesViewConfig } from "obsidian";
import { type CSSProperties, type MouseEventHandler, useState } from "react";

import type { CardConfig } from "@/components/Card/types";
import { gradientColors } from "@/lib/colors";
import { cn } from "@/lib/utils";

import Folder from "../Folder";

import type { File } from "./types";

type Props = {
	title: string;
	icon: string | null;
	files: File[];
	className?: string;
	gradient?: string;
	onClick?: MouseEventHandler<HTMLDivElement>;
	cardConfig: CardConfig;
	config: BasesViewConfig;
};

const AnimatedFolder: React.FC<Props> = ({
	title,
	icon,
	files,
	className,
	gradient,
	onClick,
	cardConfig,
	config,
}) => {
	const [isHovered, setIsHovered] = useState(false);
	const colors = gradient ? gradientColors(gradient) : [];

	return (
		<div
			className={cn(
				"relative flex flex-col items-center justify-center p-8 rounded cursor-pointer bg-card border border-border transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-2xl hover:shadow-(--folder-color)/20 hover:border-(--folder-color)/40 group",
				className,
			)}
			style={{
				minWidth: "280px",
				minHeight: "320px",
				perspective: "1200px",
				transform: isHovered
					? "scale(1.04) rotate(-1.5deg)"
					: "scale(1) rotate(0deg)",
        '--folder-color': colors.length > 0 ? colors?.[0] : "var(--primary)",
			} as CSSProperties}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={onClick}
		>
			<div
				className="absolute inset-0 rounded-2xl transition-opacity duration-700"
				style={{
					background: "radial-gradient(circle at 50% 70%, var(--folder-color) 0%, transparent 70%)",
					opacity: isHovered ? 0.12 : 0,
				}}
			/>
			<Folder
        icon={icon}
        files={files}
        gradient={gradient}
        onClick={onClick}
        cardConfig={cardConfig}
        config={config}
        />
			<div className="text-center">
				<h3
					className="text-base font-semibold text-foreground mt-4 transition-all duration-500 line-clamp-1"
					style={{
						transform: isHovered ? "translateY(2px)" : "translateY(0)",
						letterSpacing: isHovered ? "-0.01em" : "0",
					}}
				>
					{title}
				</h3>
				<p
					className="text-xs font-medium text-muted-foreground transition-all duration-500"
					style={{ opacity: isHovered ? 0.8 : 1 }}
				>
					{files.length} {files.length === 1 ? "note" : "notes"}
				</p>
			</div>
		</div>
	);
};

export default AnimatedFolder;
