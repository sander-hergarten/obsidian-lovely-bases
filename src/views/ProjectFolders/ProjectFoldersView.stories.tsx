
import type { Meta, StoryObj } from '@storybook/react-vite';

import { MOVIES_ENTRIES } from '@/__fixtures__/entries';

import Providers from '@/stories/decorators/Providers';
import ViewWrapper from '@/stories/decorators/ViewWrapper';

import { COLORIZED_FILES_BASE_CONFIG, DEFAULT_BASE_CONFIG } from './__fixtures__/configs';
import ProjectFoldersView from './ProjectFoldersView';
import { aBasesQueryResult, aReactBaseViewProps } from '@/__mocks__';


const meta = {
  title: 'Views/Project Folders',
  component: ProjectFoldersView,
  tags: ['autodocs'],
  decorators: [
    Providers,
    ViewWrapper,
  ],
  parameters: {
    docs: {
      subtitle: 'A tactile, organization-focused view that groups your notes into beautiful 3D interactive folders. Perfect for managing projects, areas, or any hierarchical collection.',
      description: {
        component: `### Features

- **Interactive 3D Folders**: Folders that dynamically open and tilt on hover, providing a playful and organic feel.
- **File Previews**: Up to 5 notes from each group are displayed as cards popping out of the folder when you move over it.
- **Visual Metadata**: Automatically extracts icons and colors from the frontmatter of the note representing the folder.
- **Smart Grouping**: Leverages your Base's grouping settings to automatically organize notes into relevant categories.
- **Custom Gradients**: Generates beautiful, color-matched gradients for each folder based on its assigned color.

### Configuration

- **Image Property**: Select which property to use for the images displayed on the file preview cards.
- **Group By**: This view relies on the **Group by** setting of your Obsidian Base to define the folders.`
      }
    }
  }
} satisfies Meta<typeof ProjectFoldersView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: aReactBaseViewProps({
    data: aBasesQueryResult({
      data: MOVIES_ENTRIES,
    }),
    config: DEFAULT_BASE_CONFIG,
  }),
};

export const ColorizedFiles: Story = {
  args: aReactBaseViewProps({
    data: aBasesQueryResult({
      data: MOVIES_ENTRIES,
    }),
    config: COLORIZED_FILES_BASE_CONFIG,
  }),
};
