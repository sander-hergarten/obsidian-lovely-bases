import type { ComponentType } from "react";

export type ReelStory = {
  id?: string;
  name?: string;
  moduleExport?: unknown;
  component?: ComponentType;
  parameters?: {
    reel?: {
      include?: boolean;
      order?: number;
    };
    docs?: {
      description?: {
        story?: string;
      };
    };
  };
}
