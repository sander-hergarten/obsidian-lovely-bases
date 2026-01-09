import type { BasesPropertyId, BasesViewConfig } from "obsidian";

const PADDING = 12;

export type FacetCardsConfig = {
	layout: "horizontal" | "vertical";
	cardSize: number;
	imageProperty?: BasesPropertyId;
	imageFit: "cover" | "contain";
	imageAspectRatio: number;
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
	showTitle: boolean;
  reverseContent: boolean;
};

export const useFacetCardsConfig = (config: BasesViewConfig, padding = PADDING): FacetCardsConfig => {
	const layout = (config.get("layout") ?? "vertical") as
		| "horizontal"
		| "vertical";
	const cardSize = (config.get("cardSize") ?? 400) as number;
	const imageProperty = String(config.get("imageProperty")) as
		| BasesPropertyId
		| undefined;
	const imageFit = (config.get("imageFit") ?? "cover") as "cover" | "contain";
	const imageAspectRatio = (config.get("imageAspectRatio") ?? 1.5) as number;
	const showPropertyTitles = (config.get("showPropertyTitles") ??
		true) as boolean;
	const showTitle = (config.get("showTitle") ?? true) as boolean;
  const reverseContent = (config.get("reverseContent") ?? false) as boolean;

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
		cardSize: cardSize - padding,
		imageProperty,
		imageFit,
		imageAspectRatio,
		showPropertyTitles,
		showTitle,
		hoverProperty,
		hoverStyle,
		properties,
    reverseContent,
	};
};
