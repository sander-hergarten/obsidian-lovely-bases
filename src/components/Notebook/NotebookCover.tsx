import { motion } from "motion/react";
import type { BasesEntry } from "obsidian";

import LucideIcon from "@/components/Obsidian/LucideIcon";

import type { NotebookColors } from "./types";
import { memo } from "react";

type Props = {
  width: number;
  height: number;
  scaleFactor: number;
  notebookColors: NotebookColors;
  isHovered: boolean;
  showCounter: boolean;
  counterLayoutId: string;
  icon: string | null;
  iconLayoutId: string;
  title: string | null;
  titleLayoutId: string;
  titleFont: string;
  files: BasesEntry[];
};

const NotebookCover = memo(({
  width,
  height,
  scaleFactor,
  notebookColors,
  isHovered,
  showCounter,
  counterLayoutId,
  icon,
  iconLayoutId,
  title,
  titleLayoutId,
  titleFont,
  files,
}: Props) => {
  const elasticBandGradient = `linear-gradient(
		to right,
		${notebookColors.elasticBandDark} 0%,
		${notebookColors.elasticBand} 12%,
		${notebookColors.elasticBandDark} 25%,
		${notebookColors.elasticBand} 37%,
		${notebookColors.elasticBandDark} 50%,
		${notebookColors.elasticBand} 62%,
		${notebookColors.elasticBandDark} 75%,
		${notebookColors.elasticBand} 87%,
		${notebookColors.elasticBandDark} 100%
	)`;

  return (
    <div
      className="absolute"
      style={{
        width,
        height,
        borderRadius: `${5 * scaleFactor}px ${15 * scaleFactor}px ${15 * scaleFactor}px ${5 * scaleFactor}px`,
        background: notebookColors.coverBg,
        transformStyle: "preserve-3d",
        transformOrigin: "left center",
        transform: isHovered ? "rotateY(-60deg)" : "rotateY(0deg)",
        // Natural book-opening easing: starts slow (overcoming inertia),
        // accelerates in middle, then decelerates as cover settles
        transition: isHovered
          ? "transform 600ms cubic-bezier(0.22, 0.61, 0.36, 1), box-shadow 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)"
          : "transform 450ms cubic-bezier(0.55, 0.06, 0.68, 0.19), box-shadow 400ms ease-in",
        boxShadow: isHovered ? "20px 10px 50px rgba(0,0,0,0.2)" : "none",
        zIndex: 10,
      }}
    >
      {/* Elastic band */}
      <div
        className="absolute flex items-start justify-center"
        style={{
          width: 10 * scaleFactor,
          height: `calc(100% + ${2 * scaleFactor}px)`,
          top: -1 * scaleFactor,
          right: 25 * scaleFactor,
          borderRadius: 2 * scaleFactor,
          background: elasticBandGradient,
          zIndex: 100,
        }}
      >
        {showCounter && (
          <motion.span
            layoutId={counterLayoutId}
            className="font-semibold tracking-tight tabular-nums -rotate-1 text-right rounded-xs"
            style={{
              backgroundColor: notebookColors.labelBg,
              color: notebookColors.foreground,
              opacity: 0.9,
              paddingInline: 3 * scaleFactor,
              paddingBlock: 1 * scaleFactor,
              marginTop: -2 * scaleFactor,
              fontFamily: titleFont ?? "var(--font-mono)",
              fontSize: 12 * scaleFactor,
            }}
          >
            {files.length}
          </motion.span>
        )}
      </div>

      {/* Label skin */}
      <div
        className="relative text-left box-content"
        style={{
          height: 50 * scaleFactor,
          marginTop: 80 * scaleFactor,
          padding: 15 * scaleFactor,
          fontSize: 12 * scaleFactor,
          background: notebookColors.labelBg,
          color: "#222",
          boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
          zIndex: 10,
        }}
      >
        {/* Icon in label */}
        {icon && (
          <motion.div
            layoutId={iconLayoutId}
            className="absolute"
            style={{
              width: 20 * scaleFactor,
              height: 20 * scaleFactor,
              top: 10 * scaleFactor,
              left: 15 * scaleFactor,
            }}
          >
            <LucideIcon
              style={{
                width: "100%",
                height: "100%",
                color: notebookColors.foreground,
              }}
              name={icon}
            />
          </motion.div>
        )}
        {title && (
          <motion.h3
            layoutId={titleLayoutId}
            layout="position"
            className="font-normal line-clamp-2"
            style={{
              marginTop: 18 * scaleFactor,
              fontFamily: titleFont,
              fontSize: 12 * scaleFactor,
              color: notebookColors.foreground,
            }}
          >
            {title}
          </motion.h3>
        )}

        {/* Accent strip at bottom of label */}
        <div
          className="absolute left-0 bottom-0 w-full"
          style={{
            height: 15 * scaleFactor,
            background: notebookColors.labelAccent,
          }}
        />
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.width === nextProps.width &&
    prevProps.height === nextProps.height &&
    prevProps.scaleFactor === nextProps.scaleFactor &&
    prevProps.notebookColors === nextProps.notebookColors &&
    prevProps.isHovered === nextProps.isHovered &&
    prevProps.showCounter === nextProps.showCounter &&
    prevProps.counterLayoutId === nextProps.counterLayoutId &&
    prevProps.icon === nextProps.icon &&
    prevProps.iconLayoutId === nextProps.iconLayoutId &&
    prevProps.title === nextProps.title &&
    prevProps.titleLayoutId === nextProps.titleLayoutId &&
    prevProps.titleFont === nextProps.titleFont &&
    prevProps.files === nextProps.files;
});


NotebookCover.displayName = "NotebookCover";

export default NotebookCover;
