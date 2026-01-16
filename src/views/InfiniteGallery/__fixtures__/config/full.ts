import type { InfiniteGalleryConfig } from "../../InfiniteGalleryView";

import { DEFAULT_BASE_CONFIG } from "./default";

export const FULL_BASE_CONFIG: InfiniteGalleryConfig = {
	...DEFAULT_BASE_CONFIG,
	cardSize: 250,
	aspectRatio: 1.5,
	imageFit: "cover",
	layout: "masonry",
	shape: "rounded",
} satisfies Partial<InfiniteGalleryConfig>;
