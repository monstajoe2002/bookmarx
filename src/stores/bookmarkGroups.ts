import { writable } from "svelte/store";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { v4 as uuidV4 } from "uuid";

import { auth, db } from "../config/firebase";

const querySnapshot = await getDocs(collection(db, "bookmarkGroups"));
const data = querySnapshot.docs.map((doc) => doc.data() as BookmarkGroup);

export const bookmarkGroups = writable<BookmarkGroup[]>(data);

export const createBookmarkGroup = async (name: string) => {
  const bookmarkGroupRef = doc(db, "bookmarkGroups", uuidV4());
  await setDoc(bookmarkGroupRef, {
    id: bookmarkGroupRef.id,
    name,
    bookmarks: doc(collection(db, "bookmarks")),
    userId: auth.currentUser.uid,
  });
  bookmarkGroups.update((groups) => {
    return [...groups, { name } as BookmarkGroup];
  });
};

export const deleteBookmarkGroup = async (id: string) => {
  await deleteDoc(doc(db, "bookmarkGroups", id));
  const bookmarksQuerySnapshot = await getDocs(
    query(collection(db, "bookmarks"), where("groupId", "==", id)),
  );

  const bookmarkDocs = bookmarksQuerySnapshot.docs;

  bookmarkDocs.forEach((doc) => {
    deleteDoc(doc.ref);
  });
  bookmarkGroups.update((groups) => {
    return groups.filter((group) => group.id !== id);
  });
};

export const updateBookmarkGroup = async (id: string, name: string) => {
  await setDoc(doc(db, "bookmarkGroups", id), {
    id,
    name,
    bookmarks: doc(collection(db, "bookmarks")),
    userId: auth.currentUser.uid,
  });
  bookmarkGroups.update((groups) => {
    return groups.map((group) => {
      if (group.id === id) {
        group.name = name;
      }
      return group;
    });
  });
};
