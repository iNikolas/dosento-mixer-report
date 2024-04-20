import { createEffect } from "effector";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { LoginCredentials, RegisterCredentials } from "@/entities";
import { auth } from "@/auth";
import { extractFirebaseErrorCode } from "@/utils";

export const loginFx = createEffect(
  async ({ email, password }: LoginCredentials) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return user;
    } catch (e) {
      throw new Error(extractFirebaseErrorCode(e));
    }
  },
);

export const registerFx = createEffect(
  async ({ email, password, fullname }: RegisterCredentials) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await updateProfile(user, { displayName: fullname });

      return user;
    } catch (e) {
      throw new Error(extractFirebaseErrorCode(e));
    }
  },
);

export const logoutFx = createEffect(async () => {
  try {
    await signOut(auth);
  } catch (e) {
    throw new Error(extractFirebaseErrorCode(e));
  }
});
