import type { FacetCardsConfig } from "@/views/FacetCards/FacetCardsView";

export const DEFAULT_BASE_CONFIG: FacetCardsConfig = {
	layout: "vertical",
	shape: "square",
	cardSize: 400,
	imageProperty: "note.cover",
	imageAspectRatio: 1.5,
	imageFit: "cover",
	showTitle: true,
	showPropertyTitles: true,
	properties: [],
	reverseContent: false,
	hoverProperty: undefined,
	hoverStyle: "none",
} satisfies Partial<FacetCardsConfig>;

export const FULL_BASE_CONFIG: FacetCardsConfig = {
	...DEFAULT_BASE_CONFIG,
	layout: "horizontal",
	shape: "square",
	cardSize: 400,
	imageProperty: "note.banner",
	imageAspectRatio: 0.85,
	imageFit: "cover",
	showTitle: true,
	showPropertyTitles: false,
	properties: ["note.author", "note.published", "note.excerpt"],
	reverseContent: true,
	hoverProperty: "note.url",
	hoverStyle: "overlay",
} satisfies Partial<FacetCardsConfig>;
