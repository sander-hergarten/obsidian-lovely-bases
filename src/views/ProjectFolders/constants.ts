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
const tCommon = (key: NamespacedTranslationKey<"common">) =>
	translate(locale, "common", key);

export const PROJECT_FOLDERS_OPTIONS: ViewOption[] = [
	{
		type: "group",
		displayName: tCommon("options.grouping.title"),
		items: [
			{
				type: "property",
				displayName: t("options.dataProperties.iconProperty.title"),
				key: "groupIconProperty",
				default: undefined,
			},
			{
				type: "property",
				displayName: t("options.dataProperties.colorProperty.title"),
				key: "groupColorProperty",
				default: undefined,
			},
			{
				type: "dropdown",
				displayName: t("options.display.groupTitlePosition.title"),
				key: "groupTitlePosition",
				default: "outside",
				options: {
					inside: t("options.display.groupTitlePosition.inside"),
					outside: t("options.display.groupTitlePosition.outside"),
					none: t("options.display.groupTitlePosition.none"),
				},
			},
		],
	},
	...CARD_CONFIG_OPTIONS,
];
