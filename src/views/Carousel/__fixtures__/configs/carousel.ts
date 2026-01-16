import type { CarouselConfig } from "../../CarouselView";

export const DEFAULT_BASE_CONFIG: CarouselConfig = {
	layout: "vertical",
	shape: "square",
	cardSize: 400,
	imageProperty: "note.cover",
	imageAspectRatio: 1.5,
	imageFit: "cover",
	reverseContent: false,
	showTitle: true,
	showPropertyTitles: true,
	properties: [],
	hoverProperty: undefined,
	hoverStyle: "overlay",
} satisfies Partial<CarouselConfig>;

export const FULL_BASE_CONFIG: CarouselConfig = {
	...DEFAULT_BASE_CONFIG,
	title: "Featured Collection",
	subtitle: "A curated selection of highlights",
	layout: "vertical",
	shape: "square",
	cardSize: 400,
	imageProperty: "note.banner",
	imageAspectRatio: 1.5,
	imageFit: "cover",
	reverseContent: false,
	showTitle: true,
	showPropertyTitles: true,
	properties: ["note.author", "note.published"],
	hoverProperty: "note.excerpt",
	hoverStyle: "overlay",
} satisfies Partial<CarouselConfig>;

export const HORIZONTAL_LAYOUT_CONFIG: CarouselConfig = {
	...DEFAULT_BASE_CONFIG,
	imageProperty: "note.banner",
	properties: ["note.author", "note.published"],
	layout: "horizontal",
} satisfies Partial<CarouselConfig>;

export const VERTICAL_LAYOUT_CONFIG: CarouselConfig = {
	...DEFAULT_BASE_CONFIG,
  cardSize: 200,
	properties: ["note.author", "note.published"],
	layout: "vertical",
} satisfies Partial<CarouselConfig>;

export const CIRCLE_SHAPE_CONFIG: CarouselConfig = {
	...DEFAULT_BASE_CONFIG,
	shape: "circle",
  properties: [],
  showTitle: false,
	imageAspectRatio: 1,
} satisfies Partial<CarouselConfig>;

export const ROUNDED_SHAPE_CONFIG: CarouselConfig = {
	...DEFAULT_BASE_CONFIG,
	shape: "rounded",
  properties: [],
  showTitle: false,
	imageAspectRatio: 1,
} satisfies Partial<CarouselConfig>;

export const WITH_TITLE_SUBTITLE_CONFIG: CarouselConfig = {
	...HORIZONTAL_LAYOUT_CONFIG,
  imageProperty: 'note.banner',
	title: "Featured Collection",
	subtitle: "A curated selection of highlights",
} satisfies Partial<CarouselConfig>;

export const IMAGE_ONLY_CONFIG: CarouselConfig = {
	...DEFAULT_BASE_CONFIG,
	showTitle: false,
	properties: [],
} satisfies Partial<CarouselConfig>;

export const HOVER_OVERLAY_CONFIG: CarouselConfig = {
  ...HORIZONTAL_LAYOUT_CONFIG,
  imageProperty: 'note.banner',
	title: "Hover Overlay",
	subtitle: "Hover over the cards to see the hover effect",
	hoverProperty: "note.url",
	hoverStyle: "overlay",
} satisfies Partial<CarouselConfig>;
