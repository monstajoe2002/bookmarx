import { writable } from "svelte/store";
import { db } from "../config/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { v4 as uuidV4 } from "uuid";
const querySnapshot = await getDocs(collection(db, "bookmarkGroups"));
const data = querySnapshot.docs.map((doc) => doc.data() as BookmarkGroup);

export const bookmarkGroups = writable<BookmarkGroup[]>(data);

export const createBookmarkGroup = async (name: string) => {
  const bookmarkGroupRef = doc(db, "bookmarkGroups", uuidV4());
  await setDoc(bookmarkGroupRef, {
    id: bookmarkGroupRef.id,
    name,
    bookmarks: doc(collection(db, "bookmarks")),
  });
  bookmarkGroups.update((groups) => {
    return [...groups, { name } as BookmarkGroup];
  });
};
