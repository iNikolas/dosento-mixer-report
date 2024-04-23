import { createEffect } from "effector";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

import {
  LoginCredentials,
  PasswordResetCredentials,
  RegisterCredentials,
} from "@/entities";
import { auth } from "@/auth";
import {
  discardTokenLogin,
  extractFirebaseErrorCode,
  loginWithToken,
} from "@/utils";

export const loginFx = createEffect(
  async ({ email, password }: LoginCredentials) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const token = await user.getIdToken();
      await loginWithToken(token);

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

      const token = await user.getIdToken();
      await loginWithToken(token);

      return user;
    } catch (e) {
      throw new Error(extractFirebaseErrorCode(e));
    }
  },
);

export const logoutFx = createEffect(async () => {
  try {
    await signOut(auth);
    await discardTokenLogin();
  } catch (e) {
    throw new Error(extractFirebaseErrorCode(e));
  }
});

export const passwordResetFx = createEffect(
  async ({ email }: PasswordResetCredentials) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (e) {
      throw new Error(extractFirebaseErrorCode(e));
    }
  },
);
