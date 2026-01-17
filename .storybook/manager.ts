import { addons } from 'storybook/manager-api';

import theme from './addons/theme';
import MetaTitleAddon from './addons/title';

addons.register('MetaTitleAddon', MetaTitleAddon);
addons.setConfig({
  theme,
});

