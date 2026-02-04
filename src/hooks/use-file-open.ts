

import { Keymap, type TFile } from "obsidian";
import { useCallback } from "react";

import { useObsidian } from "@/components/Obsidian/Context";

export function useFileOpen(
  file: TFile | undefined) {
  const { app } = useObsidian();

  return useCallback((event: React.MouseEvent) => {
    event.preventDefault();

      const modEvent = Keymap.isModEvent(event.nativeEvent);
      void app.workspace.openLinkText(file.path, "", modEvent);
  }, [app.workspace.openLinkText, file?.path]);
}

