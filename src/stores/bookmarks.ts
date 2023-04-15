import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { writable } from "svelte/store";
import { db } from "../config/firebase";
const querySnapshot = await getDocs(collection(db, "bookmarks"));
const data = querySnapshot.docs.map((doc) => doc.data() as Bookmark);

export const bookmarks = writable<Bookmark[]>(data);

export async function createBookmark(
  name: string,
  url: string,
  group: BookmarkGroup
) {
  const bookmarkGroupRef = doc(db, "bookmarkGroups", group.id);
  const bookmark = { name, url, group };
  await setDoc(bookmarkGroupRef, {
    bookmarks: [...group.bookmarks, bookmark],
  });
  bookmarks.update((bookmarks) => {
    return [...bookmarks, bookmark as Bookmark];
  });
}

export async function deleteBookmark(id: string) {
  const bookmark = await getDoc(doc(db, "bookmarks", id));
  await deleteDoc(bookmark.ref);
  bookmarks.update((bookmarks) => {
    return bookmarks.filter((bookmark) => bookmark.id !== id);
  });
}

export async function editBookmark(id: string, name: string, url: string) {
  const bookmark = await getDoc(doc(db, "bookmarks", id));
  await setDoc(bookmark.ref, { name, url });
  bookmarks.update((bookmarks) => {
    return bookmarks.map((bookmark) => {
      if (bookmark.id === id) {
        return { id, name, url, group: bookmark.group };
      }
      return bookmark;
    });
  });
}
