import { User } from "@/entities";
import { api } from "@/config";
import { auth } from "@/auth";

export async function loginWithToken(token: string) {
  const response = await fetch(api.login, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Не вдалося ввійти за допомогою "токена"');
  }
}

export async function discardTokenLogin() {
  const response = await fetch(api.login, { method: "DELETE" });

  if (!response.ok) {
    throw new Error("Не вдалося очистити дані сеансу на сервері");
  }
}

export function getUserData(): User | null {
  const user = auth.currentUser;

  if (!user) {
    return null;
  }

  if (!user.email) {
    throw new Error(
      "У даних користувача відсутнє обов’язкове поле електронної пошти",
    );
  }

  return {
    email: user.email,
    displayName: user.displayName ?? "",
    emailVerified: user.emailVerified,
    uid: user.uid,
  };
}
