
import type { GroupBorder } from "../types";

const BORDER_CLASSES: Record<GroupBorder, string> = {
  none: "",
  solid: "bg-card border border-border border-solid hover:shadow-2xl hover:shadow-(--folder-color)/20 hover:border-(--folder-color)/40",
  dotted: "bg-card bi-dotted bi-color-border hover:shadow-2xl hover:shadow-(--folder-color)/20 hover:bi-color-[color-mix(in_srgb,var(--folder-color)_40%,transparent)]",
  dashed: "bg-card bi-dashed bi-color-border hover:shadow-2xl hover:shadow-(--folder-color)/20 hover:bi-color-[color-mix(in_srgb,var(--folder-color)_40%,transparent)]",
}

export const getGroupBorder = (border: GroupBorder): string => {
  return BORDER_CLASSES[border];
}
