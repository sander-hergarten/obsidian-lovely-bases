import type { InfiniteGalleryConfig } from "../../InfiniteGalleryView";

export const DEFAULT_BASE_CONFIG: InfiniteGalleryConfig = {
	aspectRatio: 1.5,
	cardSize: 200,
	imageFit: "cover",
	imageProperty: "note.cover",
	layout: "masonry",
	shape: "square",
} satisfies Partial<InfiniteGalleryConfig>;
