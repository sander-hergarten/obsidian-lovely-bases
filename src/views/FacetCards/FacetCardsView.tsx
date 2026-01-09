
import { type ComponentType, useCallback } from "react";

import Card from "@/components/Card";
import { useItems } from "@/components/Card/hooks/use-item";
import type { CardItem } from "@/components/Card/types";
import VirtualGrid from "@/components/VirtualGrid";
import type { ReactBaseViewProps } from "@/types";
import { type FacetCardsConfig, useFacetCardsConfig } from "./hooks/use-facet-cards-config";

export const FACET_CARDS_TYPE_ID = "facet-cards";

const PADDING = 12;

const TITLE_ESTIMATED_HEIGHT = 30;
const PROPERTY_TITLE_ESTIMATED_HEIGHT = 15;
const PROPERTY_VALUE_ESTIMATED_HEIGHT = 30;

const getEstimatedRowHeight = (
  facetCardsConfig: FacetCardsConfig
): number => {
  const { layout, imageAspectRatio, properties, showPropertyTitles, showTitle, cardSize } = facetCardsConfig;

  let contentHeight = PADDING;

  if (showTitle) {
    contentHeight += TITLE_ESTIMATED_HEIGHT;
  }

  if (properties.length > 0) {
    let propertyHeight = PROPERTY_VALUE_ESTIMATED_HEIGHT;
    if (showPropertyTitles) {
      propertyHeight += PROPERTY_TITLE_ESTIMATED_HEIGHT;
    }
    contentHeight += propertyHeight * properties.length;
  }

  // En vertical, la imagen ocupa todo el ancho y su altura es proporcional
  const verticalImageHeight = imageAspectRatio * cardSize;

  // En horizontal, la altura se basa en el contenido (la imagen se adapta al alto)
  const estimatedRowHeight = layout === "horizontal"
    ? contentHeight
    : verticalImageHeight + contentHeight;

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
			showPropertyTitles={facetCardsConfig.showPropertyTitles}
      showTitle={facetCardsConfig.showTitle}
			hoverStyle={facetCardsConfig.hoverStyle}
			app={app}
			containerEl={containerEl}
      reverseContent={facetCardsConfig.reverseContent}
		/>
  ), [
    app,
    containerEl,
    facetCardsConfig.layout,
    facetCardsConfig.cardSize,
    facetCardsConfig.imageFit,
    facetCardsConfig.imageAspectRatio,
    facetCardsConfig.showPropertyTitles,
    facetCardsConfig.showTitle,
    facetCardsConfig.hoverStyle,
    facetCardsConfig.reverseContent,
  ]);

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
