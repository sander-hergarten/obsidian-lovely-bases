import type { ReactBaseViewProps } from "@/types";

import { aBasesQueryResult } from "./aBasesQueryResult";
import { aBasesViewConfig } from "./aBasesViewConfig";
import { createMockApp } from "./create-mock-app";
import { createMockComponent } from "./create-mock-component";

export const aReactBaseViewProps = (overrides: Partial<ReactBaseViewProps> = {}): ReactBaseViewProps => {
  return {
    app: createMockApp(),
    component: createMockComponent(),
    containerEl: document.createElement('div'),
    data: aBasesQueryResult(),
    config: aBasesViewConfig(),
    isEmbedded: false,
    ...overrides,
  };
}
