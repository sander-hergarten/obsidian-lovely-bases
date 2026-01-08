import { App, normalizePath, TFile } from "obsidian";

function parseWikilink(raw: string) {
  const inner = raw.replace(/^\[\[|\]\]$/g, "");
  return inner.split("|")[0].trim();
}

export function resolveAttachment(
  app: App,
  rawLink: string,
  sourcePath: string
): TFile | null {
  const link = parseWikilink(rawLink);

  const dest = app.metadataCache.getFirstLinkpathDest(link, sourcePath);
  if (dest instanceof TFile) return dest;

  const target = link.split("/").pop()?.toLowerCase();
  return app.vault.getFiles().find(f => f.name.toLowerCase() === target) ?? null;
}

export function getImageResourcePath(app: App, rawLink: string, sourcePath: string): string | null {
  const file = resolveAttachment(app, rawLink, sourcePath);
  if (!file) return null;
  return app.vault.adapter.getResourcePath(normalizePath(file.path)) ?? null;
}
