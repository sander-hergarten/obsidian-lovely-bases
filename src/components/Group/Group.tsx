import { motion } from "motion/react";
import type { BasesEntry, BasesViewConfig } from "obsidian";
import { type CSSProperties, type MouseEventHandler, useRef, useState } from "react";

import type { CardConfig } from "@/components/Card/types";
import { useEntryOpen } from "@/hooks/use-entry-open";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { GroupShape } from "@/views/ProjectFolders/types";

import Folder from "../Folder";
import Notebook from "../Notebook";
import GroupExpandedView from "./GroupExpandedView";
import { useGroupExpand } from "./hooks/use-group-expand";
import type { GroupConfig } from "./types";

const getComponent = (shape: GroupShape) => {
  if (shape === "folder") {
    return Folder;
  }
  return Notebook;
};

type Props = {
  entry: BasesEntry | undefined;
	title: string;
	icon: string | null;
	files: BasesEntry[];
	className?: string;
  color?: string;
	onClick?: MouseEventHandler<HTMLDivElement>;
	cardConfig: CardConfig;
  groupConfig: GroupConfig;
	config: BasesViewConfig;
};

const Group: React.FC<Props> = ({
  entry,
	title,
	icon,
	files,
	className,
	color,
	onClick,
	cardConfig,
  groupConfig,
	config,
}) => {
  const { t } = useTranslation("projectFolders");
  const Component = getComponent(groupConfig.groupShape);
	const [isHovered, setIsHovered] = useState(false);
	const cardRef = useRef<HTMLDivElement>(null);

  const handleEntryOpen = useEntryOpen(entry, config, cardConfig.linkProperty);
	const {
		handlePointerDown,
		handlePointerUp,
		handleClick: handleExpandClick,
		handleClose,
		isExpanded,
		isPressing,
	} = useGroupExpand();

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (groupConfig.groupClickOnGroup === 'expand') {
      handleExpandClick(e, cardRef);
    } else if (groupConfig.groupClickOnGroup === 'navigate') {
      handleEntryOpen(e);
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
					"--folder-color": color,
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
          color={color}
					onClick={handleClick}
					cardConfig={cardConfig}
					config={config}
					title={groupConfig.groupTitlePosition === 'inside' ? title : undefined}
          counterLayoutId={groupConfig.groupCounterPosition === 'inside' ? `folder-counter-${title}` : undefined}
					iconLayoutId={`folder-icon-${title}`}
					titleLayoutId={`folder-title-${title}`}
          showCounter={groupConfig.groupCounterPosition === 'inside'}
				/>
			</div>
			{(groupConfig.groupTitlePosition === 'outside' || groupConfig.groupCounterPosition === 'outside') && (
				<div className="text-center relative z-10">
			    {groupConfig.groupTitlePosition === 'outside' && (
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
          )}
          {groupConfig.groupCounterPosition === 'outside' && (
            <motion.p
              className="text-xs font-medium text-muted-foreground transition-all duration-500"
              layoutId={`folder-count-${title}`}
              style={{ opacity: isHovered ? 0.8 : 1 }}
            >
              {files.length === 1
                ? t("singleItem", { count: files.length.toString() })
                : t("totalItems", { count: files.length.toString() })}
            </motion.p>
          )}
				</div>
			)}
		</motion.div>
		<GroupExpandedView
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

export default Group;
