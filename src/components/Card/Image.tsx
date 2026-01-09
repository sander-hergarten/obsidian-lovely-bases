
import { cn } from "@/lib/utils";

import type { CardItem } from "./types";

type Props = {
	layout: "horizontal" | "vertical";
	imageAspectRatio: number;
	item: CardItem;
	imageFit: "cover" | "contain";
};

const Image = ({
	layout,
	imageAspectRatio,
	item,
	imageFit,
}: Props) => {
	return (
		<div
			className="relative shrink-0 bg-(--bases-cards-cover-background)"
			style={{
				...(layout === "horizontal"
					? {
							aspectRatio: 1 / imageAspectRatio,
							height: 0,
							minHeight: "100%",
						}
					: { width: "100%", aspectRatio: 1 / imageAspectRatio }),
			}}
		>
			{item.image ? (
				<img
					src={item.image}
					alt={item.title}
					draggable={false}
					loading="lazy"
					className={cn(
						"pointer-events-none h-full w-full",
						imageFit === "cover" ? "object-cover" : "object-contain",
					)}
				/>
			) : (
				<div className="h-full w-full" />
			)}
		</div>
	);
};

export default Image;
