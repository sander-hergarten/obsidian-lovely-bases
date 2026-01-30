import type { BasesEntry, BasesPropertyId, BasesViewConfig } from "obsidian";
import { memo } from "react";

import { useObsidian } from "@/components/Obsidian/Context";
import PropertyValue from "@/components/Obsidian/PropertyValue";
import { useEntryProperty } from "@/hooks/use-property";
import { cn } from "@/lib/utils";

import type { CardConfig } from "./types";

const EMPTY_PLACEHOLDER = "—";

type PropertyItemProps = {
  adaptToSize?: boolean;
  entry: BasesEntry;
  propertyId: BasesPropertyId;
  showPropertyTitles: boolean;
  config: BasesViewConfig;
  isOverlayMode?: boolean;
};

const PropertyItem = memo(
  ({
    adaptToSize = false,
    entry,
    propertyId,
    showPropertyTitles,
    config,
    isOverlayMode,
  }: PropertyItemProps) => {
    const property = useEntryProperty(entry, config, propertyId);
    const { renderContext } = useObsidian().app;

    if (!property) return null;

    return (
      <div className="flex flex-col gap-0.5">
        {showPropertyTitles && (
          <span
            className={cn(
              "font-medium tracking-wide",
              !adaptToSize && "text-xs",
              adaptToSize &&
                "@[0px]/lovely-card:text-6xs @8xs/lovely-card:text-5xs @7xs/lovely-card:text-4xs @6xs/lovely-card:text-3xs @5xs/lovely-card:text-sm @4xs/lovely-card:text-xs",
              isOverlayMode ? "text-white/70" : "text-muted-foreground",
            )}
          >
            {property.displayName}
          </span>
        )}
        <div>
          {!property.isEmpty ? (
            <PropertyValue
              renderContext={renderContext}
              as="div"
              className={cn(
                "line-clamp-3",
                !adaptToSize && "text-sm",
                adaptToSize &&
                  "@[0px]/lovely-card:text-5xs @8xs/lovely-card:text-4xs @7xs/lovely-card:text-3xs @6xs/lovely-card:text-2xs @5xs/lovely-card:text-xs @4xs/lovely-card:text-sm",
                isOverlayMode ? "text-white/90" : "text-foreground",
              )}
              value={property.value}
            />
          ) : (
            <span
              className={cn(
                "tracking-wide",
                !adaptToSize && "text-xs",
                adaptToSize &&
                  "@[0px]/lovely-card:text-6xs @8xs/lovely-card:text-5xs @7xs/lovely-card:text-4xs @6xs/lovely-card:text-3xs @5xs/lovely-card:text-sm @4xs/lovely-card:text-xs",
                isOverlayMode ? "text-white/50" : "text-muted-foreground",
              )}
            >
              {EMPTY_PLACEHOLDER}
            </span>
          )}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.entry === nextProps.entry &&
    prevProps.propertyId === nextProps.propertyId &&
    prevProps.showPropertyTitles === nextProps.showPropertyTitles &&
    prevProps.config === nextProps.config &&
    prevProps.isOverlayMode === nextProps.isOverlayMode,
);

PropertyItem.displayName = "PropertyItem";

type Props = {
  adaptToSize?: boolean;
  entry: BasesEntry;
  cardConfig: CardConfig;
  config: BasesViewConfig;
  isOverlayMode?: boolean;
};

const PropertyList = memo(
  ({
    adaptToSize = false,
    entry,
    cardConfig,
    config,
    isOverlayMode,
  }: Props) => {
    const { properties, showPropertyTitles } = cardConfig;

    if (properties.length === 0) return null;

    return (
      <div
        className={cn(
          "flex flex-col overflow-y-auto",
          !adaptToSize && "gap-2",
          adaptToSize &&
            "@[0px]/lovely-card:gap-1 @7xs/lovely-card:gap-1.5 @5xs/lovely-card:gap-2",
        )}
      >
        {properties.map((property) => {
          return (
            <PropertyItem
              adaptToSize={adaptToSize}
              key={property}
              entry={entry}
              propertyId={property}
              showPropertyTitles={showPropertyTitles}
              config={config}
              isOverlayMode={isOverlayMode}
            />
          );
        })}
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.adaptToSize === nextProps.adaptToSize &&
      prevProps.entry === nextProps.entry &&
      prevProps.cardConfig === nextProps.cardConfig &&
      prevProps.config === nextProps.config &&
      prevProps.isOverlayMode === nextProps.isOverlayMode
    );
  },
);

PropertyList.displayName = "PropertyList";

export default PropertyList;
