import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { writable } from "svelte/store";
import { v4 as uuidV4 } from "uuid";

import { auth, db } from "../config/firebase";
const querySnapshot = await getDocs(collection(db, "bookmarks"));
const data = querySnapshot.docs.map((doc) => doc.data() as Bookmark);

export const bookmarks = writable<Bookmark[]>(data);

export async function createBookmark(
  name: string,
  url: string,
  groupId: string,
) {
  const bookmarkId = uuidV4();
  await setDoc(doc(db, "bookmarks", bookmarkId), {
    id: bookmarkId,
    name,
    url,
    groupId,
    userId: auth.currentUser.uid,
  });
  const bookmarkDocRef = doc(db, "bookmarks", bookmarkId);
  const docSnapshot = await getDoc(bookmarkDocRef);
  const bookmark = docSnapshot.data() as Bookmark;
  bookmarks.update((bookmarks) => {
    return [...bookmarks, { ...bookmark, id: bookmarkDocRef.id }];
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
  await setDoc(bookmark.ref, { ...bookmark.data(), name, url });
  bookmarks.update((bookmarks) => {
    return bookmarks.map((bookmark) => {
      if (bookmark.id === id) {
        return {
          id,
          name,
          url,
          groupId: bookmark.groupId,
          userId: bookmark.userId,
        };
      }
      return bookmark;
    });
  });
}
