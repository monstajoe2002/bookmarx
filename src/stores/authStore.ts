import { writable } from "svelte/store";
import { auth } from "../config/firebase";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  type User,
  type UserInfo,
} from "firebase/auth";

type AuthUser = User & UserInfo;

export const authStore = writable<AuthUser | null>();

export const signUp = async (email: string, password: string) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      // Signed in
      logIn(email, password);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      // ..
    });
};

export const logIn = async (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
   
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      // ..
    });
};


onAuthStateChanged(auth, (user) => {
  authStore.set(user);
});
