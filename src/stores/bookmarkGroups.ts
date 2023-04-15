import { writable } from "svelte/store";
import { db } from "../config/firebase";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";

const querySnapshot = await getDocs(collection(db, "bookmarkGroups"));
const data = querySnapshot.docs.map((doc) => doc.data() as BookmarkGroup);

export const bookmarkGroups = writable<BookmarkGroup[]>(data);

export const createBookmarkGroup = async (name: string) => {
  await addDoc(collection(db, "bookmarkGroups"), {
    name,
    bookmarks: doc(collection(db, "bookmarks")),
  });
  bookmarkGroups.update((groups) => {
    return [...groups, { name } as BookmarkGroup];
  });
};
