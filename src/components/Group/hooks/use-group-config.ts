import type { BasesViewConfig } from "obsidian";

import { DEFAULTS } from "@/components/Group/constants";
import type { GroupConfig } from "@/components/Group/types";
import { useConfig } from "@/hooks/use-config";

export function useGroupConfig(config: BasesViewConfig, defaultOverrides?: Partial<GroupConfig>): GroupConfig {
  const viewConfig = useConfig<GroupConfig>(config, { ...DEFAULTS, ...defaultOverrides });

  return viewConfig;
}
