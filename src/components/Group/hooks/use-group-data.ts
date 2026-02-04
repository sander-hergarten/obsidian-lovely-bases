import { TFile } from "obsidian";

import { useObsidian } from "@/components/Obsidian/Context";
import { accent } from "@/lib/colors";

import type { GroupConfig, GroupItem } from "../types";

type GroupData = {
  color: string;
  icon: string | null;
};

export function useGroupData(group: GroupItem, groupConfig: GroupConfig): GroupData {
  const { app } = useObsidian();
  const [, colorProperty] = groupConfig.groupColorProperty?.split(".") ?? [];
  const [, iconProperty] = groupConfig.groupIconProperty?.split(".") ?? [];

  let color = accent();
  let icon: string | null = null;

  if (group.file && group.file instanceof TFile) {
    const frontmatter =
      app.metadataCache.getFileCache(group.file)?.frontmatter;
    color = (frontmatter?.[colorProperty] as string | null) ?? color;
    icon = (frontmatter?.[iconProperty] as string | null) ?? null;
  }

  return {
    color,
    icon,
  };
}
