import type { App, BasesEntry, BasesPropertyId, BasesViewConfig } from "obsidian";
import { useMemo } from "react";

import { getImage, getProperty, getTitle } from "@/lib/properties";

import type { CardItem } from "../types";

type UseItemProps = {
  app: App;
  config: BasesViewConfig;
  entry: BasesEntry;
  propertiesToDisplay: {
    id: BasesPropertyId;
    displayName: string;
  }[];
  hoverPropertyDisplay: {
    id: BasesPropertyId;
    displayName: string;
  } | null;
  imageProperty?: BasesPropertyId;
}

type UseItemsProps = {
  app: App;
  config: BasesViewConfig;
  entries: BasesEntry[];
  propertiesToDisplay: {
    id: BasesPropertyId;
    displayName: string;
  }[];
  hoverPropertyDisplay: {
    id: BasesPropertyId;
    displayName: string;
  } | null;
  imageProperty?: BasesPropertyId;
}

const mapItem = ({ app, config, entry, propertiesToDisplay, hoverPropertyDisplay, imageProperty }: UseItemProps): CardItem => {
  const title = getTitle(entry);
  const image = getImage(app, entry, imageProperty);
  const properties = propertiesToDisplay.map(prop => getProperty(entry, config, prop.id));
  const hoverProperty = hoverPropertyDisplay ? getProperty(entry, config, hoverPropertyDisplay.id) : null;


  return {
    id: entry.file.path,
    image,
    title,
    entry,
    file: entry.file,
    properties,
    hoverProperty,
  };
};

export const useItem = ({ app, config, entry, propertiesToDisplay, hoverPropertyDisplay, imageProperty }: UseItemProps): CardItem => {
  return useMemo(() => {
    return mapItem({ app, config, entry, propertiesToDisplay, hoverPropertyDisplay, imageProperty });
  }, [entry, imageProperty, propertiesToDisplay, hoverPropertyDisplay, app, config]);
}

export const useItems = ({ app, config, entries, propertiesToDisplay, hoverPropertyDisplay, imageProperty }: UseItemsProps): CardItem[] => {
  return useMemo(() => {
    return entries.map(entry => mapItem({ app, config, entry, propertiesToDisplay, hoverPropertyDisplay, imageProperty }));
  }, [entries, imageProperty, propertiesToDisplay, hoverPropertyDisplay, app, config]);
}
