


import type { FacetCardsConfig } from "@/views/FacetCards/FacetCardsView";

export const DEFAULT_CONFIG: FacetCardsConfig = {
	layout: "vertical",
	shape: "square",
	cardSize: 400,
	imageProperty: "note.cover",
	imageAspectRatio: 1.5,
	imageFit: "cover",
	showTitle: true,
	showPropertyTitles: true,
	showContent: false,
	contentMaxLength: 200,
	properties: [
    'note.author',
  ],
	reverseContent: false,
	hoverProperty: undefined,
	hoverStyle: "none",
	overlayContentVisibility: "always",
} satisfies Partial<FacetCardsConfig>;

export const FULL_CONFIG: FacetCardsConfig = {
	...DEFAULT_CONFIG,
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

export const HORIZONTAL_LAYOUT_CONFIG: FacetCardsConfig = {
  ...DEFAULT_CONFIG,
  layout: 'horizontal',
  shape: 'square',
  hoverProperty: 'note.url',
  hoverStyle: 'overlay',
  properties: [
    'note.author',
    'note.published',
    'note.excerpt',
  ],
  imageProperty: 'note.banner',
  imageAspectRatio: 0.85,
  cardSize: 400,
  imageFit: 'cover',
  reverseContent: false,
  showPropertyTitles: false,
  showTitle: true,
}

export const OVERLAY_LAYOUT_CONFIG: FacetCardsConfig = {
  layout: 'overlay',
  shape: 'square',
  hoverProperty: undefined,
  hoverStyle: 'none',
  properties: [],
  imageProperty: 'note.cover',
  imageAspectRatio: 1.5,
  cardSize: 340,
  imageFit: 'cover',
  reverseContent: false,
  showPropertyTitles: false,
  showTitle: true,
  showContent: true,
  contentMaxLength: 200,
  overlayContentVisibility: 'always',
}

export const CIRCLE_SHAPE_CONFIG: FacetCardsConfig = {
  layout: 'vertical',
  shape: 'circle',
  hoverProperty: undefined,
  hoverStyle: 'none',
  properties: [],
  imageProperty: 'note.cover',
  imageAspectRatio: 1,
  cardSize: 340,
  imageFit: 'cover',
  reverseContent: false,
  showPropertyTitles: false,
  showTitle: false,
  showContent: false,
  contentMaxLength: 200,
  overlayContentVisibility: 'always',
}


export const ROUNDED_SHAPE_CONFIG: FacetCardsConfig = {
  layout: 'overlay',
  shape: 'rounded',
  hoverProperty: undefined,
  hoverStyle: 'none',
  properties: [],
  imageProperty: 'note.cover',
  imageAspectRatio: 1,
  cardSize: 340,
  imageFit: 'cover',
  reverseContent: false,
  showPropertyTitles: false,
  showTitle: true,
  showContent: false,
  contentMaxLength: 200,
  overlayContentVisibility: 'hover',
}
