import type { BasesViewConfig } from "obsidian";

import type { CardConfig } from "@/components/Card/types";
import type { GroupTitlePosition } from "@/views/ProjectFolders/types";

import ProjectFolder from "./ProjectFolder";
import type { Folder } from "./types";

type Props = {
	folders: Folder[];
	cardConfig: CardConfig;
	config: BasesViewConfig;
	groupTitlePosition?: GroupTitlePosition;
  groupShape?: "folder" | "notebook"
};

function ProjectFolders({
	folders,
	cardConfig,
	config,
  groupShape = "folder",
	groupTitlePosition = "outside",
}: Props) {
	return (
		<section className="max-w-7xl mx-auto px-6 pt-16 pb-32">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 justify-items-center">
				{folders.map((folder, index) => (
					<div
						key={folder.title}
						className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700"
						style={{ animationDelay: `${200 + index * 100}ms` }}
					>
						<ProjectFolder
							onClick={folder.onClick}
							title={folder.title}
							icon={folder.icon}
							files={folder.files}
							gradient={folder.gradient}
							className="w-full"
							cardConfig={cardConfig}
							config={config}
              groupShape={groupShape}
							groupTitlePosition={groupTitlePosition}
						/>
					</div>
				))}
			</div>
		</section>
	);
}

export default ProjectFolders;
