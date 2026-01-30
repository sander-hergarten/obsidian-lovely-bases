import { useCardConfig } from "@/components/Card/hooks/use-card-config";
import { Container } from "@/components/Obsidian/Container";
import ProjectFolders from "@/components/ProjectFolders";
import { useFolders } from "@/components/ProjectFolders/hooks/use-folders";
import type { ReactBaseViewProps } from "@/types";

import type { ProjectFoldersConfig } from "./types";

const ProjectFoldersView = ({ config, data, isEmbedded }: ReactBaseViewProps) => {
  const colorizeFiles = config.get(
    "colorizeFiles",
  ) as ProjectFoldersConfig["colorizeFiles"];
  const folders = useFolders(data, config);
  const cardConfig = useCardConfig(config);

  return (
    <Container isEmbedded={isEmbedded} style={{ overflowY: "auto" }}>
      <ProjectFolders
        folders={folders}
        colorizeFiles={colorizeFiles ?? false}
        cardConfig={cardConfig}
        config={config}
      />
    </Container>
  );
};

export default ProjectFoldersView;
