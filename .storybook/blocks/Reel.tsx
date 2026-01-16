
import React, { useMemo } from 'react';
import { useOf, Story } from '@storybook/addon-docs/blocks';
// import { Player } from '@remotion/player';

/**
 * A block that displays the story name or title from the of prop
 * - if a story reference is passed, it renders the story name
 * - if a meta reference is passed, it renders the stories' title
 * - if nothing is passed, it defaults to the primary story
 */
export const Reel = () => {
  const resolved = useOf('meta');

  // Opcional: excluye stories “técnicas” o ordena
  const reelStories = useMemo(
    () => {
      if (resolved.type !== 'meta') return [];

      return Object.values(resolved.csfFile?.stories)
        .filter((s) => s?.parameters?.reel?.include !== false)
        .sort((a, b) => (a?.parameters?.reel?.order ?? 0) - (b?.parameters?.reel?.order ?? 0))
    },
  [resolved]
);

  if (reelStories.length === 0) return null;

  return (
    <div style={{ margin: '24px 0' }}>
      <Player
        component={ReelComposition}
        inputProps={{ reelStories }}
        durationInFrames={reelStories.length * 150}
        fps={30}
        compositionWidth={960}
        compositionHeight={540}
        controls
      />
    </div>
  );
};

const ReelComposition: React.FC<{ reelStories: any[] }> = ({ reelStories }) => {
  return (
    <div style={{ flex: 1 }}>
      {reelStories.map((s, i) => (
        <div key={s.id ?? i}>
          <Story of={s.moduleExport ?? s} />
        </div>
      ))}
    </div>
  );
};
