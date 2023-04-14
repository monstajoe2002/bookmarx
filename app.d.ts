declare interface Tab extends chrome.tabs.Tab {
  id: number;
  name: string;
}

declare interface Bookmark {
  id: string;
  name: string;
  url: string;
  group: BookmarkGroup;
}

declare interface BookmarkGroup {
  id: string;
  name: string;
  bookmarks: Bookmark[];
}

