import { StoryFn } from "@storybook/react-vite";


export default function ViewWrapper(Story: StoryFn) {
  return (
    <div style={{ height: 'calc(100vh - 40px)', overflowY: 'auto' }} data-testid="lovely-bases">
      <Story />
    </div>
  );
}
