import type { BasesEntry } from "obsidian";

import { aFile } from "./aFile";
import { aValue } from "./aValue";


export const aBasesEntry = (
  overrides: Partial<BasesEntry> = {},
  fm: Record<string, unknown> = {},
): BasesEntry => {
  const file = overrides.file ?? aFile();
  return {
    file,
    getValue(propertyId) {
      const [source, property] = propertyId.split('.');
      const sourceData = source === 'file' ? file : fm;

      if (source === 'file') {
        if (property === 'name') {
          return aValue(file.basename);
        }
      }

      if (source === 'formula') {
        if (property === 'image') {
          return 'banner' in sourceData ?
            aValue(sourceData.banner) :
            'cover' in sourceData ?
              aValue(sourceData.cover) :
              aValue(undefined);
        }
      }

      return aValue(sourceData[property])
    },
    _frontmatter: fm,
    ...overrides,
  } as BasesEntry;
}
