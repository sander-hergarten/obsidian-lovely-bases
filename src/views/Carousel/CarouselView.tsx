import { ReactBaseViewProps } from "@/types";

import Carousel from "@/components/Carousel";

import Card from "@/components/Card";
import { useItems } from "@/components/Card/hooks/use-item";
import type { CardItem } from "@/components/Card/types";
import { ComponentType, useCallback } from "react";
import { useFacetCardsConfig } from "../FacetCards/hooks/use-facet-cards-config";

const CarouselView = ({
	app,
	config,
	containerEl,
	data,
}: ReactBaseViewProps) => {
  const title = config.get("title") as string;
  const subtitle = config.get("subtitle") as string;
  const carouselConfig = useFacetCardsConfig(config);
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
  ), [app, containerEl, carouselConfig]);

	return (
		<div
			className="lovely-bases"
			style={{ height: "100%", width: "100%", overflowY: "auto" }}
		>
			<Carousel
				title={title}
				subtitle={subtitle}
				items={items}
        component={RenderItem as unknown as ComponentType<{ id: string }>}
        cardSize={carouselConfig.cardSize}
			/>
		</div>
	);
};

export default CarouselView;
