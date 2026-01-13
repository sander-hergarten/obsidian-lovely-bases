import { aBasesViewConfig } from "@/__mocks__/aBasesViewConfig";

export const FULL_BASE_CONFIG = aBasesViewConfig({
  focus: 'Anual',
  startDateProperty: 'note.created',
  endDateProperty: 'note.created',
  date: new Date().getFullYear().toString(),
});
