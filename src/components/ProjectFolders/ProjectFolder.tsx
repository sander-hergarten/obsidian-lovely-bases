import { motion } from "motion/react";
import type { BasesEntry, BasesViewConfig } from "obsidian";
import { type CSSProperties, type MouseEventHandler, useRef, useState } from "react";

import type { CardConfig } from "@/components/Card/types";
import { gradientColors } from "@/lib/colors";
import { cn } from "@/lib/utils";
import type { GroupShape, GroupTitlePosition } from "@/views/ProjectFolders/types";

import Folder from "../Folder";
import Notebook from "../Notebook";
import FolderExpandedView from "./FolderExpandedView";
import { useFolderExpand } from "./hooks/use-folder-expand";

const getComponent = (shape: GroupShape) => {
  if (shape === "folder") {
    return Folder;
  }
  return Notebook;
};

type Props = {
	title: string;
	icon: string | null;
	files: BasesEntry[];
	className?: string;
	gradient?: string;
	onClick?: MouseEventHandler<HTMLDivElement>;
	cardConfig: CardConfig;
	config: BasesViewConfig;
  groupShape: GroupShape;
	groupTitlePosition?: GroupTitlePosition;
};

const ProjectFolder: React.FC<Props> = ({
	title,
	icon,
	files,
	className,
	gradient,
	onClick,
	cardConfig,
	config,
  groupShape,
	groupTitlePosition = "outside",
}) => {
  const Component = getComponent(groupShape);
	const [isHovered, setIsHovered] = useState(false);
	const colors = gradient ? gradientColors(gradient) : [];
	const cardRef = useRef<HTMLDivElement>(null);

	const {
		handlePointerDown,
		handlePointerUp,
		handleClick: handleExpandClick,
		handleClose,
		isExpanded,
		isPressing,
	} = useFolderExpand();

	const showTitleOutside = groupTitlePosition === "outside";
	const showTitleInside = groupTitlePosition === "inside";

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		// If there are files, expand the view; otherwise use original onClick
		if (files.length > 0) {
			handleExpandClick(e, cardRef);
		} else if (onClick) {
			onClick(e);
		}
	};

	return (
		<>
			<motion.div
				ref={cardRef}
				className={cn(
					"relative flex flex-col items-center justify-center p-8 rounded cursor-pointer bg-card border border-border transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-2xl hover:shadow-(--folder-color)/20 hover:border-(--folder-color)/40 group",
					className,
				)}
				style={{
					minWidth: "280px",
					minHeight: "320px",
					perspective: "1200px",
					"--folder-color": colors.length > 0 ? colors?.[0] : "var(--primary)",
				} as CSSProperties}
				animate={{
					scale: isPressing ? 0.98 : isHovered ? 1.04 : 1,
					rotate: isHovered ? -1.5 : 0,
				}}
				transition={{
					scale: { duration: isPressing ? 0.08 : 0.7, ease: [0.16, 1, 0.3, 1] },
					rotate: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
				}}
				layoutId={`folder-card-${title}`}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				onPointerDown={handlePointerDown}
				onPointerUp={handlePointerUp}
				onClick={handleClick}
			>
			<div
				className="absolute inset-0 rounded-2xl transition-opacity duration-700"
				style={{
					background:
						"radial-gradient(circle at 50% 70%, var(--folder-color) 0%, transparent 70%)",
					opacity: isHovered ? 0.12 : 0,
				}}
			/>
			<div style={{ opacity: isExpanded ? 0 : 1 }}>
				<Component
					icon={icon}
					files={files}
					gradient={gradient}
					onClick={onClick}
					cardConfig={cardConfig}
					config={config}
					title={showTitleInside ? title : undefined}
					iconLayoutId={icon ? `folder-icon-${title}` : undefined}
					titleLayoutId={showTitleInside ? `folder-title-${title}` : undefined}
				/>
			</div>
			{showTitleOutside && (
				<div className="text-center relative z-10">
					<motion.h3
						className="text-base font-semibold text-foreground mt-4 transition-all duration-500 line-clamp-1"
						layoutId={`folder-title-${title}`}
						layout="position"
            style={{
							transform: isHovered ? "translateY(2px)" : "translateY(0)",
							letterSpacing: isHovered ? "-0.01em" : "0",
						}}
					>
						{title}
					</motion.h3>
					<motion.p
						className="text-xs font-medium text-muted-foreground transition-all duration-500"
						layoutId={`folder-count-${title}`}
						style={{ opacity: isHovered ? 0.8 : 1 }}
					>
						{files.length} {files.length === 1 ? "note" : "notes"}
					</motion.p>
				</div>
			)}
		</motion.div>
		<FolderExpandedView
			isOpen={isExpanded}
			title={title}
			icon={icon}
			files={files}
			filesCount={files.length}
			cardConfig={cardConfig}
			config={config}
			onClose={handleClose}
		/>
		</>
	);
};

export default ProjectFolder;
