import Cookies from "js-cookie";

import { User } from "@/entities";
import { api, userCookieKey } from "@/config";

import { assertIsUser } from "./assertions";

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
  const userJson = Cookies.get(userCookieKey);

  if (!userJson) {
    return null;
  }

  const user: unknown = JSON.parse(userJson);

  try {
    assertIsUser(user);

    return user;
  } catch (_) {
    return null;
  }
}
