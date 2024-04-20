export const authErrors: {
  email: Record<string, string>;
  password: Record<string, string>;
} = {
  email: {
    "auth/email-already-in-use":
      "Ця електронна пошта вже використовується іншим користувачем",
    "auth/invalid-email": "Це недійсна електронна пошта",
  },
  password: { "auth/invalid-password": "Цей пароль недійсний" },
};
