import type { BasesEntry } from "obsidian";
import { aBasesEntry } from "../../__mocks__/aBasesEntry";
import { aFile } from "../../__mocks__/aFile";

export const MY_NOTEBOOK: BasesEntry = aBasesEntry(
  {
    file: aFile({
      basename: 'My Notebook',
    })
  },
  {
    title: "My Notebook",
    color: "#6F6E69",
    icon: "notebook",
  }
);

export const MY_FOLDER: BasesEntry = aBasesEntry(
  {
    file: aFile({
      basename: 'My Folder',
    })
  },
  {
    title: "My Folder",
    color: "#6F6E69",
    icon: "folder",
  }
);

export const MY_BOOKS: BasesEntry = aBasesEntry(
  {
    file: aFile({
      basename: 'Books',
    })
  },
  {
    title: "Books",
    color: "#205ea6",
    icon: "library-big",
  }
);

export const MY_ARTICLES: BasesEntry = aBasesEntry(
  {
    file: aFile({
      basename: 'Articles',
    })
  },
  {
    title: "Articles",
    color: "#24837b",
    icon: "newspaper",
  }
);


export const MY_MOVIES: BasesEntry = aBasesEntry(
  {
    file: aFile({
      basename: 'Movies',
    })
  },
  {
    title: "Movies",
    color: "#af3029",
    icon: "film",
  }
);

export const MY_PHOTOS: BasesEntry = aBasesEntry(
  {
    file: aFile({
      basename: 'Photos',
    })
  },
  {
    title: "Photos",
    color: "#66800b",
    icon: "camera",
  }
);

export const MY_CONTACTS: BasesEntry = aBasesEntry(
  {
    file: aFile({
      basename: 'Contacts',
    })
  },
  {
    title: "Contacts",
    color: "#5e409d",
    icon: "user",
  }
);

export const MY_APPLICATIONS: BasesEntry = aBasesEntry(
  {
    file: aFile({
      basename: 'Applications',
    })
  },
  {
    title: "Applications",
    color: "#ad8301",
    icon: "layers",
  }
);


export const GROUPS_ENTRIES: BasesEntry[] = [
  MY_NOTEBOOK,
  MY_FOLDER,
  MY_BOOKS,
  MY_ARTICLES,
  MY_MOVIES,
  MY_PHOTOS,
  MY_CONTACTS,
  MY_APPLICATIONS,
];
