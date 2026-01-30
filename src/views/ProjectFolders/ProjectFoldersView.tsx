import { useCardConfig } from "@/components/Card/hooks/use-card-config";
import { Container } from "@/components/Obsidian/Container";
import ProjectFolders from "@/components/ProjectFolders";
import { useFolders } from "@/components/ProjectFolders/hooks/use-folders";
import type { ReactBaseViewProps } from "@/types";

const ProjectFoldersView = ({ config, data, isEmbedded }: ReactBaseViewProps) => {
  const folders = useFolders(data, config);
  const cardConfig = useCardConfig(config);

  return (
    <Container isEmbedded={isEmbedded} style={{ overflowY: "auto" }}>
      <ProjectFolders
        folders={folders}
        cardConfig={cardConfig}
        config={config}
      />
    </Container>
  );
};

export default ProjectFoldersView;
