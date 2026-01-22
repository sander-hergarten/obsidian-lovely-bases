import type { BasesEntry, BasesViewConfig } from "obsidian";
import { memo } from "react";

import LucideIcon from "@/components/Obsidian/LucideIcon";
import { useEntryImage } from "@/hooks/use-image";
import { useEntryProperty } from "@/hooks/use-property";
import { useEntryTitle } from "@/hooks/use-title";
import { darken, lighten, luminance } from "@/lib/colors";
import { cn } from "@/lib/utils";

import type { CardConfig } from "./types";

const ICON_BY_EXTENSION = {
  'md': 'text-align-start',
  'pdf': 'file-text',
  'epub': 'book',
  'base': 'database',
  'canvas': 'layout-dashboard',
  'unknown': 'file-question-mark',
} as const;

type NonImageFallbackProps = {
  entry: BasesEntry;
  image: ReturnType<typeof useEntryImage>;
  cardConfig: CardConfig;
  config: BasesViewConfig;
};

const NonImageFallback = ({ entry, cardConfig, config, image }: NonImageFallbackProps) => {

  const { backgroundColorProperty, iconProperty } = cardConfig;

  const backgroundColorValue = useEntryProperty(entry, config, backgroundColorProperty);
  const iconValue = useEntryProperty(entry, config, iconProperty);

  const icon = iconValue && !iconValue.isEmpty ?
    iconValue.value.toString() :
    (ICON_BY_EXTENSION[entry.file.extension as keyof typeof ICON_BY_EXTENSION] || ICON_BY_EXTENSION.unknown);

  const backgroundColor =
    image?.isColor ? image.url :
    backgroundColorValue?.value?.toString() || undefined;
  let textColor: string;
  if (backgroundColor && backgroundColor !== 'null') {
    textColor = luminance(backgroundColor) > 0.5 ?
      darken(backgroundColor, 0.2) :
      lighten(backgroundColor, 0.2);
  }

	return <div
    className="h-full w-full flex items-center justify-center"
    style={{ backgroundColor: backgroundColor }}>
    <LucideIcon
      className={
        cn(
          "w-[80%] aspect-square block",
          !textColor && "text-(--text-faint)"
        )
      }
      name={icon} style={{ color: textColor }} />
  </div>;
};

type Props = {
	entry: BasesEntry;
	cardConfig: CardConfig;
	config: BasesViewConfig;
	isOverlayMode?: boolean;
};

const Image = memo(({ entry, cardConfig, config, isOverlayMode }: Props) => {
	const { imageProperty, cardSize, layout, imageAspectRatio, imageFit } = cardConfig;

	const image = useEntryImage(entry, imageProperty);
	const title = useEntryTitle(entry);

	if (isOverlayMode) {
		return (
			<div className="absolute inset-0 bg-(--bases-cards-cover-background)">
				{image && !image.isColor ? (
					<img
						src={image.url}
						alt={title}
						draggable={false}
						loading="lazy"
						className={cn(
							"pointer-events-none h-full w-full",
							imageFit === "cover" ? "object-cover" : "object-contain",
						)}
					/>
				) : (
					<NonImageFallback entry={entry} cardConfig={cardConfig} config={config} image={image} />
				)}
			</div>
		);
	}

	if (layout === "horizontal") {
		return imageProperty ? (
			<div
				className="relative shrink-0 bg-(--bases-cards-cover-background)"
				style={{
					// aspect ratio 2.5 = 100% del ancho, 0.25 = 10%
					width: `${(imageAspectRatio / 2.5) * 100}%`,
				}}
			>
				<div className="absolute inset-0">
					{image && !image.isColor ? (
						<img
							src={image.url}
							alt={title}
							draggable={false}
							loading="lazy"
							className={cn(
								"pointer-events-none h-full w-full",
								imageFit === "cover" ? "object-cover" : "object-contain",
							)}
						/>
					) : (
						<NonImageFallback entry={entry} cardConfig={cardConfig} config={config} image={image} />
					)}
				</div>
			</div>
		) : null;
	}

	const isPolaroid = layout === "polaroid";

	return imageProperty ? (
		<div
			className="mx-auto relative w-full flex-none bg-(--bases-cards-cover-background)"
			style={{
				aspectRatio: 1 / imageAspectRatio,
				...(!isPolaroid && { height: cardSize * imageAspectRatio }),
			}}
		>
			{image && !image.isColor ? (
				<img
					src={image.url}
					alt={title}
					draggable={false}
					loading="lazy"
					className={cn(
						"pointer-events-none h-full w-full",
						imageFit === "cover" ? "object-cover" : "object-contain",
					)}
					style={{
						aspectRatio: 1 / imageAspectRatio,
						...(!isPolaroid && { height: cardSize * imageAspectRatio }),
					}}
				/>
			) : (
				<NonImageFallback entry={entry} cardConfig={cardConfig} config={config} image={image} />
			)}
		</div>
	) : null;
});

Image.displayName = "Image";

export default Image;
