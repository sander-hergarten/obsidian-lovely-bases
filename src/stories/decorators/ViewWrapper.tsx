import type { Decorator } from "@storybook/react-vite";

const ViewWrapper: Decorator = (Story) => {
  return (
    <div style={{ maxHeight: 'calc(100vh - 40px)', overflowY: 'auto' }} data-testid="lovely-bases">
      <Story />
    </div>
  );
};

export default ViewWrapper;
