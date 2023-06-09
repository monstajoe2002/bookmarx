import { writable } from "svelte/store";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  type User,
  type UserInfo,
} from "firebase/auth";

import { auth } from "../config/firebase";

type AuthUser = User & UserInfo;

export const authStore = writable<AuthUser | null>();

export const signUp = async (email: string, password: string) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      // Signed in
      logIn(email, password);
      if (!auth.currentUser.emailVerified) {
        sendEmailVerification(auth.currentUser);
      }
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
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      return user;
      // ...
    })

    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      // ..
    });
};
export const signOut = async () => {
  await auth.signOut();
};

onAuthStateChanged(auth, (user) => {
  authStore.set(user);
});
