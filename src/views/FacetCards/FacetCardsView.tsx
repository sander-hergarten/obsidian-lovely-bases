import type {
  BasesPropertyId,
  BasesViewConfig
} from "obsidian";
import { type ComponentType, useCallback } from "react";

import Card from "@/components/Card";
import { useItems } from "@/components/Card/hooks/use-item";
import type { CardItem } from "@/components/Card/types";
import VirtualGrid from "@/components/VirtualGrid";
import type { ReactBaseViewProps } from "@/types";

export const FACET_CARDS_TYPE_ID = "facet-cards";

type FacetCardsConfig = {
	layout: "horizontal" | "vertical";
	cardSize: number;
	imageProperty?: BasesPropertyId;
	imageFit: "cover" | "contain";
	imageAspectRatio: number;
	imageWidthPercent: number;
	showPropertyTitles: boolean;
	hoverProperty: {
		id: BasesPropertyId;
		displayName: string;
	} | null;
	hoverStyle: "overlay" | "tooltip" | "none";
	properties: {
		id: BasesPropertyId;
		displayName: string;
	}[];
};

const useFacetCardsConfig = (config: BasesViewConfig): FacetCardsConfig => {
	const layout = (config.get("layout") ?? "vertical") as
		| "horizontal"
		| "vertical";
	const cardSize = (config.get("cardSize") ?? 400) as number;
	const imageProperty = String(config.get("imageProperty")) as
		| BasesPropertyId
		| undefined;
	const imageFit = (config.get("imageFit") ?? "cover") as "cover" | "contain";
	const imageAspectRatio = (config.get("imageAspectRatio") ?? 1.5) as number;
	const imageWidthPercent = (config.get("imageWidthPercent") ?? 35) as number;
	const showPropertyTitles = (config.get("showPropertyTitles") ??
		true) as boolean;

	const hoverPropertyId = (config.get("hoverProperty") ??
		"") as BasesPropertyId;
	const hoverStyle = (config.get("hoverStyle") ?? "overlay") as
		| "overlay"
		| "tooltip"
		| "none";

	const properties = config.getOrder().map((prop) => ({
		id: prop,
		displayName: config.getDisplayName(prop) as string,
	}));
	const hoverProperty = hoverPropertyId
		? {
				id: hoverPropertyId,
				displayName: config.getDisplayName(hoverPropertyId) as string,
			}
		: null;

	return {
		layout,
		cardSize: cardSize - PADDING,
		imageProperty,
		imageFit,
		imageAspectRatio,
		imageWidthPercent,
		showPropertyTitles,
		hoverProperty,
		hoverStyle,
		properties,
	};
};

const PADDING = 12;

const TITLE_ESTIMATED_HEIGHT = 30;
const PROPERTY_TITLE_ESTIMATED_HEIGHT = 15;
const PROPERTY_VALUE_ESTIMATED_HEIGHT = 30;

const getEstimatedRowHeight = (
  facetCardsConfig: FacetCardsConfig
): number => {
  const { layout, imageAspectRatio, properties, showPropertyTitles, cardSize, imageWidthPercent } = facetCardsConfig;

  let contentHeight = TITLE_ESTIMATED_HEIGHT;

  if (properties.length > 0) {
    let propertyHeight = PROPERTY_VALUE_ESTIMATED_HEIGHT;
    if (showPropertyTitles) {
      propertyHeight += PROPERTY_TITLE_ESTIMATED_HEIGHT;
    }
    contentHeight += propertyHeight * properties.length;
  }

  let imageHeight = 0;

  if (layout === "vertical") {
    imageHeight = imageAspectRatio * cardSize;
  } else {
    const imageWidth = cardSize * imageWidthPercent / 100;
    imageHeight = imageWidth / imageAspectRatio;
  }

  const estimatedRowHeight = layout === "horizontal" ? Math.max(imageHeight, contentHeight) : imageHeight + contentHeight;
  return estimatedRowHeight + (PADDING * 2);
};

const FacetCardsView = ({
	app,
	config,
	containerEl,
	data,
}: ReactBaseViewProps) => {
	const facetCardsConfig = useFacetCardsConfig(config);
  const estimatedRowHeight = getEstimatedRowHeight(facetCardsConfig);

  const items = useItems({
    app,
    config,
    entries: data.data,
    propertiesToDisplay: facetCardsConfig.properties,
    hoverPropertyDisplay: facetCardsConfig.hoverProperty,
    imageProperty: facetCardsConfig.imageProperty,
  });

  const RenderItem = useCallback((item: CardItem) => (
		<Card
      className="mb-3"
			layout={facetCardsConfig.layout}
			item={item}
			cardSize={facetCardsConfig.cardSize}
			imageFit={facetCardsConfig.imageFit}
			imageAspectRatio={facetCardsConfig.imageAspectRatio}
			imageWidthPercent={facetCardsConfig.imageWidthPercent}
			showPropertyTitles={facetCardsConfig.showPropertyTitles}
			hoverStyle={facetCardsConfig.hoverStyle}
			app={app}
			containerEl={containerEl}
		/>
  ), [app, containerEl, facetCardsConfig]);

	return (
		<div className="lovely-bases" style={{ height: "100%", width: "100%", overflowY: 'auto' }}>
      <VirtualGrid
        minCardWidth={facetCardsConfig.cardSize}
        component={RenderItem as unknown as ComponentType<{ id: string }>}
        items={items}
        gap={PADDING}
        estimateRowHeight={estimatedRowHeight}
      />
		</div>
	);
};

export default FacetCardsView;
