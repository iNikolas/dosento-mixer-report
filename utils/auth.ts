export async function loginWithToken(token: string) {
  const response = await fetch("/api/login", {
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
  const response = await fetch("/api/login", { method: "DELETE" });

  if (!response.ok) {
    throw new Error("Не вдалося очистити дані сеансу на сервері");
  }
}
