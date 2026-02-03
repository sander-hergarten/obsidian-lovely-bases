import type { BasesViewConfig } from "obsidian";

import type { CardConfig } from "@/components/Card/types";

import Group from "./Group";
import type { GroupConfig, GroupItem } from "./types";

type Props = {
	cardConfig: CardConfig;
  groupConfig: GroupConfig;
	groups: GroupItem[];
	config: BasesViewConfig;
};

function Groups({
	groups,
	cardConfig,
  groupConfig,
	config,
}: Props) {
	return (
		<section className="max-w-7xl mx-auto px-6 pt-16 pb-32">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 justify-items-center">
				{groups.map((group, index) => (
					<div
						key={group.title}
						className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700"
						style={{ animationDelay: `${200 + index * 100}ms` }}
					>
						<Group
							entry={group.entry}
							onClick={group.onClick}
							title={group.title}
							icon={group.icon}
							files={group.files}
							color={group.color}
							className="w-full"
							cardConfig={cardConfig}
              groupConfig={groupConfig}
							config={config}
						/>
					</div>
				))}
			</div>
		</section>
	);
}

export default Groups;
