
import type { App, TFile } from "obsidian"

import { ALL_ENTRIES } from "@/__fixtures__/entries";

export const createMockApp = (): App => {
  return {
    metadataCache: {
			getFirstLinkpathDest: (linkpath: string, _: string) => {
        const entry = ALL_ENTRIES.find(entry => entry.file.basename === linkpath);
        if (entry) {
          return entry.file;
        }
			},
			getFileCache: (_file: TFile) => {
        const entry = ALL_ENTRIES.find(entry => entry.file.path === _file.path);
        if (entry) {
          return {
            // biome-ignore lint/suspicious/noExplicitAny: Entry doesn't have a frontmatter property
            frontmatter: (entry as any)._frontmatter,
          };
        }
				return {
					frontmatter: {},
				};
			},
    },
		vault: {
			adapter: {
				getResourcePath: (path: string): string | null => {
					return `/mock-resource/${path}`;
				},
			},
			// biome-ignore lint/suspicious/noExplicitAny: Storybook mock
			read: async (_file: any): Promise<string> => {
				return '# Mock Content\n\nThis is mock content for Storybook.';
			},
		},
    workspace: {
			openLinkText: async (_linktext: string, _sourcePath: string, _newLeaf: boolean): Promise<void> => {
				// Stub method
			},
      trigger: (_event: string, _data: unknown) => {},
    },
  } as unknown as App;
}
