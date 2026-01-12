import type { App, TFile } from "obsidian"

export const createMockApp = (): App => {
  return {
    metadataCache: {
      getFirstLinkpathDest: (_linkpath: string, _sourcePath: string) => null,
      getFileCache: (_: TFile) => ({ frontmatter: {} }),
    },
    vault: {
      adapter: {
        getResourcePath: (path: string) => path,
      },
      read: async (_: TFile) => '# Mock Content\n\nThis is mock content for Storybook.',
    },
    workspace: {
      openLinkText: async (_linktext: string, _sourcePath: string, _newLeaf: boolean) => {},
      trigger: (_event: string, _data: unknown) => {},
    },
  } as unknown as App;
}
