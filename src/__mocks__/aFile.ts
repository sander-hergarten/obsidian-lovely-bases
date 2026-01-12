import type { TFile, Vault } from "obsidian"

export const aFile = (
  overrides: Partial<TFile> = {},
): TFile => {
  const basename = overrides.basename ?? 'test';
  const extension = overrides.extension ?? 'md';
  const path = overrides.path ?? `${basename}.${extension}`;
  const name = overrides.name ?? `${basename}.${extension}`;

  return {
    vault: null as unknown as Vault,
    basename,
    path,
    extension,
    name,
    parent: null,
    stat: {
      ctime: 1715769600,
      mtime: 1715769600,
      size: 0,
    },
    ...overrides,
  }
}
