import { useCardConfig } from "@/components/Card/hooks/use-card-config";
import { Container } from "@/components/Obsidian/Container";
import ProjectFolders from "@/components/ProjectFolders";
import { useFolders } from "@/components/ProjectFolders/hooks/use-folders";
import { useConfig } from "@/hooks/use-config";
import type { ReactBaseViewProps } from "@/types";

import type { GroupShape, GroupTitlePosition } from "./types";

const ProjectFoldersView = ({ config, data, isEmbedded }: ReactBaseViewProps) => {
	const folders = useFolders(data, config);
	const cardConfig = useCardConfig(config);
  const { groupTitlePosition, groupShape } = useConfig<{ groupTitlePosition: GroupTitlePosition; groupShape: GroupShape }>(config, {
    groupShape: "folder",
    groupTitlePosition: "outside",
  });

	return (
		<Container isEmbedded={isEmbedded} style={{ overflowY: "auto" }}>
			<ProjectFolders
				folders={folders}
				cardConfig={cardConfig}
				config={config}
        groupShape={groupShape}
				groupTitlePosition={groupTitlePosition}
			/>
		</Container>
	);
};

export default ProjectFoldersView;
