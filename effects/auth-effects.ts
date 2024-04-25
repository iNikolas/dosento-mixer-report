import { createEffect } from "effector";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  updateEmail,
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

export const updateProfileFx = createEffect(
  async ({
    newDisplayName,
    password,
    newPassword,
    email,
    newEmail,
  }: {
    email: string;
    password: string;
    newDisplayName?: string;
    newPassword?: string;
    newEmail?: string;
  }) => {
    if (!newDisplayName && !newPassword && !newEmail) {
      throw new Error("Ви не надали оновлених даних профілю");
    }

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      if (!user) {
        throw new Error("Не вдалося перевірити облікові дані користувача");
      }

      const promises: Promise<unknown>[] = [];

      if (newDisplayName) {
        promises.push(updateProfile(user, { displayName: newDisplayName }));
      }

      if (newPassword) {
        promises.push(updatePassword(user, newPassword));
      }

      if (newEmail) {
        promises.push(updateEmail(user, newEmail));
      }

      await Promise.all(promises);

      const token = await user.getIdToken();
      await loginWithToken(token);

      return user;
    } catch (e) {
      throw new Error(extractFirebaseErrorCode(e));
    }
  },
);
