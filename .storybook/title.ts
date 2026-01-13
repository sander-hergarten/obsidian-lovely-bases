import { addons } from 'storybook/manager-api';

addons.register('TitleAddon', (api) => {
  const PAGE_TITLE = 'Lovely Bases';

  const setTitle = () => {
    let storyData: any = null
    try {
      storyData = api.getCurrentStoryData()
    } catch (e) {}
    document.title =
      storyData?.title
        ? `${storyData.title.replace(/\//g, ' / ')} - ${storyData.name} ⋅ ${PAGE_TITLE}`
        : PAGE_TITLE
  }

  return new MutationObserver(() => {
    if (document.title.endsWith('Storybook')) {
      setTitle();
    }
  }).observe(document.querySelector('title') as Node, {
    childList: true,
    subtree: true,
    characterData: true,
  });
})
