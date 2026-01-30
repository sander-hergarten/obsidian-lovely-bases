import type { ViewOption } from "obsidian";

import { CARD_CONFIG_OPTIONS } from "@/components/Card/constants";
import {
	detectLocale,
	type NamespacedTranslationKey,
	translate,
} from "@/lib/i18n";

const locale = detectLocale();
const t = (key: NamespacedTranslationKey<"projectFolders">) =>
	translate(locale, "projectFolders", key);

export const PROJECT_FOLDERS_OPTIONS: ViewOption[] = [
	{
		type: "group",
		displayName: t("options.dataProperties.title"),
		items: [
			{
				type: "property",
				displayName: t("options.dataProperties.iconProperty.title"),
				key: "iconProperty",
				default: undefined,
			},
			{
				type: "property",
				displayName: t("options.dataProperties.colorProperty.title"),
				key: "colorProperty",
				default: undefined,
			},
		],
	},
	{
		type: "group",
		displayName: t("options.display.title"),
		items: [
			{
				type: "toggle",
				displayName: t("options.display.colorizeFiles.title"),
				key: "colorizeFiles",
				default: false,
			},
		],
	},
	...CARD_CONFIG_OPTIONS,
];
