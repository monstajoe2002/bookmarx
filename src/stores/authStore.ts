import { writable } from "svelte/store";
import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  type User,
  type UserInfo,
} from "firebase/auth";

type AuthUser = User & UserInfo;

export const authStore = writable<AuthUser | null>();

export const signUp = async (email: string, password: string) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      // ..
    });
};


