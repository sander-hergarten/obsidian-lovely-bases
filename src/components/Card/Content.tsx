import type { BasesEntry, BasesViewConfig } from "obsidian";
import { memo } from "react";

import Markdown from "@/components/Obsidian/Markdown";

import PropertyList from "./PropertyList";
import Title from "./Title";
import type { CardConfig } from "./types";

type Props = {
  entry: BasesEntry;
  cardConfig: CardConfig;
  config: BasesViewConfig;
}

const Content = memo(({ entry, cardConfig, config }: Props) => {
  const { showTitle, showContent, contentMaxLength, properties } = cardConfig;

  const shouldDisplayContent = showTitle || showContent || properties.length > 0;

  if (!shouldDisplayContent) {
    return null;
  }

  return (
    <div
      className="flex flex-col flex-1 min-h-0 min-w-0 h-full overflow-hidden"
    >
      <Title entry={entry} cardConfig={cardConfig} />

      <div className="flex-1 min-h-0">
        <PropertyList
          entry={entry}
          cardConfig={cardConfig}
          config={config}
        />
      </div>

      {showContent && (
        <div className="px-[var(--size-4-2)] py-2 overflow-hidden">
          <Markdown
            file={entry.file}
            maxLength={contentMaxLength}
            className="text-sm text-foreground line-clamp-6 overflow-hidden"
          />
        </div>
      )}
    </div>
  )
});

Content.displayName = "Content";

export default Content;
