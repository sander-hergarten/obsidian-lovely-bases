import type { BasesQueryResult } from "obsidian";


export const aBasesQueryResult = (
  overrides: Partial<BasesQueryResult> = {},
): BasesQueryResult => {
  return {
    data: overrides.data ?? [],
    groupedData: overrides.groupedData ?? [],
    properties: overrides.properties ?? [],
    getSummaryValue() {
      throw new Error('Not implemented');
    },
    ...overrides,
  };
}
