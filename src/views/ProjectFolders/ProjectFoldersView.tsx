import { useCardConfig } from "@/components/Card/hooks/use-card-config";
import Groups from "@/components/Group";
import { useGroupConfig } from "@/components/Group/hooks/use-group-config";
import { useGroups } from "@/components/Group/hooks/use-groups";
import { Container } from "@/components/Obsidian/Container";
import type { ReactBaseViewProps } from "@/types";

const ProjectFoldersView = ({ config, data, isEmbedded }: ReactBaseViewProps) => {
	const groups = useGroups(data, config);
	const cardConfig = useCardConfig(config);
  const groupConfig = useGroupConfig(config);

	return (
		<Container isEmbedded={isEmbedded} style={{ overflowY: "auto" }}>
			<Groups
				cardConfig={cardConfig}
				config={config}
        groupConfig={groupConfig}
				groups={groups}
			/>
		</Container>
	);
};

export default ProjectFoldersView;
