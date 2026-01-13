import { aBasesViewConfig } from "@/__mocks__/aBasesViewConfig";

export const HALF_BASE_CONFIG = aBasesViewConfig({
  focus: 'Semestral',
  startDateProperty: 'note.created',
  endDateProperty: 'note.created',
  date: new Date().getFullYear().toString()
});
