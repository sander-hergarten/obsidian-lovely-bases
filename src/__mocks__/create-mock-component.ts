import type { Component } from "obsidian";

export const createMockComponent = (): Component => {
  return {
    containerEl: document.createElement('div'),
    onDataUpdated: () => {},
    onunload: () => {},
  } as unknown as Component;
}
