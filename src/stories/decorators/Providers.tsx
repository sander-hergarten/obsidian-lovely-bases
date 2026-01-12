
import { StoryFn } from "@storybook/react-vite";
import React from 'react';

import { createMockApp } from "../../__mocks__/create-mock-app";
import { createMockComponent } from "../../__mocks__/create-mock-component";
import { ObsidianProvider } from "../../components/Obsidian/Context";

export default function Providers(Story: StoryFn) {
  return (
    <ObsidianProvider value={{
      app: createMockApp(),
      component: createMockComponent(),
      containerEl: document.createElement('div'),
      isEmbedded: false,
    }}>
        <Story />
    </ObsidianProvider>
  );
}
