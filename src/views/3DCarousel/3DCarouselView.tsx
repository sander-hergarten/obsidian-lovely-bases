import { ThreeDCarousel } from "@/components/3DCarousel";
import type { ReactBaseViewProps } from "@/types";

const MIN_ITEMS = 3;
const MAX_ITEMS = 14;

const ThreeDCarouselView = ({ app, data }: ReactBaseViewProps) => {
	return (
		<div
			className="lovely-bases"
			style={{ height: "100%", width: "100%", overflowY: "auto" }}
		>
			{data.data.length >= MIN_ITEMS ? (
				<ThreeDCarousel app={app} items={data.data.slice(0, MAX_ITEMS)} />
			) : (
				<div>Not enough items</div>
			)}
		</div>
	);
};

export default ThreeDCarouselView;
