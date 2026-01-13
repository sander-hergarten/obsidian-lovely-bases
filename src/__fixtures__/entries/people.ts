import type { BasesEntry } from "obsidian";
import { aBasesEntry } from "../../__mocks__/aBasesEntry";
import { aFile } from "../../__mocks__/aFile";

export const PERSON_ENTRIES: BasesEntry[] = [
  aBasesEntry(
    {
      file: aFile({
        basename: 'Isaac Asimov',
      })
    },
    {
      title: "Isaac Asimov",
      cover: 'https://letteratitudinenews.wordpress.com/wp-content/uploads/2020/01/isaac-asimov.jpg',
    }
  ),
];

export const VIRTUAL_SCROLL_PERSON_ENTRIES: BasesEntry[] = []

Array.from({ length: 25 }, (_) => VIRTUAL_SCROLL_PERSON_ENTRIES.push(
  ...PERSON_ENTRIES,
));

