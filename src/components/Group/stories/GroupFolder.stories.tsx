import type { Meta } from "@storybook/react-vite";

import { MOVIES_ENTRIES, MY_FOLDER } from "@/__fixtures__/entries";
import { Providers } from "@/stories/decorators";

import GroupMeta, { type GroupStory, type Story } from "./meta";

const meta = {
  ...GroupMeta,
  title: "Design System/Group/Folder",
  tags: ["internal"],
  args: {
    ...GroupMeta.args,
    entries: MOVIES_ENTRIES.slice(0, 5),
    groupShape: "folder",
    groupColorProperty: "note.color",
    groupIconProperty: "note.icon",
  },
  decorators: [
    Providers,
    (Story) => (
      <div
        style={{
          padding: "40px",
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof GroupStory>;

export default meta;

export const FullExample: Story = {
  name: "Full Example",
  args: {
    file: MY_FOLDER.file,
    title: "My Folder",
    groupCounterPosition: "inside",
    groupBorder: "dashed",
    groupSpacing: 20,
    cardSize: 148,
  },
};

export const Default: Story = {
  name: "Default",
};
