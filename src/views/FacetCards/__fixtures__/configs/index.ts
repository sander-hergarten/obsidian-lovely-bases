
import type { FacetCardsConfig } from "@/views/FacetCards/FacetCardsView";
import { DEFAULT_BASE_CONFIG } from './default';

export {
  APPLICATIONS_BASE_CONFIG
} from './application';
export {
  ARTICLES_BASE_CONFIG
} from './articles';
export {
  BOOKS_BASE_CONFIG
} from './books';
export {
  DEFAULT_BASE_CONFIG,
  FULL_BASE_CONFIG
} from './default';
export {
  MOVIES_BASE_CONFIG
} from './movies';
export {
  PEOPLE_BASE_CONFIG
} from './people';

export const HORIZONTAL_LAYOUT_CONFIG: FacetCardsConfig = {
  ...DEFAULT_BASE_CONFIG,
  layout: 'horizontal',
  shape: 'square',
  hoverProperty: 'note.url',
  hoverStyle: 'overlay',
  properties: [
    'note.author',
    'note.published',
    'note.excerpt',
  ],
  imageProperty: 'note.banner',
  imageAspectRatio: 0.85,
  cardSize: 400,
  imageFit: 'cover',
  reverseContent: false,
  showPropertyTitles: false,
  showTitle: true,
}
