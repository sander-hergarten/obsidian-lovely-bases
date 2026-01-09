import { ReactBaseViewProps } from "@/types";

import Carousel from "@/components/Carousel";

import Card from "@/components/Card";
import { useItems } from "@/components/Card/hooks/use-item";
import type { CardItem } from "@/components/Card/types";
import { ComponentType, useCallback } from "react";
import { type FacetCardsConfig, useFacetCardsConfig } from "../FacetCards/hooks/use-facet-cards-config";

const CONTENT_PADDING = 32;
const TITLE_ESTIMATED_HEIGHT = 36;
const PROPERTY_TITLE_ESTIMATED_HEIGHT = 20;
const PROPERTY_VALUE_ESTIMATED_HEIGHT = 32;

const getCardHeight = (
  config: FacetCardsConfig
): number => {
  const { layout, imageAspectRatio, properties, showPropertyTitles, showTitle, cardSize } = config;

  let contentHeight = CONTENT_PADDING;

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

  // En horizontal, la altura se basa en el contenido (la imagen se adapta)
  return layout === "horizontal"
    ? contentHeight
    : verticalImageHeight + contentHeight;
};

const CarouselView = ({
	app,
	config,
	containerEl,
	data,
}: ReactBaseViewProps) => {
  const title = config.get("title") as string;
  const subtitle = config.get("subtitle") as string;
  const carouselConfig = useFacetCardsConfig(config);
  const cardHeight = getCardHeight(carouselConfig);
  const items = useItems({
    app,
    config,
    entries: data.data,
    propertiesToDisplay: carouselConfig.properties,
    hoverPropertyDisplay: carouselConfig.hoverProperty,
    imageProperty: carouselConfig.imageProperty,
  });

  const RenderItem = useCallback((item: CardItem) => (
		<Card
			className="mb-3"
			layout={carouselConfig.layout}
			item={item}
			cardSize={carouselConfig.cardSize}
			imageFit={carouselConfig.imageFit}
			imageAspectRatio={carouselConfig.imageAspectRatio}
			showPropertyTitles={carouselConfig.showPropertyTitles}
      showTitle={carouselConfig.showTitle}
			hoverStyle={carouselConfig.hoverStyle}
			app={app}
			containerEl={containerEl}
      reverseContent={carouselConfig.reverseContent}
		/>
  ), [
    app,
    containerEl,
    carouselConfig.layout,
    carouselConfig.cardSize,
    carouselConfig.imageFit,
    carouselConfig.imageAspectRatio,
    carouselConfig.showPropertyTitles,
    carouselConfig.showTitle,
    carouselConfig.hoverStyle,
    carouselConfig.reverseContent,
  ]);

	return (
		<div
			className="lovely-bases"
			style={{ height: "100%", width: "100%", overflowY: "auto" }}
		>
			<Carousel
				key={`${carouselConfig.layout}-${carouselConfig.cardSize}-${carouselConfig.imageAspectRatio}-${carouselConfig.showTitle}-${carouselConfig.showPropertyTitles}`}
				title={title}
				subtitle={subtitle}
				items={items}
        component={RenderItem as unknown as ComponentType<{ id: string }>}
        cardSize={carouselConfig.cardSize}
        cardHeight={cardHeight}
			/>
		</div>
	);
};

export default CarouselView;
