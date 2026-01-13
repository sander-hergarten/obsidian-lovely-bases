import type { Decorator } from "@storybook/react-vite";

import { createMockApp } from "../../__mocks__/create-mock-app";
import { createMockComponent } from "../../__mocks__/create-mock-component";
import { ObsidianProvider } from "../../components/Obsidian/Context";

const Providers: Decorator = (Story) => {
  return (
    <ObsidianProvider
      value={{
        app: createMockApp(),
        component: createMockComponent(),
        containerEl: document.createElement("div"),
        isEmbedded: false,
      }}
    >
      <Story />
    </ObsidianProvider>
  );
};

export default Providers;
