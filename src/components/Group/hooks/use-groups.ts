import { type BasesPropertyId, type BasesQueryResult, type BasesViewConfig, Keymap, TFile } from "obsidian";
import { useMemo } from "react";

import { useObsidian } from "@/components/Obsidian/Context";
import { useConfig } from "@/hooks/use-config";
import { accent } from "@/lib/colors";
import { isWikiLink, parseWikilink } from "@/lib/properties";

import type { GroupItem } from "../types";

export const useGroups = (
  data: BasesQueryResult,
  config: BasesViewConfig,
): GroupItem[] => {
  const { app } = useObsidian();
  const accentColor = accent();
  const { groupColorProperty, groupIconProperty } = useConfig<{ groupColorProperty: BasesPropertyId; groupIconProperty: BasesPropertyId }>(config, {
    groupColorProperty: undefined,
    groupIconProperty: undefined,
  });

  const [, colorProperty] = groupColorProperty?.split(".") ?? [];
  const [, iconProperty] = groupIconProperty?.split(".") ?? [];

  return useMemo(() => {
    const folders: GroupItem[] = [];

    for (const group of data.groupedData) {
      const isMulti = group.key.toString().includes(",");
      const keys = isMulti
        ? group.key.toString().split(", ")
        : [group.key.toString()];

      for (const key of keys) {
        const keyIsLink = isWikiLink(key);
        const title = key !== "null" ? parseWikilink(key) : "";

        let color = accentColor;
        let icon: string | null = null;
        let projectFile: TFile | null = null;

        if (keyIsLink) {
          projectFile = app.metadataCache.getFirstLinkpathDest(
            title,
            group.entries[0].file.path,
          );

          if (projectFile instanceof TFile) {
            const frontmatter =
              app.metadataCache.getFileCache(projectFile)?.frontmatter;
            color = (frontmatter?.[colorProperty] as string | null) ?? accentColor;
            icon = (frontmatter?.[iconProperty] as string | null) ?? null;
          }
        }

        let folder: GroupItem | undefined = folders.find((f) => f.title === title);
        if (!folder) {
          folder = {
            title,
            icon,
            color,
            files: [],
            onClick: (event: React.MouseEvent) => {
              event.preventDefault();

              if (keyIsLink && projectFile) {
                const modEvent = Keymap.isModEvent(event.nativeEvent);
                void app.workspace.openLinkText(projectFile.path, "", modEvent);
              }
            },
          };
          folders.push(folder);
        }
        folder.files.push(...group.entries);
      }
    }
    return folders;
  }, [data, app, accentColor, colorProperty, iconProperty]);
};
