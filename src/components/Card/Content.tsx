import type { BasesEntry, BasesViewConfig } from "obsidian";
import { type CSSProperties, memo } from "react";

import Markdown from "@/components/Obsidian/Markdown";
import { cn } from "@/lib/utils";

import PropertyList from "./PropertyList";
import Title from "./Title";
import type { CardColors, CardConfig } from "./types";

type Props = {
  adaptToSize?: boolean;
  entry: BasesEntry;
  cardConfig: CardConfig;
  colors: CardColors;
  config: BasesViewConfig;
  isOverlayMode?: boolean;
}

const getContentColors = (
  colors: CardColors,
  contentFont: string | undefined,
) => {
  return {
    backgroundColor: colors.contentBackground,
    '--font-interface': contentFont,
    '--foreground': colors.contentForeground,
    '--h3-color': colors.titleForeground,
    '--pill-color': colors.contentForeground,
    '--link-color': colors.linkForeground,
    '--link-external-color': colors.linkForeground,
    '--link-unresolved-color': colors.linkForeground,
    '--link-color-hover': colors.contentForeground,
    '--link-external-color-hover': colors.contentForeground,
  } as CSSProperties;
}

const Content = memo(({ adaptToSize = false, entry, cardConfig, colors, config, isOverlayMode }: Props) => {
  const { showTitle, showContent, contentFont, contentMaxLength, layout, properties } = cardConfig;
  const shouldDisplayContent = showTitle || showContent || properties.length > 0;

  if (!shouldDisplayContent) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex flex-col min-h-0 min-w-0 overflow-hidden",
        !isOverlayMode && "flex-1 h-full",
        !adaptToSize && "px-(--size-4-2)",
        adaptToSize && "@[0px]/lovely-card:px-1 @4xs/lovely-card:px-(--size-4-2)",
        adaptToSize && "@[0px]/lovely-card:gap-1 @7xs/lovely-card:gap-1.5 @5xs/lovely-card:gap-2",
        adaptToSize && "@[0px]/lovely-card:pt-1 @7xs/lovely-card:pt-1.5 @5xs/lovely-card:pt-2",
        adaptToSize && layout !== "polaroid" && "@[0px]/lovely-card:pb-0.5 @7xs/lovely-card:pb-1 @5xs/lovely-card:pb-1.5",
      )}
      style={getContentColors(colors, contentFont)}>
      <Title adaptToSize={adaptToSize} entry={entry} cardConfig={cardConfig} isOverlayMode={isOverlayMode} />

      {properties.length > 0 && <div className={cn(!isOverlayMode && "flex-1 min-h-0")} style={{
        fontFamily: contentFont,
      } as CSSProperties}>
        <PropertyList
          adaptToSize={adaptToSize}
          entry={entry}
          cardConfig={cardConfig}
          config={config}
          isOverlayMode={isOverlayMode}
        />
      </div>}

      {showContent && (
        <div className="overflow-hidden">
          <Markdown
            file={entry.file}
            maxLength={contentMaxLength}
            className={cn(
              "text-foreground line-clamp-6 overflow-hidden",
              !adaptToSize && "text-sm",
              adaptToSize && "@[0px]/lovely-card:text-5xs @8xs/lovely-card:text-4xs @7xs/lovely-card:text-3xs @6xs/lovely-card:text-2xs @5xs/lovely-card:text-xs @4xs/lovely-card:text-sm",
            )}
            showEllipsis
            style={{
              fontFamily: contentFont,
            } as CSSProperties}
          />
        </div>
      )}
    </div>
  )
});

Content.displayName = "Content";

export default Content;
