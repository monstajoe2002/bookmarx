declare interface Tab extends chrome.tabs.Tab {
  id: number;
  name: string;
  url: string;
}

declare interface Bookmark {
  id: string;
  name: string;
  url: string;
  groupId: string;
}

declare interface BookmarkGroup {
  id: string;
  name: string;
  bookmarks: Bookmark[];
}
