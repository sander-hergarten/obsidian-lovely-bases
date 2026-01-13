import { aBasesViewConfig } from "@/__mocks__/aBasesViewConfig";

export const QUARTER_BASE_CONFIG = aBasesViewConfig({
  focus: 'Trimestral',
  startDateProperty: 'note.created',
  endDateProperty: 'note.created',
  date: new Date().getFullYear().toString(),
});
