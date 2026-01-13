import type { Decorator } from "@storybook/react-vite";

const ScrollViewWrapper: Decorator = (Story) => {
  return (
    <div style={{ height: 'calc(100vh - 40px)', overflowY: 'auto' }} data-testid="lovely-bases">
      <Story />
    </div>
  );
};

export default ScrollViewWrapper;
