import axios from "axios";

export async function loginWithToken(token: string) {
  await axios.post(
    "/api/login",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

export async function discardTokenLogin() {
  await axios.delete("/api/login");
}
